// components/withDeliveryStatus.jsx

/*
 * Higher Order Component (HOC)
 * ----------------------------
 * A HOC is a function that takes a component and returns a NEW component
 * with extra behaviour. It does not modify the original component.
 *
 * Input  : RestaurantCard (or an already-enhanced card, e.g. withDiscountBadge(RestaurantCard))
 * Output : a new component that greys out the card and shows
 *          "Currently not delivering" when the restaurant is not delivering.
 */
const withDeliveryStatus = (RestaurantCard) => (props) => {
  // `RestaurantCard` is the component we are wrapping.
  // `props` are the props the parent passes to the enhanced card,
  // here: { restData: {...restaurant object...} } (key is used by React, not passed in props).

  // CASE 1: the restaurant IS delivering.
  // Nothing to change, so render the wrapped card as it is.
  // {...props} forwards every prop (restData, etc.) to the inner component.
  if (props.restData.is_delivering) return <RestaurantCard {...props} />;

  // CASE 2: the restaurant is NOT delivering.
  // Wrap the card in a container that adds two things:
  return (
    // "card-wrap"      -> position: relative, so the overlay can be positioned
    //                     against this container instead of the whole page.
    // "not-delivering" -> CSS hook: `.not-delivering > :first-child` greys out
    //                     and fades the card (and any badges inside it).
    <div className="card-wrap not-delivering">
      {/* The original card, unchanged. It must be the FIRST child because
          the CSS rule `.not-delivering > :first-child` targets it. */}
      <RestaurantCard {...props} />

      {/* Overlay message. It is NOT greyed out, because the grey-out rule
          only applies to the first child. position: absolute in CSS
          places it on top of the card. */}
      <div className="delivery-overlay">Currently not delivering</div>
    </div>
  );
};

// Default export so other files can do: import withDeliveryStatus from "./components/withDeliveryStatus"
export default withDeliveryStatus;