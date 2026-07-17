import React from "react";
import ReactDOM from "react-dom/client";

// A plain React Element created using JSX (equivalent to React.createElement("h2", {}, "I am a React Element")).
// This is just a JS object describing the UI, not yet rendered to the DOM.
const elem = <h2>I am a React Element</h2>;

// Demonstrates embedding a React Element inside another component's JSX using curly braces {}. 
// Just like JS expressions, a React Element(which is itself just an object) can be inserted directly into JSX.
const HeadingComponent = () => (
  <div id="container">
    {/* Rendering the previously created React Element inside JSX */}
    {elem}
    <h1>This is React.</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the component to the DOM
root.render(<HeadingComponent />);