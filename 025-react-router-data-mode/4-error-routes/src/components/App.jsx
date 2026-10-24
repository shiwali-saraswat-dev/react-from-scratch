// ═════════════════════════════════════════════════════════════════════
// 3 - 404 and error routes (errorElement / ErrorBoundary)
// Run: http://localhost:5173/025-react-router-data-mode/4-error-routes/
//
// A route "fails" in 4 ways. This demo triggers each one:
//   1. A loader throws a Response (e.g. 404, 403)    -> /products/99, /forbidden
//   2. A component throws an Error while rendering   -> /crash
//   3. No route matches the URL                      -> /nope
//   4. (not an error) a scoped path="*" route        -> /shop/anything
//
// When a route fails, React Router renders the NEAREST errorElement above it,
// walking up the route tree. That boundary REPLACES the failed route's UI.
// ═════════════════════════════════════════════════════════════════════

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
  useRouteError,        // inside an error boundary: returns whatever was thrown
  isRouteErrorResponse, // true if the thrown value is a Response (has status/statusText/data)
  useLocation,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import "../Style.css";

const BASE = "/025-react-router-data-mode/4-error-routes";

// ── Loaders: run BEFORE the route renders. Throwing sends the user to the error boundary. ──
const products = { 1: "Pizza", 2: "Burger" };

const productLoader = async ({ params }) => {
  const name = products[params.id];
  if (!name) {
    // Throw a Response to carry a status code. React Router turns it into an
    // "error response" with status, statusText and data (the body text).
    // (v7 also offers: throw data("Product not found", { status: 404 }))
    throw new Response("No product with id " + params.id, {
      status: 404,
      statusText: "Product Not Found",
    });
  }
  return { id: params.id, name };
};

const forbiddenLoader = async () => {
  throw new Response("You must log in to see this page", {
    status: 403,
    statusText: "Forbidden",
  });
};

// ── Pages ──
const Home = () => <p>Home. Pick a test case from the list above.</p>;

const Product = () => {
  const { id, name } = useLoaderData(); // data returned by productLoader
  return <p className="ok">Product {id}: <strong>{name}</strong> (loader succeeded, no error)</p>;
};

// A plain JavaScript Error thrown while rendering. React Router catches it too.
const Crash = () => {
  throw new Error("Boom: this component crashed while rendering");
};

// Scoped catch-all: matches /shop/<anything>. Not an error, just a normal route
// that renders inside the layout. Compare with the root boundary used for /nope.
const NotFound = () => {
  const rest = useParams()["*"]; // the part of the URL that matched the "*"
  return <p className="ok">Scoped 404 page for <code>/shop/{rest}</code> (a normal route, layout stays)</p>;
};

// ── UI helpers ──
const Badge = ({ color, children }) => <span className={`badge ${color}`}>{children}</span>;

// Shared error screen. "scope" says WHICH boundary caught the error.
const ErrorView = ({ scope, layoutNote }) => {
  const error = useRouteError();
  const { pathname } = useLocation();

  const isResponse = isRouteErrorResponse(error);
  const heading = isResponse ? `${error.status} ${error.statusText}` : "JavaScript Error";
  const detail = isResponse ? String(error.data) : error?.message ?? "Unknown error";

  return (
    <div className="error-card">
      <h2>{heading}</h2>
      <dl>
        <dt>Caught by</dt><dd>{scope}</dd>
        <dt>Thrown value is</dt>
        <dd>{isResponse ? "a Response (isRouteErrorResponse = true)" : "an Error object (isRouteErrorResponse = false)"}</dd>
        <dt>Message</dt><dd>{detail}</dd>
        <dt>Router path</dt><dd>{pathname}</dd>
        <dt>Layout</dt><dd>{layoutNote}</dd>
      </dl>
      <Link to="/">Back to home</Link>
    </div>
  );
};

// Boundary A: errorElement takes a React ELEMENT. Sits inside the layout.
const ChildError = () => (
  <ErrorView
    scope={<><Badge color="child">errorElement</Badge> on the pathless child route</>}
    layoutNote="Header and counter above are still mounted. Only the Outlet area changed."
  />
);

// Boundary B: ErrorBoundary takes a COMPONENT. Same behaviour, different prop style.
const RootError = () => (
  <ErrorView
    scope={<><Badge color="root">ErrorBoundary</Badge> on the root route</>}
    layoutNote="The whole Layout was replaced, so the nav and counter are gone."
  />
);

// ── Layout: persists across navigation, so you can see when it is replaced ──
const cases = [
  { to: "/products/1",   what: "Loader succeeds",                          where: "No error" },
  { to: "/products/99",  what: "Loader throws Response 404",               where: "Child errorElement" },
  { to: "/forbidden",    what: "Loader throws Response 403",               where: "Child errorElement" },
  { to: "/crash",        what: "Component throws Error while rendering",   where: "Child errorElement" },
  { to: "/shop/anything",what: 'Scoped path="*" route',                    where: "Normal page (no error)" },
  { to: "/nope",         what: "No route matches this URL",                where: "Root ErrorBoundary" },
];

const Layout = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="wrap">
      <h1>404 and error routes</h1>

      <div className="bar">
        <Badge color="layout">Layout</Badge>
        <span>Counter (state): <code>{count}</code></span>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <span className="hint">If this disappears or resets, the Layout was replaced by an error boundary.</span>
      </div>

      <table>
        <thead><tr><th>Click</th><th>What happens</th><th>Handled by</th></tr></thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.to}>
              <td><NavLink to={c.to}>{c.to}</NavLink></td>
              <td>{c.what}</td>
              <td>{c.where}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="outlet">
        <Badge color="outlet">Outlet</Badge>
        {/* Matched child, or the child errorElement, renders here */}
        <Outlet />
      </div>
    </div>
  );
};

// ── Route tree ──
const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,        // "Component" = pass a component (instead of element: <Layout />)
      ErrorBoundary: RootError, // catches what the child boundary does NOT: unmatched URLs, errors in Layout itself.
                                // Replaces the ENTIRE layout.
      children: [
        {
          // Pathless route: no "path", it only exists to hold an errorElement.
          // Errors from the routes below render in the Outlet, so Layout stays alive.
          errorElement: <ChildError />,
          children: [
            { index: true, element: <Home /> },
            { path: "products/:id", loader: productLoader, element: <Product /> },
            { path: "forbidden", loader: forbiddenLoader, element: <p>Never rendered</p> },
            { path: "crash", element: <Crash /> },
            { path: "shop/*", element: <NotFound /> },
          ],
        },
      ],
    },
  ],
  { basename: BASE }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);