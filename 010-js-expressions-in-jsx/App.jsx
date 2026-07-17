import React from "react";
import ReactDOM from "react-dom/client";

// A plain JavaScript variable defined outside JSX
const number = 10000;

// Demonstrates embedding JavaScript expressions inside JSX using curly braces {}. 
// Any valid JS expression (variables, function calls, ternary operators, arithmetic, etc.) can be placed inside {}.
const HeadingComponent = () => (
  <div id="container">
    {/* Embedding the JS variable "number" directly inside JSX */}
    <h2>{number}</h2>
    <h1>This is React.</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the component to the DOM
root.render(<HeadingComponent />);