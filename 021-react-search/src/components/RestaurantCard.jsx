import React from "react";
import { CLOUD_IMG_URL } from "../utils/constants.js";

// cloudinaryImageId

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img className="res-logo" src={`${CLOUD_IMG_URL}${resData.cloudinaryImageId}`} alt="res-logo" />
      <h3>{resData.name}</h3>
      <p>{resData.cuisines.join(", ")}</p>
      <h4>{resData.costForTwo}</h4>
      <h4>
        <span>{`⭐ ${resData.avgRating}`}</span>
      </h4>
      <h4>{`${resData.sla.deliveryTime} minutes`}</h4>
    </div>
  );
};

export default RestaurantCard;