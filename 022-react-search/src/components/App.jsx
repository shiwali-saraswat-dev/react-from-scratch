import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import "../Style.css";
import RestaurantCard from "./RestaurantCard";

const App = () => {
  // Immutable — the full list exactly as fetched. 
  // Never mutated after fetch.
  // This is what "Reset" restores everything back to.
  const [allRestaurants, setAllRestaurants] = useState([]);

  // The "working" list — original data with the rating filter applied (or not).
  // Search is always performed against THIS, not against allRestaurants,
  // so search stacks on top of an active rating filter.
  const [restaurantsList, setRestaurantsList] = useState([]);

  // What's actually rendered — restaurantsList further narrowed by search text.
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const restaurantCard = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    const resData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    // Seed all three states with the same fresh data.
    setAllRestaurants(resData);
    setRestaurantsList(resData);
    setFilteredRestaurants(resData);
  };

  // Applies the rating filter on top of the ORIGINAL data (not on top of
  // whatever restaurantsList currently is), so clicking it twice in a row
  // stays correct instead of compounding.
  const applyRatingFilter = () => {
    const ratingFiltered = allRestaurants.filter((res) => res.info.avgRating >= 4.5);
    setRestaurantsList(ratingFiltered);

    // Re-apply current search text on top of the new base, so an existing
    // search doesn't silently vanish when the rating filter is toggled.
    const combined = searchText
      ? ratingFiltered.filter((rest) =>
          rest.info.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : ratingFiltered;
    setFilteredRestaurants(combined);
  };

  // Searches within restaurantsList (the rating-filtered base), so search
  // respects whatever filter is currently active — not the full original list.
  const handleSearch = () => {
    const searched = restaurantsList.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(searched);
  };

  // Full reset: clears search text and restores BOTH the working base and
  // the displayed list back to the original, untouched data.
  const resetFilter = () => {
    setSearchText("");
    setRestaurantsList(allRestaurants);
    setFilteredRestaurants(allRestaurants);
  };

  return (
    <div className="app">
      <h1>My App</h1>

      <div className="filter">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <button className="filter-btn" onClick={applyRatingFilter}>
          Top Rated Restaurants (4.5+ stars)
        </button>
        <button className="filter-btn" onClick={resetFilter}>
          Reset
        </button>
      </div>

      <div className="res-container">
        <h1>Food Delivery Restaurants in Delhi NCR</h1>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);