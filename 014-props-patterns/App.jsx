import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Three ways to receive and access props in a functional component.
 * All three achieve the exact same result — just different styles.
 */

// -----------------------------------------------------------
// PATTERN 1: Receive props as one whole object, access fields via props.x
// Useful when you want to inspect/log the entire props object at once,
// or pass it down unchanged to another function/component.
// -----------------------------------------------------------
const StudentCard = (props) => {
  console.log("StudentCard props:", props);
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>Grade: {props.grade}</p>
    </div>
  );
};

// -----------------------------------------------------------
// PATTERN 2: Receive props as one object, then destructure it
// into named variables on the first line of the function body.
// Keeps "props" available too, if needed elsewhere in the function.
// -----------------------------------------------------------
const TeacherCard = (props) => {
  const { name, subject } = props;
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Teaches: {subject}</p>
    </div>
  );
};

// -----------------------------------------------------------
// PATTERN 3: Destructure props directly in the function's parameter list.
// Cleanest option once you know exactly which props a component needs —
// no "props." prefix, no separate destructuring line.
// -----------------------------------------------------------
const CourseCard = ({ title, duration }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Duration: {duration} weeks</p>
    </div>
  );
};

/**
 * THE PROPS CHILDREN PATTERN
 *
 * Whatever you nest between a component's opening and closing tags
 * arrives inside that component as a special prop called `children`.
 *
 *   <Card> ...this content... </Card>
 *           ^^^^^^^^^^^^^^^^^
 *           becomes props.children
 *
 * Think of `{children}` as a "hole" or slot: the component owns the
 * outer layout, the parent decides what fills the hole.
 */

// -----------------------------------------------------------
// CHILDREN EXAMPLE 1: The simplest wrapper.
// Card only provides the outer box. It has no idea what goes inside.
// -----------------------------------------------------------
const Card = ({ children }) => {
  return (
    <div className="card" style={{ margin: "10px", padding: "6px", border: "2px solid #fc191d" }}>
      {children}
    </div>
  );
};

// -----------------------------------------------------------
// CHILDREN EXAMPLE 2: `children` mixed with regular props.
// `title` is a normal prop (passed as an attribute),
// `children` is whatever is nested between the tags.
// -----------------------------------------------------------
const Panel = ({ title, children }) => {
  return (
    <section className="card" style={{ margin: "10px", padding: "6px", border: "2px solid #fc199d" }}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

// -----------------------------------------------------------
// CHILDREN EXAMPLE 3: children can be plain text.
// A reusable Button where the label is passed as children,
// so it reads just like a normal HTML <button>Label</button>.
// -----------------------------------------------------------
const Button = ({ children }) => {
  return <button type="button" style={{ margin: "12px", padding: "8px", border: "2px solid #8e19fc" }}>{children}</button>;
};

// -----------------------------------------------------------
// CHILDREN EXAMPLE 4: children can be other components.
// Here the nested content is the components we built above.
// Layout wraps a whole page section in the same structure.
// -----------------------------------------------------------
const Section = ({ heading, children }) => {
  return (
    <div className="section" style={{ margin: "12px", padding: "8px", border: "2px solid #19bcfc" }}>
      <h2>{heading}</h2>
      {children}
    </div>
  );
};

// -----------------------------------------------------------
// CHILDREN EXAMPLE 5: the wrapper can add behaviour, not just layout.
// Collapsible decides WHEN to show its children (using a simple
// boolean prop `open`). The parent still decides WHAT they are.
// Note: `open` is read-only here. Changing it later needs state.
// -----------------------------------------------------------
const Collapsible = ({ label, open = false, children }) => {
  return (
    <div className="card" style={{ margin: "14px", padding: "10px", border: "2px solid #19fc59" }}>
      <strong>{label}</strong>
      {open && <div>{children}</div>}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <h1>Props Patterns Demo</h1>

      {/* Pattern 1 in action */}
      <StudentCard name="Aarav Sharma" grade="10th" />

      {/* Pattern 2 in action */}
      <TeacherCard name="Mrs. Kapoor" subject="Mathematics" />

      {/* Pattern 3 in action */}
      <CourseCard title="Intro to React" duration={6} />

      <hr />
      <h1>Props Children Pattern Demo</h1>

      {/* Children Example 1: plain wrapper with mixed HTML inside */}
      <Card>
        <h3>Welcome</h3>
        <p>This content is the `children` of Card.</p>
      </Card>

      {/* Children Example 2: normal prop (title) + children together */}
      <Panel title="About Me">
        <p>I am learning React.</p>
        <p>Next topic: State.</p>
      </Panel>

      {/* Children Example 3: text as children */}
      <Button>Enroll Now</Button>
      <Button>Download Syllabus</Button>

      {/* Children Example 4: components nested inside a wrapper component */}
      <Section heading="Our School">
        <StudentCard name="Diya Verma" grade="9th" />
        <TeacherCard name="Mr. Iyer" subject="Science" />
        <CourseCard title="Web Basics" duration={4} />
      </Section>

      {/* Children Example 5: wrapper controls visibility, parent controls content */}
      <Collapsible label="Shown (open = true)" open={true}>
        <p>You can see this because open is true.</p>
      </Collapsible>
      <Collapsible label="Hidden (open = false)">
        <p>You cannot see this because open defaults to false.</p>
      </Collapsible>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);