import { useState } from "react";
import ReactDOM from "react-dom/client";
import UncontrolledPanel from "./components/UncontrolledPanel";
import ControlledPanel from "./components/ControlledPanel";
import UncontrolledSearch from "./components/UncontrolledSearch";
import ControlledSearch from "./components/ControlledSearch";

const FAQS = [
    { id: 1, title: "Delivery time?", text: "Usually 25-45 minutes." },
    { id: 2, title: "Payment options?", text: "UPI, cards and cash." },
    { id: 3, title: "Refund policy?", text: "Refund within 3-5 days." },
];
const RESTAURANTS = ["Sagar", "Nirula's", "Bistro 57", "Castle Cakes", "Chill N Grill"];

const App = () => {
    // The PARENT owns which panel is open (only one id, or null for none).
    // This is "lifting state up": the value lives where everyone who needs it can reach it.
    const [openId, setOpenId] = useState(null);

    // Clicking the open panel closes it; clicking another switches to it (accordion)
    const toggle = (id) => setOpenId((current) => (current === id ? null : id));

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 520 }}>
            <h2>1. Uncontrolled panels</h2>
            <p>Each panel decides for itself. Several can stay open. The parent has no say.</p>
            {FAQS.map((f) => (
                <UncontrolledPanel key={f.id} title={f.title}>{f.text}</UncontrolledPanel>
            ))}

            <h2>2. Controlled panels (accordion)</h2>
            <p>The parent decides: only one open at a time, and outside buttons can drive it.</p>
            <button onClick={() => setOpenId(FAQS[0].id)}>Open first</button>{" "}
            <button onClick={() => setOpenId(null)}>Close all</button>
            {FAQS.map((f) => (
                <ControlledPanel
                    key={f.id}
                    title={f.title}
                    isOpen={openId === f.id}      // data DOWN
                    onToggle={() => toggle(f.id)} // event UP
                >
                    {f.text}
                </ControlledPanel>
            ))}

            <h2>3. Uncontrolled search</h2>
            <UncontrolledSearch list={RESTAURANTS} />

            <h2>4. Controlled search</h2>
            <ControlledSearch list={RESTAURANTS} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);