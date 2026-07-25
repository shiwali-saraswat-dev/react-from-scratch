import React from "react";
import ReactDOM from "react-dom/client";
import "../Style.css"; // Import component-specific styles for the Header component

/**
 * ─── DEFAULT IMPORT ───
 * Used when a file has ONE main export (export default ...).
 * Rules:
 *   - NO curly braces
 *   - You can name it ANYTHING you want on import (doesn't have to match)
 *   - Only ONE default export is allowed per file
 *
 * mockData.js lives in src/utils/, and App.jsx lives in src/components/
 * so we go UP one level (../) then INTO utils/
 */
import restaurantsList from "../utils/mockData";

// RestaurantCard.jsx is a DEFAULT export, and it's in the SAME folder (components/)
// so we just use "./" (no need to go up or into another folder)
import RestaurantCard from "./RestaurantCard";

/**
 * ─── NAMED IMPORT ───
 * Used when a file exports MULTIPLE values (export const ..., export const ...).
 * Rules:
 *   - MUST use curly braces { }
 *   - The name(s) inside { } MUST match EXACTLY what was exported
 *   - You CAN import multiple named exports at once, separated by commas
 *
 * Option 1: import only what you need (recommended — keeps code clean)
 *   import { APP_TITLE, MIN_RATING_FOR_TOP } from "../utils/constants";
 *
 * Option 2: import everything as one object using `* as`
 *   import * as Constants from "../utils/constants";
 *   // then use it like: Constants.APP_TITLE, Constants.MIN_RATING_FOR_TOP
 *
 * We're using Option 1 below:
 */
import { APP_TITLE, MIN_RATING_FOR_TOP } from "../utils/constants";

const App = () => {
  return (
    <div className="app">
      <h1>{APP_TITLE}</h1>

      <div className="res-container">
        {restaurantsList.map((resData) => (
          <RestaurantCard key={resData.id} resData={resData} />
        ))}
      </div>
    </div>
  );
};

// NOTE: ReactDOM.createRoot + root.render should ideally live in a
// separate main.jsx entry file, not inside App.jsx itself.
// Keeping it here for now since no main.jsx exists in your current structure.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);