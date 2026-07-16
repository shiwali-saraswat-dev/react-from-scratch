// Importing React and ReactDOM from node_modules instead of CDN <script> tags
import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement() => Object => HTMLElement (render)
// const heading = React.createElement("h1", {}, "Hello from React!");
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

// JSX (transpiled before it reaches the JSX) - PARCEL - BABEL
// JSX => React.createElement => ReactElement - JS Object => HTMLElement (render)
const jsxHeading = <h1 id="heading">Hello World using JSX!</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);