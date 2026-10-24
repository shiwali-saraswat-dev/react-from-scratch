// ─────────────────────────────────────────────────────────────────────
// UserClass.jsx: CLASS component (child of About)
//
// What this file demonstrates:
//   1. Receiving props          -> this.props
//   2. Holding state            -> this.state
//   3. Updating state           -> this.setState({...})  (never assign to this.state directly)
//   4. Lifecycle order (logs)   -> Constructor, then Render
//
// Functional equivalent of the whole component:
//   const UserClass = ({ name, location }) => {
//       const [count, setCount] = useState(0);
//       const [count2, setCount2] = useState(2);
//       return (...same JSX...);
//   };
// ─────────────────────────────────────────────────────────────────────

// Way 1 of creating a class component: default import, then React.Component.
// (About.jsx uses way 2: import { Component } and extends Component. Both are equivalent.)
import React from "react";

class UserClass extends React.Component {
    // constructor runs ONCE, when this component is first created (mounting).
    // Functional equivalent: the useState(...) calls on the first render.
    constructor(props) {
        // super(props) runs the parent (React.Component) constructor.
        // It must be the first line, before `this` is used, and it is what makes this.props available.
        super(props); 

        // this.state is ONE object holding all state values of this component.
        // Functional equivalent: one useState per value (count, count2, count3).
        this.state = { 
            count: 0,
            count2: 2,
            // setState() MERGES the object you pass into this.state.
            // count3 is never passed to setState, so it keeps its initial value 0 forever.
            // (A useState setter would REPLACE the value instead of merging.)
            count3: 0, // It will not get update as i am not setting this in this.setState() later on in the script
        };
    }

    // render() is called on first mount AND again after every this.setState().
    // It must only return JSX. Do not set state inside it.
    render(){
        {/* Destructuring Props */}
        // Props are read-only data passed by the parent (<UserClass name=... location=... />).
        // Destructuring pulls them out of this.props so we can write {name} instead of {this.props.name}.
        const { name, location } = this.props;
        // Same idea for state: pull values out of this.state.
        // count3 is not destructured because it is not displayed anywhere.
        const { count, count2 } = this.state;

        return (
            <div className="profile-card">
                {/* Receiving State Variable:: <h1>Class-based Component — count: { this.state.count }</h1> */}
                <h2 className="profile-name">Class-based Component</h2> 
                {/* Shows the current state value. It updates on screen after each setState. */}
                <p>Count: { count }</p> {/* Receiving Destructured State Variable */}
                <button onClick={() => {
                    // NEVER UPDATE STATE VARIABLE DIRECTLY
                    // Wrong:  this.state.count = this.state.count + 1;
                    // Direct assignment changes the value but does NOT tell React to re-render,so the screen would not update. 
                    // setState() updates state AND triggers render().
                    // Because setState merges, only the keys listed here change; count3 is untouched.
                    this.setState(
                        {
                            count: this.state.count + 1,
                            count2: this.state.count2 + 1,
                        }
                    );
                    
                    // Don't do this, instead batch it up in the single this.setState() 
                    // Reason: one setState call with all changes is clearer and does the work together.
                    // Separate calls are also risky when they update the SAME key from this.state: both read the same old value, so the second call can overwrite the first.
                    // this.setState( 
                    //     {
                    //         count2: this.state.count2 + 1,
                    // </div>    }
                    // );
                }}>
                    Count Increase
                </button>
                {/* count2 starts at 2 and increases together with count, from the same click */}
                <p>Count2: { count2 }</p>
                
                {/* name and location come from the PARENT (About), not from state.
                    A child must never change its own props. */}
                <h4>Name: {name}</h4> {/* Receiving Destructured Prop */}
                {/* Receiving Props:: <h2>Name: {this.props.name}</h2> */}
                <p>Location: {location}</p>
                {/* Hard-coded text: not state, not props, so it never changes */}
                <p>Contact: 1111111111</p>
            </div>
        );
    }
}

// Default export - Same export style as the functional component version
export default UserClass;