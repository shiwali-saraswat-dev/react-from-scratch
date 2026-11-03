import React from "react";

/*
 * CHILD COMPONENT (class based)
 *
 * Receives from Parent:  props.count  (read-only, changed only by Parent)
 * Owns itself:           state.clicks (changed only by this component)
 *
 * Lifecycle order on first load (mounting):
 *   1. Child constructor
 *   2. Child render
 *   3. Child componentDidMount  <- runs BEFORE Parent's componentDidMount
 *
 * What makes Child re-render (then componentDidUpdate runs):
 *   - Parent re-renders (e.g. "Parent +1"), even if props are unchanged
 *   - Child's own setState ("Child +1"), Parent is NOT affected in this case
 */
class Child extends React.Component {

    // ---------------------------------------------------------------
    // 1) constructor: runs ONCE, when Child is created (mounted).
    //    Runs again only if Child is removed and shown again.
    //    Use it to: set initial state.
    //    Do NOT: call APIs or touch the DOM here.
    // ---------------------------------------------------------------
    constructor(props) {
        super(props);                           // always first, so this.props works
        console.log("Child constructor");

        // state = data owned by Child.
        // clicks -> how many times the "Child +1" button was pressed
        this.state = { clicks: 0 };
    }

    // ---------------------------------------------------------------
    // 3) componentDidMount: runs ONCE, after Child's first render is on screen.
    //    The DOM exists now, so this is safe for API calls, timers, listeners.
    //    Order: Child's didMount fires before Parent's didMount.
    // ---------------------------------------------------------------
    componentDidMount() {
        console.log("Child componentDidMount");
        // Best place for API calls (next topic: 030-react-fetch-api)
    }

    // ---------------------------------------------------------------
    // 4) componentDidUpdate: runs after EVERY re-render except the first.
    //    prevProps / prevState = the values from BEFORE this update,
    //    this.props / this.state = the NEW values. Compare to see what changed.
    // ---------------------------------------------------------------
    componentDidUpdate(prevProps, prevState) {
        console.log("Child componentDidUpdate");
        // Always compare old vs new before doing work here.
        // Calling setState here without a condition = infinite loop.

        // Did the Parent send a new count? (props changed)
        if (prevProps.count !== this.props.count) {
            console.log("   -> prop changed: count", prevProps.count, "->", this.props.count);
        }

        // Did Child's own clicks change? (state changed)
        if (prevState.clicks !== this.state.clicks) {
            console.log("   -> state changed: clicks", prevState.clicks, "->", this.state.clicks);
        }
    }

    // ---------------------------------------------------------------
    // 5) componentWillUnmount: runs just before Child is removed from the screen
    //    (for example when Parent's "Hide Child" button sets showChild = false).
    //    Use it for cleanup so nothing keeps running in the background.
    // ---------------------------------------------------------------
    componentWillUnmount() {
        console.log("Child componentWillUnmount");
        // Cleanup: clear timers, remove listeners, abort fetch
    }

    // ---------------------------------------------------------------
    // 2) render: returns the JSX (UI) for the current props + state.
    //    Runs on mount AND on every update. Keep it pure:
    //    no setState, no API calls, no DOM changes inside it.
    // ---------------------------------------------------------------
    render() {
        console.log("Child render");
        return (
            <div style={{ marginTop: 16, padding: 12, border: "2px solid #fc8019", borderRadius: 8 }}>
                <h3>Child</h3>

                {/* props: value coming DOWN from Parent, read-only */}
                <p>count from parent: {this.props.count}</p>

                {/* state: Child's own value, changes only through setState */}
                <p>own clicks: {this.state.clicks}</p>

                {/* Functional update (s) => ... uses the latest state, so fast clicks never get lost.
                    Log order: Child render, Child componentDidUpdate (Parent does not re-render). */}
                <button onClick={() => this.setState((s) => ({ clicks: s.clicks + 1 }))}>
                    Child +1
                </button>
            </div>
        );
    }
}

export default Child;