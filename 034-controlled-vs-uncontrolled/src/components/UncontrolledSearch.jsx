import { useRef, useState } from "react";

// UNCONTROLLED input: the browser DOM holds the typed text, React does not.
const UncontrolledSearch = ({ list }) => {
    console.log("UncontrolledSearch render");   // typing does NOT log this: no re-render per key

    // useRef = a handle to the real DOM <input>. ref.current IS the input element.
    const inputRef = useRef(null);

    // This state holds the SEARCHED word (set on click), not the text being typed.
    const [query, setQuery] = useState("");

    // Read the DOM value only at the moment we need it
    const handleSearch = () => setQuery(inputRef.current.value);

    // To clear we must edit the DOM directly (imperative style)
    const handleClear = () => {
        inputRef.current.value = "";
        setQuery("");
    };

    const results = list.filter((n) => n.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            {/* defaultValue = starting text only. NOT value: React does not control it. */}
            <input
                ref={inputRef}
                defaultValue=""
                placeholder="Type, then press Enter or click Search"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />{" "}
            <button onClick={handleSearch}>Search</button>{" "}
            <button onClick={handleClear}>Clear</button>

            <ul>
                {results.length === 0 ? <li>No match</li> : results.map((n) => <li key={n}>{n}</li>)}
            </ul>
        </div>
    );
};

export default UncontrolledSearch;