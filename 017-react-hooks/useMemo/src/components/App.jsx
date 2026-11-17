/* ==========================================================
   useMemo DEMO  -  "nth Prime" + Theme Toggle
   ==========================================================

   WHAT IS useMemo?
   ----------------
   useMemo remembers (caches) the RESULT of a calculation between
   re-renders, and only re-calculates it when its dependencies change.

       const cachedValue = useMemo(() => calculate(a, b), [a, b]);
                                    ^ function that returns a value   ^ dependencies

   THE PROBLEM THIS DEMO SHOWS
   ---------------------------
   Every time state changes, React re-runs the WHOLE component function.
   So `findPrime(text)` would run again on every render, even when the
   render was caused by something unrelated, like the Toggle button.

       Type a number  -> text changes        -> findPrime SHOULD run
       Click Toggle   -> isDarkTheme changes -> findPrime should NOT run

   Without useMemo, clicking Toggle re-runs the slow calculation and the UI feels laggy. 
   With useMemo, React reuses the cached prime.

   HOW IT WORKS (flow)
   -------------------
       Render
         |
         v
       Did anything in [text] change since last render?
         |-- YES --> run findPrime(text), cache and return the new value
         |-- NO  --> skip findPrime, return the cached value

   TRY IT YOURSELF
   ---------------
   1. Make sure findPrime in ../utils/helper is slow for big inputs
      (e.g. enter 10000 or more).
   2. Open the browser console. You will see "findPrime ran" only when
      you type, never when you click Toggle.
   3. Swap the useMemo line with the commented-out `const prime = findPrime(text)`
      line, and click Toggle: now it logs and lags on every click.

   IMPORTANT FACTS TO REMEMBER
   ---------------------------
   1. useMemo is a PERFORMANCE optimization only. Your app must still work correctly without it. 
      React may even discard the cache in some cases.
   2. The function you pass must be PURE: same inputs -> same output, and
      no side effects (no fetching, no setState, no DOM changes).
   3. Dependencies are compared with Object.is (like ===). Objects, arrays and 
      functions created during render are "new" every time, 
      so they would break the cache if put in the dependency array.
   4. In development, React Strict Mode calls your function TWICE to help
      you catch impure code. This is normal. Production runs it once.
   5. Do NOT wrap everything in useMemo. Use it when:
        - the calculation is noticeably slow (measure first), or
        - you pass the result as a prop to a component wrapped in React.memo,
          or use it as a dependency of another hook, and need a stable reference.
   6. Related hooks:
        - useMemo(() => value, deps)    -> caches a VALUE
        - useCallback(fn, deps)         -> caches a FUNCTION
          (useCallback(fn, deps) is the same as useMemo(() => fn, deps))
   ========================================================== */

import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { findPrime } from "../utils/helper";
import "../Style.css"; // plain CSS (converted from Tailwind)

const App = () => {
  // State 1: the number typed in the input.
  // Changing it SHOULD trigger the prime calculation.
  const [text, setText] = useState(0);

  // State 2: light/dark theme.
  // Changing it must NOT trigger the prime calculation.
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // ---------- WITHOUT useMemo ----------
  // Runs on EVERY render, including when you click Toggle.
  // const prime = findPrime(text);

  // ---------- WITH useMemo ----------
  // Runs only when `text` changes. On Toggle, the cached value is reused.
  const prime = useMemo(() => {
    console.log("findPrime ran for n =", text); // proof of when it recalculates
    return findPrime(text);
  }, [text]); // <- dependency array: re-calculate only if `text` changes

  return (
    // Dark class is added only when isDarkTheme is true.
    // (The old version used `isDarkTheme && "..."`, which adds the text
    //  "false" to the class list when false. A ternary avoids that.)
    <div className={`app-card ${isDarkTheme ? "app-card--dark" : ""}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsDarkTheme(!isDarkTheme)}
      >
        Toggle theme
      </button>

      <div>
        <label className="prime-label" htmlFor="prime-input">
          Enter n
        </label>
        <input
          id="prime-input"
          className="prime-input"
          type="number"
          min="0"
          value={text}
          // e.target.value is always a STRING, so convert it to a number.
          onChange={(e) => setText(Number(e.target.value))}
        />
      </div>

      <h1 className="prime-result">nth Prime : {prime}</h1>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);

export default App;