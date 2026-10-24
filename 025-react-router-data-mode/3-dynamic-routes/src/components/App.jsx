// Run: http://localhost:5173/025-react-router-data-mode/3-dynamic-routes/

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "../Style.css";
import Body from "./Body";
import CategoryRestaurant from "./CategoryRestaurant";

const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <Body />, 
        },
        {
            // ":catId" is a DYNAMIC segment - any value here is captured
            // /category/pizza  ->  useParams() gives { catId: "pizza" }
            path: "/category/:catId",
            element: <CategoryRestaurant />,
        },
    ],
    { basename: "025-react-router-data-mode/3-dynamic-routes" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);