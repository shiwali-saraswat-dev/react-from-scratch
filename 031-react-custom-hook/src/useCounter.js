// useState is a built-in hook. A custom hook is built FROM other hooks.
import { useState } from "react";

/*
 * CUSTOM HOOK = a normal JavaScript function that:
 *   1. has a name starting with "use"  (rule, explained below)
 *   2. calls other hooks inside it (here: useState)
 *   3. returns whatever the component needs (values and functions)
 *
 * Purpose: put reusable STATE LOGIC in one place, so many components
 * can use it without copy-pasting.
 *
 * PHP comparison: like a helper class / trait, but it also holds
 * data that re-draws the screen when it changes.
 *
 * `initialValue = 0` is a default parameter: if the caller passes nothing,
 * the counter starts at 0 (same as PHP: function useCounter($initialValue = 0)).
 */
const useCounter = (initialValue = 0) => {

    // State lives INSIDE the hook. Every component that calls useCounter()
    // gets its OWN separate copy of this state (hooks share logic, not data).
    const [count, setCount] = useState(initialValue);

    // (c) => c + 1 is the functional update: React gives the latest value as `c`,
    // so fast repeated clicks never read an old value.
    const increment = () => setCount((c) => c + 1);
    const decrement = () => setCount((c) => c - 1);

    // Go back to whatever the counter started with
    const reset = () => setCount(initialValue);

    // Return an object so the component can pick values by name:
    // const { count, increment } = useCounter();
    // (State is private inside the hook; the component can only use what is returned.)
    return { count, increment, decrement, reset };
};

// Default export, so other files can write: import useCounter from "./useCounter"
export default useCounter;