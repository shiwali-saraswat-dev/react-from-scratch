import React from "react";

/**
 * NAMED IMPORT — curly braces required, name must match exactly.
 * RestaurantCard.jsx is inside src/components/
 * constants.js is inside src/utils/
 * So we go UP one level (../) then INTO utils/
 */
import { CURRENCY_SYMBOL } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img className="res-logo" src={resData.imgUrl} alt="res-logo" />
      <h3>{resData.resName}</h3>
      <p>{resData.cuisine}</p>
      <h4>{`${CURRENCY_SYMBOL}${resData.price} for one`}</h4>
      <h4>
        <span>{resData.rating}</span> Stars
      </h4>
      <h4>{resData.time} minutes</h4>
    </div>
  );
};

/**
 * DEFAULT EXPORT — one main thing exported from this file (the component itself).
 * Can be imported anywhere as: import RestaurantCard from "./RestaurantCard";
 * (name can be changed on import, e.g. import Card from "./RestaurantCard"; would also work)
 */
export default RestaurantCard;