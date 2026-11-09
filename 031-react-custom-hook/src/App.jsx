import ReactDOM from "react-dom/client";
// Custom hook: reusable counter logic (default export from ./useCounter)
import useCounter from "./useCounter";

/*
 * Two different components use the SAME hook.
 * Same logic, but each one has its own independent count.
 */

// Counter A: starts at 0 (default value of the hook)
const CounterA = () => {
    // Calling the hook = running the function. It returns the object,
    // and we destructure the parts we need.
    // Hooks must be called at the TOP of the component, never inside if/loops.
    const { count, increment, decrement, reset } = useCounter();

    return (
        <div>
            <h3>Counter A: {count}</h3>
            <button onClick={decrement}>-1</button>{" "}
            <button onClick={increment}>+1</button>{" "}
            <button onClick={reset}>Reset</button>
        </div>
    );
};

// Counter B: starts at 10 (we pass a value into the hook, like a function argument)
const CounterB = () => {
    const { count, increment, decrement, reset } = useCounter(10);

    return (
        <div>
            <h3>Counter B: {count}</h3>
            <button onClick={decrement}>-1</button>{" "}
            <button onClick={increment}>+1</button>{" "}
            <button onClick={reset}>Reset</button>
        </div>
    );
};

const App = () => (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h2>Custom Hook: useCounter</h2>
        <CounterA />
        <CounterB />
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);