// components/RestaurantCard.jsx

import { ZMT_CDN, CURRENCY_SYMBOL } from "../utils/constants.js";

// Placeholder image, used in two situations:
//   1. the restaurant has no `img` field at all
//   2. the image URL exists but fails to load (broken link, network error)
const FALLBACK_IMG = "https://placehold.co/660x440?text=No+Image";

/*
 * RestaurantCard (base component)
 * -------------------------------
 * A plain presentational component. It only displays data and has no
 * logic about promotions, discounts or delivery status. That is handled
 * by the HOCs that wrap it.
 *
 * Expected props: { restData: { img, resName, cuisines, price, avgRating, deliveryTime, ... } }
 */
const RestaurantCard = (props) => {
    // The prop name must match what the parent passes in App.jsx:
    // <RestaurantCard restData={restaurant} />
    const { restData } = props;

    // Destructure only the fields this card displays.
    // Names come from MockData.js (resName, price, ...), not the Swiggy API names.
    // `cuisines = []` is a default value, so .join() below never crashes
    // if the field is missing.
    const { img, resName, cuisines = [], price, avgRating, deliveryTime } = restData;

    // Fields used by the HOCs (not by this component):
    //   is_delivering -> withDeliveryStatus
    //   isPromoted    -> checked in App.jsx to choose the promoted stack
    //   discount      -> withDiscountBadge

    // Build the full image URL only if `img` exists,
    // so we never request ".../undefined" from the CDN.
    const imgUrl = img ? ZMT_CDN + img : FALLBACK_IMG;

    return (
        // "res-card" is the card container. HOC wrappers sit outside this div.
        <div className="res-card">
            <img
                className="res-logo"
                src={imgUrl}
                alt={resName}       // alt text describes the image (the restaurant), not the URL
                loading="lazy"      // browser loads the image only when it is near the viewport
                onError={(e) => {
                    // Runs if the image fails to load. Swap in the placeholder.
                    // (If the placeholder itself failed, this would loop; it is unlikely
                    // here, but `e.currentTarget.onerror = null` would guard against it.)
                    e.currentTarget.src = FALLBACK_IMG;
                }}
            />

            {/* Restaurant name */}
            <h3>{resName}</h3>

            {/* Array -> "Pizza, Italian, Fast Food" */}
            <p>{cuisines.join(", ")}</p>

            {/* e.g. "₹250 for two" (currency symbol comes from constants.js) */}
            <h4>{`${CURRENCY_SYMBOL}${price} for two`}</h4>

            {/* Rating, e.g. "⭐ 4.1" */}
            <h4><span>{`⭐ ${avgRating}`}</span></h4>

            {/* e.g. "45 minutes" */}
            <h4>{`${deliveryTime} minutes`}</h4>
        </div>
    );
};

/*
 * Higher Order Component (HOC): withPromotedLabel
 * -----------------------------------------------
 * Takes a component and returns a NEW component that adds a "Promoted"
 * badge on top of it. The original component is not modified.
 *
 * Input  : RestaurantCard (or an already-enhanced card, e.g. withDiscountBadge(RestaurantCard))
 * Output : a new component that always shows the "Promoted" badge.
 *
 * NOTE: unlike withDiscountBadge and withDeliveryStatus, this HOC has no
 * internal `if`. It ALWAYS adds the badge. The decision "is this restaurant
 * promoted?" is made by the parent (App.jsx), which chooses whether to
 * render the promoted version or the plain one.
 */
export const withPromotedLabel = (Restaurantcard) => {
    // Returns a new component (a function that receives props).
    return (props) => {
        return (
            // "promoted-wrapper" -> position: relative (and inline-block), so the
            //                       absolutely positioned badge is placed against
            //                       the card instead of the whole page.
            <div className="promoted-wrapper">
                {/* The badge. CSS (position: absolute; top: 14px; left: 0)
                    places it as a ribbon on the top-left of the card image. */}
                <span className="promoted-badge">Promoted</span>

                {/* The original card, unchanged. {...props} forwards every prop
                    (restData, etc.) so the wrapped card works as before. */}
                <Restaurantcard {...props} />
            </div>
        );
    };
};

// Default export is the base card; the HOC above is a named export.
// Import them like this:
//   import RestaurantCard, { withPromotedLabel } from "./components/RestaurantCard";
export default RestaurantCard;