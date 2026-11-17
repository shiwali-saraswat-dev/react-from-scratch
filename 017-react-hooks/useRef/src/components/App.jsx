/* ==========================================================
   useRef DEMO  -  let vs useState vs useRef
   ==========================================================

   WHAT IS useRef?
   ---------------
   useRef gives you a "box" that React keeps alive between renders:

       const ref = useRef(0);
       // ref is NOT the number 0.
       // ref is an object:  { current: 0 }

   You read and write the value through `ref.current`.

   THE TWO SUPERPOWERS
   -------------------
   1. The value SURVIVES re-renders (it is not reset to the initial value).
   2. Changing `ref.current` does NOT trigger a re-render.

   COMPARING THE THREE THINGS IN THIS DEMO
   ----------------------------------------
   | Feature                         | let x   | useState | useRef  |
   |---------------------------------|---------|----------|---------|
   | Survives re-renders?            | NO      | YES      | YES     |
   | Changing it re-renders the UI?  | NO      | YES      | NO      |
   | Reset to initial every render?  | YES     | NO       | NO      |

   WHAT YOU WILL SEE WHEN YOU CLICK
   --------------------------------
   Increase x   -> console shows x=1, x=2, ... but the screen stays "Let = 0".
                   `x` is a plain variable. Changing it does not re-render,
                   so React never repaints the number.
                   Also, any re-render creates a NEW `let x = 0`, so it
                   always starts again from 0.

   Increase Y   -> the screen updates ("State = 1, 2, ...") because setY
                   triggers a re-render. State survives re-renders.

   Increase Ref -> console shows ref= 1, 2, ... but the screen still shows
                   "Ref = 0". The value IS changing (it survived), but no
                   re-render happened, so the screen is not updated.
                   Now click "Increase Y": the component re-renders and the
                   screen suddenly shows the latest ref value.
                   This proves: ref remembers, but does not repaint.

   Stop Printing -> the interval id lives in a ref, so this button (created
                   in a later render) can still reach the SAME interval and
                   stop it. A `let` variable would be lost on every render.

   FLOW
   ----
       setState(...)           ref.current = ...
            |                        |
            v                        v
        re-render              nothing happens
            |                  (value is just stored;
            v                   the screen is unchanged
        screen updates          until some other re-render)

   WHEN TO USE useRef
   ------------------
   1. Store a value that must persist but should NOT cause a re-render:
        - timer / interval ids (this demo)
        - previous value of a prop or state
        - a render counter
        - a flag like "isFirstRender"
   2. Get direct access to a DOM element:
        const inputRef = useRef(null);
        <input ref={inputRef} />
        inputRef.current.focus();   // after mount, current = the <input> element

   IMPORTANT FACTS TO REMEMBER
   ---------------------------
   1. If the value is shown on screen, use useState, not useRef.
   2. Do not read or write ref.current during rendering (React docs rule).
      Render must be pure. Read/write refs in event handlers and effects.
      NOTE: this demo displays `ref.current` while rendering on purpose,
      only to show that it goes stale. Do not do this in real code.
   3. The ref object itself is the same object on every render. Only its
      `current` property changes.
   4. For DOM refs, `current` is null until React mounts the element.
   ========================================================== */

import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../Style.css"; // plain CSS (converted from Tailwind)

const App = () => {
  // ---------- 1. State: survives renders, CAUSES a re-render ----------
  const [y, setY] = useState(0);

  // ---------- 2. Plain variable: reset to 0 on EVERY render ----------
  // Updating it never triggers a re-render, so the screen never changes.
  let x = 0;

  // ---------- 3. Ref: survives renders, does NOT cause a re-render ----------
  // Not the same as `let ref = 0`. It is an object: { current: 0 }
  const ref = useRef(0);

  // Logs on every render, so you can see exactly when React re-renders.
  console.log("Rendering....");

  // ---------- 4. Ref holding a timer id ----------
  // Starts as null; filled with the interval id after mount.
  const i = useRef(null);

  useEffect(() => {
    // Start printing every second.
    i.current = setInterval(() => {
      console.log("Namaste React", Math.random());
    }, 1000);

    // Cleanup: stop the interval when the component unmounts.
    // (In dev, Strict Mode runs mount -> cleanup -> mount to verify this.
    //  Without cleanup you would end up with two intervals.)
    return () => clearInterval(i.current);
  }, []); // [] = run once after the first render

  return (
    <div className="demo-card">
      {/* ---------- let x ---------- */}
      <div className="demo-row">
        <button
          className="btn btn--green"
          onClick={() => {
            x = x + 1; // changes the variable...
            console.log("x=" + x); // ...visible in console only
          }}
        >
          Increase x
        </button>
        {/* Always shows 0: x is re-created as 0 on each render */}
        <span className="value">Let = {x}</span>
      </div>

      {/* ---------- useState ---------- */}
      <div className="demo-row">
        <button className="btn btn--green" onClick={() => setY(y + 1)}>
          Increase Y
        </button>
        {/* Updates immediately: setY triggers a re-render */}
        <span className="value">State = {y}</span>
      </div>

      {/* ---------- useRef ---------- */}
      <div className="demo-row">
        <button
          className="btn btn--green"
          onClick={() => {
            ref.current = ref.current + 1; // value persists, no re-render
            console.log("ref=", ref.current);
          }}
        >
          Increase Ref
        </button>
        {/* Stale until another re-render happens (e.g. click Increase Y) */}
        <span className="value">Ref = {ref.current}</span>
      </div>

      {/* ---------- Stop the interval using the id stored in a ref ---------- */}
      <button
        className="btn btn--danger"
        onClick={() => clearInterval(i.current)}
      >
        Stop Printing
      </button>

      <p className="hint">
        Open the console. 
        Click each button, then click "Increase Y" to see
        the Ref value catch up.
      </p>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);

export default App;