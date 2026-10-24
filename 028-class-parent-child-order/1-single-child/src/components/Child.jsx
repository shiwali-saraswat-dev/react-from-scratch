// ─────────────────────────────────────────────────────────────────────
// Child.jsx: CHILD class component
//
// Rendered by the parent (App.jsx) inside its render() as <Child />.
// It has no state and no props. 
// It only logs each lifecycle method so you can see WHEN React calls it, compared with the parent.
//
// Where this file's logs appear in the console (P = Parent log, C = Child log):
//   Page load : P constructor, P render, C constructor, C render
//   On update : P render, C render
// ─────────────────────────────────────────────────────────────────────

// Named import of the base class. It gives this class render() and the lifecycle methods.
import { Component } from "react";

class Child extends Component {
  // MOUNTING: runs once, when the parent's render() reaches <Child /> for the first time.
  // That is why it logs AFTER "Parent render": the child does not exist until the parent returns it.
  constructor(props) {
    super(props); // must be first: runs the base class constructor and sets this.props
    console.log("Child constructor");
  }

  // MOUNTING and UPDATING: runs on first load and each time the parent re-renders.
  // It only describes the UI, so it must not change state or do side effects.
  render() {
    console.log("Child render");
    return <h2>Child</h2>;
  }
}

// Default export: the parent imports it with `import Child from "./Child"`.
export default Child;