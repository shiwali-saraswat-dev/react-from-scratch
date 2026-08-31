# 16 - React Import & Export

A hands-on demo covering **default** and **named** imports/exports in React, built using a restaurant listing app (Food Delivery — Delhi NCR).

## 📁 Folder Structure

```
016-react-import-export/
├── index.html
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   └── RestaurantCard.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── mockData.js
│   └── Style.css
```

## 🎯 What This Demo Teaches

| Concept | File | Type |
|---|---|---|
| Default export | `App.jsx` | Component exported as `export default App` |
| Default export | `RestaurantCard.jsx` | Component exported as `export default RestaurantCard` |
| Default export | `mockData.js` | Array exported as `export default restaurantsList` |
| Named exports | `constants.js` | Multiple constants exported individually |

## 📦 Default Import/Export

Used when a file has **one main thing** to export.

```javascript
// Exporting (in mockData.js)
export default restaurantsList;

// Importing (in App.jsx)
import restaurantsList from "../utils/mockData";
```

**Rules:**
- No curly braces `{}`
- You can rename it anything on import — the name doesn't need to match
- Only **one** default export allowed per file

## 📦 Named Import/Export

Used when a file exports **multiple values**.

```javascript
// Exporting (in constants.js)
export const APP_TITLE = "Food Delivery Restaurants in Delhi NCR";
export const CURRENCY_SYMBOL = "₹";
export const MIN_RATING_FOR_TOP = 4;
export const ZMT_CDN = "https://b.zmtcdn.com/data/dish_photos/";

// Importing (in App.jsx) — Option 1: import only what you need
import { APP_TITLE, MIN_RATING_FOR_TOP } from "../utils/constants";

// Importing — Option 2: import everything as one object
import * as Constants from "../utils/constants";
// usage: Constants.APP_TITLE
```

**Rules:**
- Curly braces `{}` required
- Names must match **exactly** what was exported
- A file can have **many** named exports
- Multiple values can be imported at once, comma-separated

## 🗂️ Relative Path Cheatsheet

| From | To | Path |
|---|---|---|
| `index.html` (root) | `src/components/App.jsx` | `./src/components/App.jsx` |
| `App.jsx` (in `components/`) | `Style.css` (in `src/`) | `../Style.css` |
| `App.jsx` (in `components/`) | `mockData.js` (in `utils/`) | `../utils/mockData` |
| `RestaurantCard.jsx` (in `components/`) | `constants.js` (in `utils/`) | `../utils/constants` |
| `mockData.js` (in `utils/`) | `constants.js` (in `utils/`) | `./constants.js` |

**Rule of thumb:** `./` = same folder, `../` = go up one folder first, then navigate in.

## ▶️ How to Run

This project runs inside the shared Vite dev server for the whole `react-from-scratch` repo.

```bash
npm run dev
```

Then open:
```
http://localhost:5173/016-react-import-export/index.html
```

## 🧠 Key Takeaway

- **Default export** → "this file's main thing" → flexible naming on import
- **Named export** → "this file's specific labeled things" → exact naming required, multiple allowed

---
📌 Part of the [react-from-scratch](../README.md) learning series.