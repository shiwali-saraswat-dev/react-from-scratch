import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../Style.css";
import RestaurantCard from "./RestaurantCard";
import { APP_TITLE } from "../utils/constants";

const App = () => {
  const [restsList, setRestsList] = useState([]);

  // ─── Different dependency arrays you could pass to useEffect ───

  // Case 1: NO dependency array at all
  // useEffect(() => { fetchData(); }); Runs after EVERY render — initial render AND every re-render.
  // Dangerous here: fetchData() calls setRestsList(), which triggers a re-render, which runs the effect again, which fetches again... ♾️
  // (infinite loop of network calls — never do this with a state setter inside an effect that has no array)

  // Case 2: EMPTY dependency array — [] (what we actually use below)
  // useEffect(() => { fetchData(); }, []);
  // Runs exactly ONCE, right after the very first render (component "mount"). 
  // Perfect for a one-time "load initial data" call like this API fetch — nothing external needs to re-trigger it.

  // Case 3: Dependency array WITH values — [someState]
  // useEffect(() => { fetchData(); }, [searchText]);
  // Runs once on mount, AND again every time `searchText` changes.
  // Useful if this component had a search box and needed to re-fetch (or re-filter) the list whenever the user typed something new.

  // Case 4: Dependency array watching a state THIS component itself sets
  // useEffect(() => {
  //   console.log("list length changed:", restsList.length);
  // }, [restsList]);
  // Runs once on mount, then again every time restsList updates.
  // Common for side effects that should react to data changes — e.g. logging, updating document.title, syncing to localStorage.

  // ─── Why the effect callback itself is never written as `async` ───
  // useEffect(async () => { ... }, []);   // ❌ INVALID
  // React expects the function passed to useEffect to return either nothing, or a cleanup function. 
  // An `async` function ALWAYS returns a Promise — React can't treat a Promise as a cleanup function, so React throws a warning. 
  // That's exactly why fetchData is declared as its own separate async function below, and simply CALLED (not returned) from inside a plain synchronous effect callback.

  // ─── What useEffect actually does, under the hood ───
  // React renders the JSX and paints it to the screen FIRST — only AFTER that paint does it run the function passed to useEffect.
  // That's the whole point of "effect": it's for side effects that should happen once the UI already exists — fetching data,
  // subscriptions, timers, manually touching the DOM — rather than work that belongs in the render calculation itself.

  useEffect(() => {
    fetchData();

    // ─── Cleanup function (not needed here, shown for reference) ───
    // If this effect had subscribed to something ongoing — an interval, a window event listener, a websocket — you'd return a cleanup fn:
    //
    // const timer = setInterval(() => console.log("tick"), 1000);
    // return () => clearInterval(timer);
    //
    // React runs this cleanup right before the effect re-runs (Case 3/4 above), and again when the component unmounts. 
    // Since our array is [], this effect never re-runs and there's nothing to tear down — so no cleanup is returned.
  }, []);

  // ─── Multiple useEffects, split by concern (not needed here) ───
  // A component can have as many useEffects as it wants — each one watching its own thing. 
  // E.g. one for fetching data, a separate one for updating document.title, another for a subscription. 
  // React runs them in the order they're written. 
  // We only have one concern (load the list once), so one effect is enough — no need to split it.

  //  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Find the one card that actually holds a restaurant grid, wherever it happens to sit in the array this time
    const restaurantCard = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    const resData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    console.log('resData : ', resData);

    setRestsList(resData);
  };

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