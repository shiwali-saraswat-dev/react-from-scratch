import React from "react";
import ReactDOM from "react-dom/client";

// createBrowserRouter  — creates the route config using the HTML5 History API (clean URLs, no hash)
// RouterProvider       — renders the router into the React tree, replaces the old <BrowserRouter> wrapper
// Outlet               — placeholder that renders the matched child route's component in the parent layout
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import "../Style.css";
import Body from "./Body";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";

// Layout: Header stays on every page, Outlet swaps the matched child route
const AppLayout = () => (
  <div className="app">
    <Header />
    <Outlet />
  </div>
);

// Define all application routes using the HTML5 History API
// AppLayout is the root layout — all child routes render inside its <Outlet />
// errorElement catches any unmatched route or render error and shows the Error page
// basename scopes all routes under the /food-delivery-app-react subdirectory (GitHub Pages)
const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout />, // persistent shell: Header + Outlet + Footer
            children: [
                {
                    // path: "/", // home — renders Body inside Outlet
                    index: true, // "/" → home (default)
                    element: <Body />,
                },
                {
                    path: "/about",   // /food-delivery-app-react/about
                    element: <About />,
                },
                {
                    path: "/contact", // /food-delivery-app-react/contact
                    element: <Contact />,
                }
            ],
            errorElement: <Error />, // shown on 404 or any route-level error
        },
    ],
    { basename: "/023-react-routing" } // base path for GitHub Pages deployment
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