// ═════════════════════════════════════════════════════════════════════
// 023-react-routing / App.jsx
//
// What this file does, in order:
//   1. Defines the layout shared by every page (AppLayout)
//   2. Defines which URL shows which component (the route tree)
//   3. Creates the router from that tree (createBrowserRouter)
//   4. Hands the router to React (RouterProvider)
//
// What happens when the URL changes (for example the user clicks "About"):
//   URL becomes /023-react-routing/about
//   -> the router removes the basename, leaving "/about"
//   -> it matches "/about" against the route tree
//   -> only the <Outlet /> content changes (Body -> About)
//   -> Header stays mounted and the browser never reloads the page
// ═════════════════════════════════════════════════════════════════════

import ReactDOM from "react-dom/client";

// createBrowserRouter : builds the router object from a route array.
//                       Uses the HTML5 History API, so URLs are clean (/about, not /#/about).
// Outlet : a placeholder inside a parent route's component. It marks where the matched child route renders.
// RouterProvider : puts the router into the React tree so every component can use routing hooks (useNavigate, useParams, ...). 
//                  It replaces the older <BrowserRouter> wrapper. 
//                  In v7 it is imported from "react-router/dom" when you render with react-dom.
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import "../Style.css";
import Body from "./Body";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";

// AppLayout is the parent route's component. Everything that must appear on EVERY page (header, footer, wrappers etc) goes here.
// <Outlet /> is the swap area. The router puts the matched child here:
//     "/"        -> <Body />
//     "/about"   -> <About />
//     "/contact" -> <Contact />
// Without <Outlet />, the child routes match but nothing is rendered.
const AppLayout = () => (
  <div className="app">
    <Header /> {/* stays mounted across navigation, so it never re-renders from scratch */}
    <Outlet /> {/* the matched child route renders here */}
  </div>
);

// Each route is an object:
//   path         -> the URL segment this route matches
//   element      -> the component to render when it matches
//   children     -> nested routes, rendered inside the parent's <Outlet />
//   errorElement -> what to render if this route or its children fail
//   index: true  -> "default child", renders when the URL is exactly the parent's path
const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout />, // parent route: the shared shell(Header + Outlet)
            children: [
                {
                    path: "/", // home — renders Body inside Outlet
                    element: <Body />,
                },
                {
                    path: "/about",   // /023-react-routing/about
                    element: <About />,
                },
                {
                    path: "/contact", // /023-react-routing/contact
                    element: <Contact />,
                }
            ],

            // errorElement (404 / error routes) - Shown when:
            // (a) no route matches the URL (React Router creates a 404), or
            // (b) a component or loader under this route throws.
            // Because it is on the PARENT, it covers every child below.
            // Inside it, Error.jsx reads the details with useRouteError().
            errorElement: <Error />, 
        },
    ],
    // basename: the part of the URL that belongs to the HOSTING, not to the app.
    // The app is served under /023-react-routing/, so the router strips it before matching.
    // Consequence: write paths WITHOUT it everywhere (<Link to="/about">, navigate("/")).
    // Do not hardcode it in links, or you will get /023-react-routing/023-react-routing/about.
    { basename: "/023-react-routing" }
);

// Create a React root attached to the DOM element with id "root".
// This root serves as the entry point where the React component tree will be rendered into the actual DOM.
// Mount the React app — find the #root div in index.html and hand it to React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component: AppLayout, which internally renders everything
// root.render(<AppLayout />);

// RouterProvider replaces the old root.render(<AppLayout />) approach —
// it injects the router context so every component in the tree can access 
// navigation, params, and location via React Router hooks
root.render(<RouterProvider router={appRouter} />);