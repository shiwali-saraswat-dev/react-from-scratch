// ReactDOM -> connects React to the browser DOM (createRoot)
import ReactDOM from "react-dom/client";

/*
 * PROP DRILLING
 *
 * Prop drilling = passing data through several levels of components, where the
 * middle components do NOT need the data. They only receive it to hand it down,
 * like a drill boring through every layer to reach the bottom.
 *
 * Component tree (data flows DOWN, in one direction):
 *
 *   App      (owns `name`)                    Level 1
 *    └─ Parent   (does NOT use name, only forwards it)    Level 2  <- the "drilled" layer
 *        └─ Child    (actually uses name)               Level 3
 *
 * PHP comparison: like passing a DB connection as a parameter through 5 functions,
 * when only the last function runs a query. Every function in between must accept
 * the parameter and pass it on.
 *
 * Why it is a problem:
 *   1. Extra code: every middle component needs the prop in its signature and in its JSX.
 *   2. Tight coupling: Parent cannot be reused without also receiving `name`.
 *   3. Hard to change: rename `name` to `userName`, or add a second prop, and you must
 *      edit EVERY component on the path.
 *   4. Wasted re-renders: when `name` changes, every component on the path re-renders,
 *      even the middle ones that never display it.
 *   5. Gets worse with depth: with 3 levels it is harmless, with 8 levels it is painful.
 *
 * Is it always bad? No. Passing props 1-2 levels is normal and the simplest option.
 * It becomes a problem only when the path is long and the middle layers are just "pipes".
 */

// ---------------------------------------------------------------
// LEVEL 3: Child. The ONLY component that actually uses `name`.
// It reads the prop and displays it. This is the destination of the drill.
// ---------------------------------------------------------------
const Child = ({ name }) => <h2>Hello, {name}!</h2>;

// ---------------------------------------------------------------
// LEVEL 2: Parent. The "pipe".
// It never displays `name`. It receives the prop only so it can pass it to Child.
// This is the prop drilling: Parent is forced to know about a value it does not need.
// If Child needed a second value (for example `email`), Parent would also have to
// accept it and forward it.
// ---------------------------------------------------------------
const Parent = ({ name }) => <Child name={name} />;

// ---------------------------------------------------------------
// LEVEL 1: App. The owner of the data.
// In a real app this value would come from state, an API response or a login.
// Props flow ONE WAY, from here down. Child cannot send data back up directly,
// it would need a callback function passed down the same way (and drilled too).
// ---------------------------------------------------------------
const App = () => {
  const name = "Asha";
  return <Parent name={name} />;
};

// Mount the app: find <div id="root"> in index.html and hand it to React
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/*
 * HOW TO AVOID PROP DRILLING
 *
 * 1. Context API (built in). Put the value in a Context at the top, and let any
 *    component below read it directly with useContext, skipping the middle layers:
 *      App  -> <NameContext.Provider value={name}>
 *      Child -> const name = useContext(NameContext);
 *    Parent no longer knows `name` exists. (Your food app does this with UserContext.)
 *
 * 2. Component composition (children prop). Build the Child in App and pass it down
 *    as `children` or a prop, so the middle layers never touch the data:
 *      <Parent><Child name={name} /></Parent>
 *
 * 3. State libraries (Redux, Zustand). For app-wide data used in many places.
 *
 * 4. Keep state close to where it is used. Do not lift state higher than needed.
 */