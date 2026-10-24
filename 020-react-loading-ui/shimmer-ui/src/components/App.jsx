import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../Style.css";
import RestaurantCard from "./RestaurantCard";
import { APP_TITLE, MIN_RATING_FOR_TOP } from "../utils/constants";
import Shimmer from "./Shimmer";

const App = () => {
  const [restsList, setRestsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  //  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    
    const json = await data.json();

    // Find the one card that actually holds a restaurant grid,
    // wherever it happens to sit in the array this time
    const restaurantCard = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    const resData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    console.log('resData : ', resData);

    setRestsList(resData);
  };

  /**
   * CONDITIONAL RENDERING
   * ----------------------
   * "Conditional rendering" means showing different UI depending on some
   * condition/state — here, whether data has arrived yet or not.
   * React doesn't have special syntax for this — you just use normal
   * JavaScript conditionals (if/else, ternary, &&) inside your component.
   */

  /**
   * -----------------------------------------------------------
   * METHOD 1: Early return using a plain "if" statement
   * -----------------------------------------------------------
   * While restsList is still empty (API hasn't responded yet), the
   * component RETURNS EARLY with just a loading message — the rest
   * of the component's JSX below never even runs during this state.
   * Simple and very readable for a single, clear-cut loading condition.
  */

  // if (restsList.length === 0) {
  //   return <h1>loading. . .</h1>; // or a <Spinner /> component here
  // }

  // return (
  //   <div className="app">
  //     <h1>{APP_TITLE}</h1>
  //     <div className="res-container">
  //       {restsList.map((resData) => (
  //         <RestaurantCard key={resData.info.id} resData={resData.info} />
  //       ))}
  //     </div>
  //   </div>
  // );


  // -----------------------------------------------------------
  // METHOD 2 (commented out — alternative to Method 1 above):
  // Ternary operator, used directly INSIDE the returned JSX,
  // combined with a SHIMMER UI instead of a plain text message.
  // -----------------------------------------------------------
  /**
   * SHIMMER UI
   * ----------
   * A "shimmer" (a.k.a. skeleton screen) is a placeholder UI that mimics
   * the SHAPE of the real content (grey boxes roughly matching where
   * cards/images/text will eventually appear) — shown WHILE data is
   * still loading, instead of a blank screen or a plain "Loading..." text.
   * It gives users a sense that content is coming and roughly what
   * layout to expect, which feels faster/smoother than a blank page.
   */
  return restsList.length === 0 ? (
    // Ternary: condition ? <ifTrueJSX /> : <ifFalseJSX />
    // While restsList is empty → render Shimmer placeholder cards
    <Shimmer />
  ) : (
    // Once data has arrived → render the actual restaurant list
    <div className="app">
      <h1>{APP_TITLE}</h1>
      <div className="res-container">
        {restsList.map((resData) => (
          <RestaurantCard key={resData.info.id} resData={resData.info} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);