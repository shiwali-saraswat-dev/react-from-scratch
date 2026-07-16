
// Importing React from node_modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node_modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";


/* Do the below HTML in React:
<div id="parent">
    <div id="child">
        <h1>I am H1 tag</h1>
    </div>
    <div id="child2">
        <h1>I am H1 tag</h1>
        <h2>I am H2 tag</h2>
    </div>
</div> */

const div = React.createElement("div", {id: "parent"}, 
    [
        React.createElement("div", {id: "child"}, 
            React.createElement("h1", {}, "I am H1 tag")
        ),
        React.createElement("div", {id: "child2"}, 
            [
                React.createElement("h1", {}, "I am H1 tag"),
                React.createElement("h2", {}, "I am H2 tag")
            ]
        )
    ]
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(div);