import React from "react";

// Child component (a "presentational" component).
// It owns no state. It only receives data and a function from its parent via props:
//   - count:       the current value to display (data flows DOWN)
//   - onIncrement: a function to call when the button is clicked (events flow UP)
function Child({ count, onIncrement }) {
    return (
        <div>
            {/* Shows the value received from the parent */}
            <p>Child Count: {count}</p>

            {/* On click, calls the parent's function, which updates the parent's state.
                Pass the function itself (onIncrement), don't call it (onIncrement()) */}
            <button onClick={onIncrement}>Increment</button>
        </div>
        );
    }

export default Child;