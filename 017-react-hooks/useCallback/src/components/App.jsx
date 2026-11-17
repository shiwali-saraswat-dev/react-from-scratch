/* ==========================================================
   useCallback DEMO  -  "Add Item" form (memoized child)
   ==========================================================

   WHAT IS useCallback?
   --------------------
   useCallback remembers (caches) a FUNCTION between re-renders, so you
   get the SAME function reference every time, until its dependencies change.

       const cachedFn = useCallback(() => { ... }, [dep1, dep2]);
                                     ^ the function to cache   ^ dependencies

   WHY DO WE NEED IT? (the core idea)
   ----------------------------------
   Every render creates a brand NEW copy of every function in the component:

       Render 1:  handleAdd  -> function at address A
       Render 2:  handleAdd  -> function at address B   (A !== B)

   Even though the code is identical, JavaScript sees them as "different".
   That matters when the function is passed as a PROP to a child that is wrapped in React.memo. 
   React.memo skips re-rendering the child if props are unchanged, but a new function = changed prop = child re-renders anyway.

   THE PROBLEM THIS DEMO SHOWS
   ---------------------------
       Click "Re-render parent" -> parent's `count` changes
                                -> parent re-renders
                                -> handleAdd is re-created (new reference)
                                -> memoized child sees a "new" onAdd prop
                                -> child re-renders for no reason

   With useCallback, handleAdd keeps the same reference, so React.memo can skip the child.

   FLOW
   ----
       Parent re-renders
             |
             v
       useCallback: did [deps] change?
         |-- NO  --> return the SAME function  --> child props unchanged
         |                                     --> React.memo SKIPS child
         |-- YES --> return a NEW function     --> child re-renders

   TRY IT YOURSELF
   ---------------
   1. Open the browser console.
   2. Click "Re-render parent" several times.
        - With useCallback (default below): no "Child rendered" log.
        - Replace handleAdd with the plain function version (commented below):
          "Child rendered" logs on EVERY click.
   3. Typing in the child's input DOES log "Child rendered", because the
      child's OWN state changed. React.memo only blocks re-renders caused by
      the PARENT when props are unchanged; it does not block a component's
      own state updates.
      (In dev, Strict Mode may show each log twice; that is normal.)

   IMPORTANT FACTS TO REMEMBER
   ---------------------------
   1. useCallback caches a FUNCTION. useMemo caches a VALUE.
        useCallback(fn, deps)  is the same as  useMemo(() => fn, deps)
   2. useCallback ALONE does nothing useful. It only pays off when:
        - the function is passed to a child wrapped in React.memo, or
        - the function is a dependency of useEffect / useMemo / another hook.
      Without React.memo, the child re-renders anyway whenever the parent does.
   3. Dependencies are compared with Object.is (like ===). 
      If the function uses state or props, list them in the dependency array.
   4. STALE CLOSURE WARNING: with an empty [] array, the function remembers the values from the render where it was created. 
      That is why handleAdd below uses the functional update `setItems(prev => ...)`: 
      it always gets the latest list without needing `items` in the dependencies.
   5. Do NOT wrap every function in useCallback. It has its own cost.
      Use it when you have a measurable re-render problem or a stable reference is genuinely required.
   ========================================================== */

import { memo, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import "../Style.css";

/* ----------------------------------------------------------
   CHILD COMPONENT
   memo(...) tells React: "Only re-render me if my props changed."
   ---------------------------------------------------------- */
const AddItemForm = memo(({ onAdd }) => {
  // Proof of when the child renders.
  console.log("Child rendered");

  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return; // ignore empty input
    onAdd(name.trim()); // call the function received from the parent
    setName("");
  };

  return (
    <div className="child-card">
      <h2 className="child-title">Child: Add item form</h2>
      <div className="row">
        <input
          className="text-input"
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn--green" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
});

/* ----------------------------------------------------------
   PARENT COMPONENT
   ---------------------------------------------------------- */
const App = () => {
  // State 1: unrelated to the child. Changing it re-renders the parent only.
  const [count, setCount] = useState(0);

  // State 2: the list of items the child adds to.
  const [items, setItems] = useState([]);

  // ---------- WITHOUT useCallback ----------
  // New function on every render -> memoized child re-renders every time.
  // const handleAdd = (name) => {
  //   setItems((prev) => [...prev, name]);
  // };

  // ---------- WITH useCallback ----------
  // Same function reference across renders -> React.memo can skip the child.
  const handleAdd = useCallback((name) => {
    // Functional update: reads the latest list, so no `items` dependency needed.
    setItems((prev) => [...prev, name]);
  }, []); // <- empty array: create the function once

  return (
    <div className="parent-card">
      <h1 className="card-title">Parent: useCallback demo</h1>

      <button className="btn btn--blue" onClick={() => setCount(count + 1)}>
        Re-render parent (clicked {count})
      </button>

      <p className="hint">
        Open the console. Clicking the blue button should NOT log
        "Child rendered".
      </p>

      <AddItemForm onAdd={handleAdd} />

      <ul className="items">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);

export default App;