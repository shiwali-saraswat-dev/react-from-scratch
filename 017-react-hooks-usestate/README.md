# 17 - React Hooks: useState

A two-part demo that shows **why** `useState` exists by first filtering data with plain JavaScript (no UI update), then solving that exact problem with React's `useState` hook.

## 📁 Folder Structure

```
017-react-hooks-usestate/
├── core-js/                    ← Part 1: filtering with plain JS (no re-render)
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── App.jsx
│       │   └── RestaurantCard.jsx
│       ├── utils/
│       │   └── constants.js
│       └── Style.css
│
├── usestate/                   ← Part 2: same filter, now reactive with useState
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── App.jsx
│       │   └── RestaurantCard.jsx
│       ├── utils/
│       │   ├── constants.js
│       │   └── mockData.js
│       └── Style.css
```

---

## 🧪 Part 1 — `core-js/` (The Problem)

**Goal:** Prove that filtering an array with plain JavaScript works perfectly fine on its own — but the screen doesn't update, because nothing is telling React to re-render.

```javascript
onClick={() => {
  const filteredList = restaurantsList.filter((res) => {
    return res.rating >= 4.5;
  });
  console.log("filteredList: ", filteredList); // ✅ logs correctly
  // ❌ but the UI below still shows ALL restaurants — nothing re-renders
}}
```

Open the browser console after clicking the button — you'll see the filtered array logged correctly. But the restaurant cards on screen won't change. **This is the exact gap `useState` is built to close.**

### Key Takeaway from Part 1
> A plain JS variable (`let restaurantsList = [...]`) has no way to tell React "hey, something changed, please re-render." React only re-renders when **state** changes — not when a regular variable is reassigned.

---

## ⚡ Part 2 — `usestate/` (The Solution)

Same filtering logic, same restaurant data — but now the list lives inside `useState`, so calling the setter function triggers React to re-render automatically.

### What is `useState`?

`useState` is a **React Hook** that lets a component hold and manage its own piece of reactive data ("state"). When that data changes via its setter function, React automatically re-renders the component to reflect the new value on screen.

```javascript
import { useState } from "react"; // named import — useState is a named export from "react"

const [restsList, setRestsList] = useState(restaurantsList);
```

### Breaking Down `useState(restaurantsList)`

`useState` returns an **array with exactly 2 elements**:
1. The **current value** of the state (starts as whatever you pass in as the argument)
2. A **setter function** used to update that state (and trigger a re-render)

```javascript
useState(restaurantsList); // returns: [restaurantsList, function(){...}]
```

### Every Way to Understand This (from simplest to what we actually write)

```javascript
// Step 1: useState returns an array — imagine storing it in a normal variable
const arr = useState(restaurantsList);
// arr[0] → current state value (restaurantsList)
// arr[1] → the setter function

// Step 2: Destructuring on the fly (pulling values out of that array manually)
const restsList = arr[0];
const setRestsList = arr[1];

// Step 3: Array destructuring — the ACTUAL syntax we use (does step 1 + 2 in one line)
const [restsList, setRestsList] = useState(restaurantsList);
```

All three steps above do the **exact same thing** — Step 3 is just the clean, standard way to write it.

### Different Starting Values You Can Pass to `useState`

```javascript
const [restsList] = useState();                 // undefined by default
const [restsList] = useState([]);                // empty array as default
const [restsList] = useState(null);              // null as default
const [restsList] = useState([{ id: 1, resName: "Sagar" }]); // one hardcoded restaurant
const [restsList] = useState(restaurantsList);   // full mock data as default (what we use)
```

### ⚠️ Critical Rule: Never Modify State Directly

```javascript
const [restsList, setRestsList] = useState(restaurantsList);

restsList = [];        // ❌ INVALID — restsList is NOT a normal variable, can't reassign it
setRestsList([]);      // ✅ VALID — always use the setter function to update state
```

**Why this matters:** React needs to *know* when data changes so it can re-render. Directly reassigning `restsList` bypasses React entirely — React has no idea anything changed, so the UI won't update. The setter function (`setRestsList`) is the *only* correct way to update state.

### Naming Convention (Industry Standard)

```javascript
const [restsList, setRestsList] = useState(restaurantsList);
//     ^^^^^^^^^  ^^^^^^^^^^^^^
//     state var   setter — MUST be "set" + the exact same name as the state variable
```

If your state variable is `restsList`, the setter **must** be named `setRestsList` (not `updateRestsList`, not `changeRestsList`). This is a strict community convention — following it makes code instantly readable to any React developer.

### The Big Picture: What State Actually Does

> **State keeps the UI layer in sync with the data layer, continuously.**
> Whenever a state variable is updated (via its setter), React automatically re-renders the component to reflect the new data — you never have to manually touch the DOM yourself.

---

## 🔀 Two Ways to Write Event Handler Logic (shown side-by-side in `usestate/App.jsx`)

### Option 1 — Inline logic directly inside `onClick`
```javascript
onClick={() => {
  const filteredList = restaurantsList.filter((res) => res.rating >= 4.5);
  setRestsList(filteredList);
}}
```
- **Pros:** quick, no extra function needed for simple one-off logic
- **Cons:** gets messy if the logic grows longer; can't be reused elsewhere without copy-pasting

### Option 2 — Logic extracted into a separate named function
```javascript
const resetFilter = () => {
  setRestsList(restaurantsList);
};

// ...later in JSX:
<button onClick={resetFilter}>Reset</button>
```
- **Pros:** cleaner JSX, reusable across multiple places, easier to read/test
- **Cons:** slightly more setup — needs a named function declared beforehand

Both styles are used deliberately in this demo, side-by-side, so you can compare them directly.

---

## 📦 Import Types Used in This Lesson

| Import | Type | Why |
|---|---|---|
| `import { useState } from "react"` | Named import | `useState` is one of several named exports from the `react` package |
| `import restaurantsList from "../utils/mockData.js"` | Default import | `mockData.js` exports one main array as its default export |
| `import { ZMT_CDN } from "../utils/constants.js"` | Named import | `constants.js` exports multiple named constants |
| `import RestaurantCard from "./RestaurantCard"` | Default import | The component is exported as a default export |

---

## ▶️ How to Run

```bash
npm run dev
```

Then open either:
```
http://localhost:5173/017-react-hooks-usestate/core-js/index.html
http://localhost:5173/017-react-hooks-usestate/usestate/index.html
```

Try clicking "Top Rated Restaurants" in **both** versions and compare:
- `core-js/` → console logs the filtered list, but the screen stays the same
- `usestate/` → the screen instantly updates to show only top-rated restaurants

---

## 🧠 Key Takeaways

- A **normal JS variable** can hold and filter data just fine — but changing it does **not** make React re-render.
- **`useState`** gives a component a piece of "reactive" data — updating it via the setter function automatically triggers a re-render.
- **Never mutate state directly** — always go through the setter function.
- Naming convention: `const [value, setValue] = useState(initialValue);`
- `useState` returns an array of exactly 2 items — array destructuring is just a clean way to pull both out in one line.

---
📌 Part of the [react-from-scratch](../README.md) learning series.