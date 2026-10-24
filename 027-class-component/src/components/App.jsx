// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "../Style.css";
import About from "./About";

const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <About />,
        },
    ],
    { basename: "/028-class-component" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);