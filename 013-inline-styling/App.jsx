import React from "react";
import ReactDOM from "react-dom/client";

// Option 1: Named style object (defined outside the component) — 
// Use when the style is reused across renders/components, or complex enough to name separately.
const cardStyle = {
  backgroundColor: "#e80f69",
  border: "2px solid #000000",
  borderRadius: "8px",
  padding: "16px",
  width: "220px",
};

const Heading = () => {
  // Option 2: Inline object literal written directly in JSX — 
  // Use for small, one-off styles that aren't reused anywhere else.
  return <h3 style={{ color: "#2d9f98" }}>Inline Styled Card</h3>;
};

const App = () => {
  return (
    // Root element — applies the cardStyle object via the style prop (Option 1 in action)
    <div style={cardStyle}>
      {/* Rendering the Heading Component (uses Option 2 internally) */}
      <Heading />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);