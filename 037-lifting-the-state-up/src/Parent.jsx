import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Child from "./components/Child";

// Parent component (a "container" component).
// The shared state lives here. This is "lifting state up":
// when two components need the same data, keep it in their closest common parent.
class Parent extends Component {
    constructor(props) {
        super(props); // Always call super(props) first in a class constructor

        // Initial state: the counter starts at 0
        this.state = {
          count: 0,
        };
    }

    // Handler that updates the state.
    // An arrow function keeps `this` bound to the component, so it works when passed to the child as a prop.
    incrementCount = () => {
        // The functional form of setState uses the latest state value,
        // which is safer than reading this.state.count directly.
        this.setState((prevState) => ({
            count: prevState.count + 1,
        }));
    };

    // Describes what appears on the screen.
    // It runs again whenever the state changes.
    render() {
        return (
            <div>
                {/* The parent displays its own state */}
                <p>Parent Count: {this.state.count}</p>

                {/* Pass data and the handler down to the child as props:
                    - count:       current value, for display
                    - onIncrement: function the child calls to ask the parent to update */}
                <Child count={this.state.count} onIncrement={this.incrementCount} />
            </div>
        );
    }
}

// Find <div id="root"> in index.html and render the Parent component inside it.
// This is what makes the app appear in the browser.
createRoot(document.getElementById("root")).render(<Parent />);

export default Parent;