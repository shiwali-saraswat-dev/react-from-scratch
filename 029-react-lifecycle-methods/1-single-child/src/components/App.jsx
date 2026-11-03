import React from "react";
import ReactDOM from "react-dom/client";
import Child from "./Child";

/*
 * PARENT COMPONENT (class based)
 *
 * Lifecycle order on first load (mounting):
 *   1. Parent constructor        } RENDER PHASE: runs top-down,
 *   2. Parent render             } builds the Virtual DOM, no DOM touched yet
 *   3. Child constructor
 *   4. Child render
 *   5. Child componentDidMount   } COMMIT PHASE: runs bottom-up,
 *   6. Parent componentDidMount  } after DOM is ready (child finishes first)
 *
 * Remember: "Render goes DOWN, Mount comes UP".
 */
class App extends React.Component {

    // ---------------------------------------------------------------
    // 1) constructor: runs ONCE, when the component is created.
    //    Use it to: set initial state, bind methods.
    //    Do NOT: call APIs or touch the DOM here.
    // ---------------------------------------------------------------
    constructor(props) {
        super(props);                       // always first, so this.props works
        console.log("Parent constructor");

        // state = data owned by this component.
        // count     -> number shown in the heading and passed to Child as a prop
        // showChild -> true/false switch to mount or unmount the Child
        this.state = { count: 0, showChild: true };
    }

    // ---------------------------------------------------------------
    // 3) componentDidMount: runs ONCE, after the first render is on screen.
    //    Use it for: API calls, timers, event listeners (next topic: fetch API).
    //    Runs AFTER all children's componentDidMount.
    // ---------------------------------------------------------------
    componentDidMount() {
        console.log("Parent componentDidMount");
    }

    // ---------------------------------------------------------------
    // 4) componentDidUpdate: runs after EVERY re-render (not on first mount).
    //    Triggered by a state change or by new props.
    //    Receives (prevProps, prevState) to compare old vs new values.
    //    If you call setState here, wrap it in a condition or it loops forever.
    // ---------------------------------------------------------------
    componentDidUpdate() {
        console.log("Parent componentDidUpdate");
    }

    // ---------------------------------------------------------------
    // 5) componentWillUnmount: runs just before the component is removed.
    //    Use it for cleanup: clearInterval, removeEventListener, abort fetch.
    //    Note: Parent is the root here, so this logs only if the whole
    //    root is removed (for example root.unmount()).
    // ---------------------------------------------------------------
    componentWillUnmount() {
        console.log("Parent componentWillUnmount");
    }

    // ---------------------------------------------------------------
    // 2) render: returns the JSX (UI) for the current props + state.
    //    Runs on mount AND on every update. Must stay pure:
    //    no setState, no API calls, no DOM changes inside it.
    // ---------------------------------------------------------------
    render() {
        console.log("Parent render");
        return (
            <div style={{ padding: 20, fontFamily: "sans-serif" }}>
                <h2>Parent (count = {this.state.count})</h2>
                <p>Open DevTools console to see the lifecycle logs.</p>

                {/* Parent +1: changes Parent state -> Parent re-renders -> Child re-renders too.
                    Log order: Parent render, Child render, Child componentDidUpdate, Parent componentDidUpdate.
                    (s) => ... is the functional update: always uses the latest state value. */}
                <button onClick={() => this.setState((s) => ({ count: s.count + 1 }))}>
                    Parent +1
                </button>{" "}

                {/* Hide/Show Child: flips showChild to mount or unmount the Child.
                    Hide log order: Parent render, Child componentWillUnmount, Parent componentDidUpdate.
                    Show log order: Parent render, Child constructor, Child render,
                                    Child componentDidMount, Parent componentDidUpdate. */}
                <button onClick={() => this.setState((s) => ({ showChild: !s.showChild }))}>
                    {this.state.showChild ? "Hide" : "Show"} Child
                </button>

                {/* Conditional rendering: Child exists only while showChild is true.
                    `count` goes down to Child as a prop (props down, callbacks up). */}
                {this.state.showChild && <Child count={this.state.count} />}
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);