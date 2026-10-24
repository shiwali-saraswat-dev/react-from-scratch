// ─────────────────────────────────────────────────────────────────────
// About.jsx: CLASS component version
//
// Same page as the functional version commented out below.
// Goal of this file: understand how a class component maps to a functional one.
//
//   Functional                          Class
//   ─────────────────────────────────   ──────────────────────────────────
//   const About = (props) => {...}      class About extends Component {...}
//   props (function argument)           this.props
//   useState(...)                       this.state + this.setState(...)
//   return (<jsx/>)                     render() { return (<jsx/>) }
//   useEffect(() => {...}, [])          componentDidMount()
// ─────────────────────────────────────────────────────────────────────

// import User from "./User"; // (kept for comparison with UserClass below).

import UserClass from "./UserClass"; // The class About renders it inside render().

import { Component } from "react";
// ─────────────────────────────────────────────────────────────
// There are 2 ways to create a class component:
//
// 1. Default import: use React.Component
//      import React from "react";
//      class About extends React.Component { ... }
//
// 2. Named import: use Component directly (shorter, used in this file)
//      import { Component } from "react";
//      class About extends Component { ... }
//
// Both give exactly the same result. Which one you pick is only a style choice.
//
// Why `extends` is required: it is what gives the class the React features
// render(), this.props, this.state and this.setState().
// Without it, the class is just a plain JavaScript class, not a component.
// ─────────────────────────────────────────────────────────────


// ───────────── ORIGINAL FUNCTIONAL VERSION (kept for reference) ─────────────
// A functional component is just a function that returns JSX. There is no
// constructor, no `this` and no render() method. The function body IS the render.

// const About = () => {
//    return (
//         <div>
//             <h1>About</h1>
//             <h2>This is React from Scratch.</h2>
// 
//             <div className="profile-grid">
//                 {/* <User name={"Ram Chandra"} /> */}
//                 <UserClass name={"Ram Chandra"} location={"Ayodhya"} />
//             </div>
//         </div>
//     );
// };


// ───────────── CLASS VERSION ─────────────
// `extends Component` is what turns this JS class into a React component.
// React creates ONE instance of this class, keeps it alive while the component is on screen,
// and calls its lifecycle methods at the right moments.
class About extends Component { 

    // constructor: runs ONCE, when React first creates this component (the "mounting" phase).
    // Use it to set up the initial state. Functional equivalent: the useState(initialValue) calls
    // that run on the first render.
    constructor(props) {
        // super(props) calls the parent class (Component) constructor.
        // It MUST come first, before `this` is used. Passing props makes `this.props` available.
        // It is mandatory whenever you write a constructor, but the constructor itself is optional. 
        // A class with no constructor and no state works fine.
        super(props); 

        // this.state: ONE object that holds all of this component's state.
        // Functional equivalent, one useState per value:
        //     const [count, setCount] = useState(0);
        //     const [count2, setCount2] = useState(2);
        //     const [count3, setCount3] = useState(0);
        // Writing this.state is only needed if the component HAS state.
        // Here the values are declared but never read in render(), so they are not used yet.
        this.state = { 
            count: 0,
            count2: 2,
            // setState() MERGES into this object: it only changes the keys you pass.
            // So count3 keeps its value 0 unless a this.setState({ count3: ... }) call sets it.
            // (useState setters are different: they REPLACE the whole value, not merge.)
            count3: 0, // It will not get update as i am not setting this in this.setState() later on in the script
        };

        console.log("About Class - Constructor");
    }

    // render: REQUIRED in every class component. React calls it on first mount AND again after every this.setState() or when new props arrive. 
    // It must only return JSX and must not change state itself.
    // Functional equivalent: the part of the function after the hooks, ending in `return (...)`.
    render() {
        console.log("About Class - Render");
        return (
            <div>
                <h1>About</h1>
                <h2>This is React from Scratch.</h2>

                <div className="profile-grid">
                    {/* <User name={"Ram Chandra"} /> */}
                    {/* ↑ functional child: User receives name as a function argument (props.name) */}

                    {/* ↓ class child: UserClass receives the same props and reads them
                        as this.props.name and this.props.location */}
                    <UserClass name={"Ram Chandra"} location={"Ayodhya"} />
                </div>
            </div>
        );
    }
}

// Default export - Same export style as the functional component version.
export default About;


/*

Output:-
   About Class - Constructor
   About Class - Render

*/