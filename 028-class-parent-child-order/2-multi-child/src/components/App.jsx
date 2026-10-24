// ─────────────────────────────────────────────────────────────────────
// App.jsx: PARENT class component
//
// Purpose: show the ORDER in which React calls class lifecycle methods
// for a parent and its child. Every method only logs to the console.
//
// Expected console order:
//   On page load (mounting)
//     Parent constructor
//     Parent render
//     Child constructor
//     Child render
//     Child componentDidMount
//     Parent componentDidMount
//
//   On button click (updating)
//     Parent render
//     Child render
//     Child componentDidUpdate
//     Parent componentDidUpdate
//
// Rule of thumb:
//   constructor + render        -> top-down  (parent first, then child)
//   componentDidMount / Update  -> bottom-up (child first, then parent)
// ─────────────────────────────────────────────────────────────────────

// Named import of the base class. It gives this class render(), this.props, this.state, this.setState().
import { Component } from "react";

// createRoot is used at the bottom to mount the app. This file is both the parent component
// and the entry file, so it needs this import.
import ReactDOM from "react-dom/client";

// The child class component. It is rendered by App inside render() (see <Child /> below).
import Child from "./Child"; // The class App renders it inside render().

class App extends Component {
  // MOUNTING step 1: runs once, when React first creates the component.
  // Use it to set up the initial state.
  constructor(props) {
    super(props); // must be first: runs the parent class constructor and sets this.props
    this.state = { count: 0 }; // initial state object
    console.log("Parent constructor");
  }

  // MOUNTING step 2 and UPDATING step 1: runs on first load and after every setState.
  // It only describes the UI. It must not change state or do side effects.
  render() {
    console.log("Parent render");
    return (
      <div>
        {/* Shows the current state. Changes on screen after each click. */}
        <h1>Parent</h1>

        {/* Reaching these lines during render() is what triggers each child's constructor and
            render, which is why the children start AFTER "Parent render".
            Order inside the render phase: child1 constructor, child1 render,
            then child2 constructor, child2 render. */}
        <Child name="child1" />
        <Child name="child2" />
      </div>
    );
  }
}

// Mounts the app into <div id="root"> in index.html.
// Not wrapped in <React.StrictMode> on purpose: in development, StrictMode runs
// constructors and render twice, so every log would appear twice and hide the real order.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);