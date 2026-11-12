import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

// Eager imports: shown on first load, so lazy loading them would only add a loading flash
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";   // note: shadows the global Error; ErrorPage is a safer name
import { OfflineBanner } from "./components/OfflineIndicator";
import "./Style.css";


// Context object. Holds the default user data and is used both to PROVIDE (UserContext.Provider below) and to READ (useContext(UserContext)) the value.
// import UserContext from "./utils/UserContext";

// Lazy pages: each becomes a separate JS chunk, downloaded on first visit.
// Each file must use `export default`, and each needs a <Suspense> above it (see AppLayout).
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

/*
 * AppLayout: the shared shell around every page.
 *   - provides the user data to the whole app through Context
 *   - renders Header on every route
 *   - renders the matched page in <Outlet />
 */
const AppLayout = () => {
  return (
      <div className="app">
          <Header />
          {/* One Suspense for ALL lazy pages: while a page chunk downloads, show the fallback.
              Header stays visible because it is outside this Suspense. */}
          <OfflineBanner />
          <Suspense fallback={<div>Loading data...</div>}>
            <Outlet /> {/* matched child route renders here: Body / Profile / About / Contact */}
          </Suspense>
      </div>
  );
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> }, // home, eager
        { path: "/about", element: <About /> }, // lazy
        { path: "/contact", element: <Contact /> }, // lazy
      ],
      errorElement: <Error />,
    },
  ],
  { basename: "/032-offline-indicator" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);