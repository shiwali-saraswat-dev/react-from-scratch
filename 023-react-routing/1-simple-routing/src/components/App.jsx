// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

function Home() {
  return <h1>Hello World</h1>;
}

const router = createBrowserRouter(
    [
        { path: "/", Component: Home },
    ],
    {
        // The app is served from /023-react-routing/1-simple-routing/.
        // basename tells the router to strip that prefix before matching,
        // so the URL above is treated as "/" and matches Home.
        basename: "/023-react-routing/1-simple-routing",
    }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);