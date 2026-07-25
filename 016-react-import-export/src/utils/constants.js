/**
 * constants.js
 *
 * Holds shared constant values used across the app.
 * Demonstrates NAMED EXPORTS — multiple values exported from a single file.
 *
 * Usage: import only what you need using curly braces, and the names must
 * match exactly what's exported here.
 * Example: import { APP_TITLE, CURRENCY_SYMBOL } from "./constants";
 */

export const CURRENCY_SYMBOL = "₹";
export const APP_TITLE = "Food Delivery Restaurants in Delhi NCR";
export const MIN_RATING_FOR_TOP = 4;

// Base CDN URL for restaurant dish photos — prepended to each image's relative path
export const ZMT_CDN = "https://b.zmtcdn.com/data/dish_photos/";