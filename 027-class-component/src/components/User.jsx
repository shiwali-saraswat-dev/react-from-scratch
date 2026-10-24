// ─────────────────────────────────────────────────────────────────────
// User.jsx: FUNCTIONAL component (the counterpart of UserClass.jsx)
//
// Same card as UserClass, written as a plain function:
//   - no class, no constructor, no render(), no `this`
//   - props arrive as the function argument
//   - state comes from the useState hook
//   - the returned JSX is what gets rendered
//
//   Class (UserClass)                    Functional (this file)
//   ───────────────────────────────────  ─────────────────────────────────
//   class X extends React.Component      const X = (props) => {...}
//   this.props.name                      name (destructured argument)
//   this.state = { count: 0 }            const [count] = useState(0)
//   render() { return (...) }            return (...)
// ─────────────────────────────────────────────────────────────────────

// useState is a HOOK: a function that lets a functional component hold state.
// It is a named import from react. No `React` import is needed for JSX in modern setups.
import { useState } from "react";

// A functional component is just a function that returns JSX.
// ({name}) destructures props in the parameter, the same as writing:
//     const User = (props) => { const { name } = props; ... }
// In the class version, the equivalent line is: const { name } = this.props;
// The function body runs again on EVERY re-render, which is why it plays the role of render().
const User = ({name}) => {
    // useState(initialValue) returns an array of two items: [currentValue, setterFunction].
    // Array destructuring takes the first one: count is the current value, starting at 0.
    // Class equivalent: this.state = { count: 0 }
    //
    // Note: only the value is destructured here. 
    // The setter (the second item) is NOT taken, so nothing in this component can change count. 
    // It stays 0 permanently.
    // To make it changeable, write: const [count, setCount] = useState(0);
    // and call setCount(count + 1), which replaces the value (class setState merges instead).
    const [count] = useState(0);
    const [count2] = useState(0);

    // Hooks must be called at the top level of the component, in the same order on every render.
    // Never put useState inside an if, a loop or a nested function.

    return (
        <div className="profile-card">
            {/* Static title so you can tell this card from the class-based one */}
            <h2 className="profile-name">Functional Component</h2>

            {/* Reads the state values directly. No this.state.count needed, because
                count is just a local variable of the function. */}
            <p>Count: { count }</p>
            <p>Count2: { count2 }</p>

            {/* name comes from the PARENT as a prop (read-only).
                Class equivalent: {this.props.name} */}
            <h4>Name: {name}</h4>

            {/* Hard-coded text. UserClass receives location as a prop, but this version doesn't,
                so every User card would show Ayodhya. */}
            <p>Location: Ayodhya</p>
            <p>Contact: 1111111111</p>
        </div>
    );
};

// Default export
export default User;