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
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);