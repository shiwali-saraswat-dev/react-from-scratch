import React from "react";
import ReactDOM from "react-dom/client";
import "./Style.css";
import restaurantsList from "./utils/MockData.js";
import RestaurantCard, { withPromotedLabel } from "./components/RestaurantCard";
import withDiscountBadge from "./components/withDiscountBadge";
import withDeliveryStatus from "./components/withDeliveryStatus";
import { APP_TITLE } from "./utils/constants";

/*
 * Both enhanced cards are created ONCE, outside the component.
 * (Creating them inside App would make a new component type on every render.)
 */

// Listing 1: only the Promoted badge
const PromotedOnlyCard = withPromotedLabel(RestaurantCard);

// Listing 2: two stacks, because withPromotedLabel has no internal condition.
// Read from the inside out:
// card -> + discount badge (only if discount > 0) -> + delivery overlay (only if not delivering)
const FullPlainCard = withDeliveryStatus(withDiscountBadge(RestaurantCard));

// card -> + discount badge -> + promoted label -> + delivery overlay
const FullPromotedCard = withDeliveryStatus(
    withPromotedLabel(withDiscountBadge(RestaurantCard))
);

const App = () => {

    const restsList = restaurantsList;
    // console.log("restsList: ", restsList);

    return (
        <div className="app">
            <h1>{APP_TITLE}</h1>

            {/* ---------- Listing 1: simple (promoted badge only) ---------- */}
            <h2 className="listing-title">Simple listing (Promoted badge only)</h2>
            <div className="res-container">
                {restaurantsList.map((restaurant) => (
                    // If the Restaurant is promoted, then add label promoted to it 
                    restaurant.isPromoted ? 
                        (<PromotedOnlyCard key={restaurant.id} restData={restaurant} />) 
                        : (<RestaurantCard key={restaurant.id} restData={restaurant} />) 
                ))}
            </div>

            {/* ---------- Listing 2: all badges and features ---------- */}
            <h2 className="listing-title">Full listing (Promoted + Discount + Delivery status)</h2>
            <div className="res-container">
                {restaurantsList.map((restaurant) => {
                    // Promoted check lives here because withPromotedLabel is unconditional
                    const Card = restaurant.isPromoted ? FullPromotedCard : FullPlainCard;
                    return <Card key={restaurant.id} restData={restaurant} />;
                })}
            </div>

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);