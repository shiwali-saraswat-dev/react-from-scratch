// components/withDiscountBadge.jsx

/*
 * Higher Order Component (HOC)
 * ----------------------------
 * Takes a component and returns a NEW component that adds a
 * "X% OFF" badge on top of it. The original component is not modified.
 *
 * Input  : RestaurantCard (or any card-like component)
 * Output : a new component that shows a discount badge only when the
 *          restaurant has a discount greater than 0.
 */
const withDiscountBadge = (RestaurantCard) => (props) => {
  // `RestaurantCard` is the component we are wrapping.
  // `props` are whatever the parent passes to the enhanced card,
  // here: { restData: {...restaurant object...} }

  // Pull the discount value out of the restaurant data.
  // The field name must be exactly `discount` (not "disount") in MockData.js.
  const { discount } = props.restData;

  // CASE 1: no discount (0, undefined, null).
  // All of these are falsy, so there is nothing to show.
  // Render the wrapped card as it is. {...props} forwards every prop to it.
  if (!discount) return <RestaurantCard {...props} />;

  // CASE 2: the restaurant has a discount.
  // Wrap the card in a container and add the badge next to it.
  return (
    // "card-wrap" -> position: relative, so the absolutely positioned badge
    //                is placed against this container (the card), not the page.
    <div className="card-wrap">
      {/* The badge. Dynamic text, e.g. "15% OFF".
          CSS (position: absolute; top/right) places it on the card image. */}
      <span className="discount-badge">{discount}% OFF</span>

      {/* The original card, unchanged and still receiving all its props. */}
      <RestaurantCard {...props} />
    </div>
  );
};

// Default export so other files can do: import withDiscountBadge from "./components/withDiscountBadge"
export default withDiscountBadge;