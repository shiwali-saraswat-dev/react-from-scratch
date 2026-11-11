// CONTROLLED component: no state inside. It is "dumb": it shows what the parent
// says (isOpen) and reports clicks back (onToggle). The parent decides what happens.
// Data goes down as props, events go up as callbacks.
const ControlledPanel = ({ title, children, isOpen, onToggle }) => (
    <div style={{ border: "1px solid #ddd", margin: "6px 0", padding: 8 }}>
        <button onClick={onToggle}>
            {title} {isOpen ? "-" : "+"}
        </button>
        {isOpen && <p>{children}</p>}
    </div>
);

export default ControlledPanel;