import React from "react";

class Child extends React.Component {
    constructor(props) {
        super(props);
        console.log(`${props.name} constructor`);
        this.state = { clicks: 0 };
    }

    componentDidMount() {
        console.log(`${this.props.name} componentDidMount`);
    }

    componentDidUpdate(prevProps, prevState) {
        const { name, count } = this.props;
        console.log(`${name} componentDidUpdate`);
        if (prevProps.count !== count) {
            console.log("   -> prop changed: count", prevProps.count, "->", count);
        }
        if (prevState.clicks !== this.state.clicks) {
            console.log("   -> state changed: clicks", prevState.clicks, "->", this.state.clicks);
        }
    }

    componentWillUnmount() {
        console.log(`${this.props.name} componentWillUnmount`);
    }

    render() {
        console.log(`${this.props.name} render`);
        return (
            <div style={{ marginTop: 16, padding: 12, border: "2px solid #fc8019", borderRadius: 8 }}>
                <h3>{this.props.name}</h3>
                <p>count from parent: {this.props.count}</p>
                <p>own clicks: {this.state.clicks}</p>
                <button onClick={() => this.setState((s) => ({ clicks: s.clicks + 1 }))}>
                    {this.props.name} +1
                </button>
            </div>
        );
    }
}

export default Child;