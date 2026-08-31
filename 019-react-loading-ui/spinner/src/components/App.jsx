import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../Style.css";
import RestaurantCard from "./RestaurantCard";
import { APP_TITLE, MIN_RATING_FOR_TOP } from "../utils/constants";

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

  // Conditional Rendering 
  if (restsList.length === 0) {
    return <h1>loading. . .</h1>; // or Spinner here...
  }

  return (
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