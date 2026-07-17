import React from "react";
import ReactDOM from "react-dom/client";

// Using core React API (React.createElement):
// const heading = React.createElement("h1", {}, "Hello World using Core React!");

// Using JSX syntax directly:
// const jsxHeading = <h1 id="heading">Hello World using JSX!</h1>;

// Using a React Functional Component:
const HeadingComponent = () => {
  return <h1 id="heading">Hello World using React Functional Component!</h1>;
};

// Equivalent shorthand (implicit return, single-line arrow function):
// const HeadingComponent = () => <h1 id="heading">Hello World using React Functional Component!</h1>;

// Equivalent multi-line version (parentheses required for multi-line JSX):
// const HeadingComponent = () => (
//   <div className="container">
//     <h1 id="heading">Hello World using React Functional Component!</h1>
//   </div>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the functional component
root.render(<HeadingComponent />);
