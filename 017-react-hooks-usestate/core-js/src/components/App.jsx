import React from "react";
import ReactDOM from "react-dom/client";
import "../Style.css";
import { ZMT_CDN } from "../utils/constants.js";
import RestaurantCard from "./RestaurantCard";

const App = () => {
  // ─── Normal JS variable (NOT React state) ───
  // This is just a regular array — React has no idea it exists as "data to track."
  // Reassigning or filtering it later will NOT cause the component to re-render.
  // let restaurantsList = []; // default value - empty array

  let restaurantsList = [
    { 
      id: 1, 
      imgUrl: ZMT_CDN + "de6/c6aadd2748a1f2e327de84ad8128cde6.jpg", 
      resName: "Sagar", 
      cuisine: "Dum Biryani", 
      price: 250, 
      rating: 4.1, 
      time: 45 
    },
    { id: 2, 
      imgUrl: ZMT_CDN + "7d3/fe0c1dcddc2af5fd75c0f336e5e147d3.png", 
      resName: "Nirula's", 
      cuisine: "Dum Biryani", 
      price: 200, 
      rating: 4.7, 
      time: 30 
    },
    { id: 3, imgUrl: ZMT_CDN + "1cc/85790cc3b541fb571f4f9fd5990ce1cc.jpeg", resName: "Bistro 57", cuisine: "Dum Biryani", price: 200, rating: 4.4, time: 28 },
    { id: 4, imgUrl: ZMT_CDN + "fdb/14698f38430947bd0f57ad652ffe8fdb.jpg", resName: "Castle Cakes", cuisine: "Dum Biryani", price: 350, rating: 3.9, time: 40 },
    { id: 5, 
      imgUrl: ZMT_CDN + "e7b/54c165d877cc6ed144d764a8e50f7e7b.jpg", 
      resName: "Chill N Grill", 
      cuisine: "Dum Biryani", 
      price: 299, 
      rating: 4.9, 
      time: 25 
    },
  ];

  return (
    <div className="app">
      <h1>My App</h1>

      <div className="filter">
        {/*
          ─── Plain JS filtering — proof of the problem ───
          .filter() runs correctly and produces the right result (you can see
          it in the console), but since "restaurantsList" is just a normal
          variable and not React state, nothing on screen updates. React only
          re-renders when STATE changes — this button changes a local
          variable, which React never watches.
        */}
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurantsList.filter((res) => {
              return res.rating >= 4.5; 
            });
            // Logs the correct filtered data
            console.log("filteredList: ", filteredList);
            // but the res-container below still renders the FULL list,
            // because "restaurantsList" itself was never updated, and even
            // if it were, plain variable reassignment doesn't trigger a re-render.
          }}
        >
          Top Rated Restaurants (4.5+ stars)
        </button>
      </div>

      <div className="res-container">
        <h1>Food Delivery Restaurants in Delhi NCR</h1>
        {/* Always renders the ORIGINAL, unfiltered list — confirms the button click had no visible effect */}
        {restaurantsList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);