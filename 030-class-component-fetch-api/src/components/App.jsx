import React from "react";
import ReactDOM from "react-dom/client";
import UserClass from "./UserClass";

const App = () => (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h1>My GitHub Profile</h1>
        <UserClass username="your-github-username" />
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);