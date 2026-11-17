import React from "react";
import ReactDOM from "react-dom/client";
import {useState} from "react"; // named import — useState is a named export from "react"
import "../Style.css";
import restaurantsList from "../utils/mockData.js";
import RestaurantCard from "./RestaurantCard";

const App = () => {
  // ─── Different starting values you could pass to useState ───
  // const [restsList] = useState();                                 // undefined by default
  // const [restsList] = useState([]);                               // empty array as default
  // const [restsList] = useState(null);                             // null as default
  // const [restsList] = useState([{ id: 1, resName: "Sagar" }]);    // one hardcoded restaurant
  // const [restsList] = useState(restaurantsList);                  // full mock data (what we actually use)

  // ─── Never modify state directly ───
  // const [restsList, setRestsList] = useState(restaurantsList);
  // restsList = [];        // ❌ INVALID — restsList is not a normal variable, can't reassign it
  // setRestsList([]);      // ✅ VALID — always update state through its setter function

  // ─── Naming convention (industry standard) ───
  // If the state variable is "restsList", its setter MUST be named "setRestsList"
  // (i.e. "set" + exact same name). This isn't enforced by React, but every
  // React codebase follows it — breaking the pattern makes code harder to read.

  // ─── What state actually does ───
  // State keeps the UI layer in sync with the data layer, continuously.
  // Whenever a state variable updates (via its setter), React automatically
  // re-renders the component to reflect the new value — no manual DOM updates needed.

  // ─── How useState() works under the hood — three equivalent ways to write this ───
  // Step 1: useState returns an array with exactly 2 items — [currentValue, setterFunction]
  //   const arr = useState(restaurantsList);
  //   arr[0] → current state value   |   arr[1] → the setter function

  // Step 2: Pulling both values out manually (destructuring "by hand")
  //   const restsList = arr[0];
  //   const setRestsList = arr[1];

  // Step 3: Array destructuring — the actual syntax we write (does Step 1 + 2 in one line)
  const [restsList, setRestsList] = useState(restaurantsList);

  const resetFilter = () => {
    setRestsList(restaurantsList);
  };

  return (
    <div className="app">
      <h1>My App</h1>
      
      <div className="filter">
        {/*
          ─── OPTION 1: Inline logic directly inside onClick ───
          The entire filter logic is written right inside the arrow function
          passed to onClick. No separate named function is declared.

          Pros: quick, no extra function needed for simple one-off logic
          Cons: gets messy/hard to read if the logic grows longer,
                and can't be reused elsewhere without copy-pasting
        */}
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurantsList.filter((res) => {
              return res.rating >= 4.5; 
            });
            setRestsList(filteredList); // updates state → triggers re-render
          }}
        >
          Top Rated Restaurants (4+ stars)
        </button>
        {/*
          ─── OPTION 2: Logic extracted into a separate named function ───
          Here, "resetFilter" is a function defined OUTSIDE the JSX (elsewhere
          in the component), and onClick simply references it by name.

          Pros: cleaner JSX, reusable (can call resetFilter from multiple
                places), easier to read and test
          Cons: slightly more setup — needs a named function declared beforehand
        */}
        <button className="filter-btn" onClick={resetFilter}>Reset</button>
      </div>

      <div className="res-container">
        <h1>Food Delivery Restaurants in Delhi NCR</h1>
        {restsList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);