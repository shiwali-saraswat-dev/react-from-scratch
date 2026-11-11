import { useState } from "react";

// UNCONTROLLED component: the panel owns its open/closed state.
// The parent cannot read it or change it later. It can only suggest a starting
// value with `defaultOpen`, the same idea as `defaultValue` on an input.
const UncontrolledPanel = ({ title, children, defaultOpen = false }) => {
    // defaultOpen is used ONCE, on the first render. If the parent changes it
    // later, nothing happens (the state already exists).
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div style={{ border: "1px solid #ddd", margin: "6px 0", padding: 8 }}>
            <button onClick={() => setIsOpen((prev) => !prev)}>
                {title} {isOpen ? "-" : "+"}
            </button>
            {isOpen && <p>{children}</p>}
        </div>
    );
};

export default UncontrolledPanel;