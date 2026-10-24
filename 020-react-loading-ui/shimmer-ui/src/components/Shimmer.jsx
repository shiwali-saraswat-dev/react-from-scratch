import { APP_TITLE } from "../utils/constants";
/**
 * ShimmerCard
 * -----------
 * A "skeleton" placeholder UI shown WHILE real data is still loading.
 * It mimics the shape/layout of the actual RestaurantCard (image block +
 * text lines) using plain grey boxes, so the user sees *something* on
 * screen instantly instead of a blank page or spinner.
 *
 * This is a pure, static, no-props component — it always looks the same.
 */
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <h1>{APP_TITLE}</h1>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
    </div>
  );
};

export default Shimmer;