import React from "react";
import ReactDOM from "react-dom/client";

// Child component: renders a styled heading with a custom attribute
const Title = () => (
  <h1 className="head" tabIndex="5">Hello World using JSX!</h1>
);

// Parent component: demonstrates the 3 different ways to render a
// functional component inside JSX

const HeadingComponent = () => (
  <div className="container">
    {/* 1. Self-closing JSX tag — standard/recommended way.
        Babel converts this to React.createElement(Title, {}, null).
        React treats Title as a proper component (handles re-renders,
        state, lifecycle, etc. correctly). */}
    <Title />

    {/* 2. Open + close JSX tag — functionally identical to <Title />.
        Useful when passing children between the tags
        (e.g. <Title>some content</Title>), but for a component
        with no children, <Title /> is the cleaner convention. */}
    <Title></Title>

    {/* 3. Calling the component as a plain JS function inside {}.
        This works and renders the same output, but bypasses React's
        component model — no hooks support, no lifecycle handling,
        no reconciliation benefits. NOT recommended. */}
    {Title()}

    <h1 id="heading">Hello World using React Functional Component!</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component, which internally renders Title
// three different ways for demonstration purposes
root.render(<HeadingComponent />);