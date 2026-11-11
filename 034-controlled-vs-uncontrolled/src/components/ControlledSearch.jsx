import { useState } from "react";

// CONTROLLED input: React state is the single source of truth.
const ControlledSearch = ({ list }) => {
    console.log("ControlledSearch render");   // logs on EVERY keystroke: each key changes state

    // Must start as "" (a string). Starting as undefined/null makes React treat it
    // as uncontrolled at first, then warn when it becomes controlled.
    const [text, setText] = useState("");

    // Derived data: computed during render, so there is no second state to keep in sync
    const results = list.filter((n) => n.toLowerCase().includes(text.toLowerCase()));

    return (
        <div>
            {/* value + onChange = controlled. The input shows exactly what state says. */}
            <input
                value={text}
                // We can change or reject what the user typed before it is stored.
                // Here: limit to 15 characters.
                onChange={(e) => setText(e.target.value.slice(0, 15))}
                placeholder="Type to filter instantly"
            />{" "}
            <button onClick={() => setText("")}>Clear</button>   {/* clearing = just set state */}
            <p>{text.length}/15 characters</p>                    {/* live feedback, free with state */}

            <ul>
                {results.length === 0 ? <li>No match</li> : results.map((n) => <li key={n}>{n}</li>)}
            </ul>
        </div>
    );
};

export default ControlledSearch;