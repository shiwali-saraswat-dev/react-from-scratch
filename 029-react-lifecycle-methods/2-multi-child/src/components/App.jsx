import React from "react";
import ReactDOM from "react-dom/client";
import Child from "./Child";

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Parent constructor");
        this.state = { count: 0, showChild2: true };
    }

    componentDidMount() {
        console.log("Parent componentDidMount");
    }

    componentDidUpdate() {
        console.log("Parent componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("Parent componentWillUnmount");
    }

    render() {
        console.log("Parent render");
        return (
            <div style={{ padding: 20, fontFamily: "sans-serif" }}>
                <h2>Parent (count = {this.state.count})</h2>
                <p>Open DevTools console to see the lifecycle logs.</p>

                <button onClick={() => this.setState((s) => ({ count: s.count + 1 }))}>
                    Parent +1
                </button>{" "}
                <button onClick={() => this.setState((s) => ({ showChild2: !s.showChild2 }))}>
                    {this.state.showChild2 ? "Hide" : "Show"} Child2
                </button>

                <Child name="Child1" count={this.state.count} />
                {this.state.showChild2 && <Child name="Child2" count={this.state.count} />}
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);