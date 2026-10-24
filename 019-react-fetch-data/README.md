# 018 - Fetching Data with useState & useEffect

A hands-on demo of fetching live data from an API and rendering it dynamically,
using React's `useState` and `useEffect` hooks — built on top of a restaurant
listing app (Food Delivery — Delhi NCR, powered by Swiggy's public API).

## 📁 Folder Structure
```
018-react-fetch-data/
├── index.html
├── src/
│ ├── components/
│ │ ├── App.jsx
│ │ └── RestaurantCard.jsx
│ ├── utils/
│ │ └── constants.js
│ └── Style.css
```

## 🎯 What This Demo Teaches

| Concept | Where |
|---|---|
| `useState` | Storing fetched restaurant list in component state |
| `useEffect` | Triggering the API call once, when the component mounts |
| `fetch` + `async/await` | Making a network request and awaiting the JSON response |
| Optional chaining (`?.`) | Safely accessing deeply nested API response fields |
| `.find()` | Locating the correct data card inside a variable API response shape |
| `.map()` + `key` | Rendering a dynamic list of restaurant cards from fetched data |
| Named imports | Pulling `APP_TITLE`, `MIN_RATING_FOR_TOP` from `constants.js` |
| Default import | Pulling `RestaurantCard` component |

## 🔄 How the Data Flow Works

1. Component mounts → `useEffect` runs **once** (empty dependency array `[]`)
2. `fetchData()` calls the Swiggy API and awaits the JSON response
3. The response's `cards` array has an **inconsistent structure** — the actual
   restaurant grid could be at a different index each time — so `.find()` is
   used to locate the card that actually contains `gridElements.infoWithStyle.restaurants`
4. Optional chaining (`?.`) prevents crashes if any part of that nested path
   is missing or `undefined`
5. `setRestsList(resData)` updates state → triggers a re-render
6. `restsList.map(...)` renders one `RestaurantCard` per item, using each
   restaurant's unique `id` as the `key`

```javascript
useEffect(() => {
  fetchData();
}, []); // empty array = run only once, on mount
```

## ⚠️ Why `.find()` Instead of a Fixed Index?

Swiggy's API doesn't always return the restaurant grid at the same array
position — depending on location/promotions, extra cards (banners, ads,
carousels) can be inserted before it. Using `.find()` with a predicate makes
the code resilient to that instead of breaking on `cards[2]` one day and
`cards[4]` the next.

```javascript
const restaurantCard = json?.data?.cards?.find(
  (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
);
```

## ▶️ How to Run

```bash
npm run dev
```

Then open:
http://localhost:5173/018-react-fetch-data/index.html


> ⚠️ Note: This hits Swiggy's **public but unofficial** API directly from the
> browser — it may occasionally fail due to CORS restrictions or API changes,
> since it's not an officially documented/stable endpoint.

## 🧠 Key Takeaway

- `useState` → holds data that changes over time and drives re-renders
- `useEffect` → runs side effects (like API calls) *after* render, safely
  outside the render logic itself
- Empty dependency array `[]` → effect runs **once**, on mount only —
  the classic pattern for "fetch data when the page loads"

---
📌 Part of the [react-from-scratch](../README.md) learning series.
