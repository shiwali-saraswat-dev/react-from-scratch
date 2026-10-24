# 019 - React Loading UI: Spinner vs Shimmer

A two-part demo comparing two common ways of showing users that data is
still loading — a simple **spinner** (generic loading indicator) versus a
**shimmer/skeleton UI** (a placeholder that mimics the shape of the real
content) — both driven by conditional rendering based on state.

## 📁 Folder Structure

```
019-react-loading-ui/
├── spinner/ ← Part 1: generic loading spinner
│ ├── index.html
│ └── src/
│ ├── components/
│ │ ├── App.jsx
│ │ ├── RestaurantCard.jsx
│ │ └── Spinner.jsx
│ ├── utils/
│ │ └── constants.js
│ └── Style.css
│
├── shimmer-ui/ ← Part 2: skeleton/shimmer placeholder UI
│ ├── index.html
│ └── src/
│ ├── components/
│ │ ├── App.jsx
│ │ ├── RestaurantCard.jsx
│ │ └── Shimmer.jsx
│ ├── utils/
│ │ └── constants.js
│ └── Style.css
```


---

## 🌀 Part 1 — `spinner/` (Generic Loading Indicator)

**Goal:** Show the simplest possible loading UI — a spinning icon/animation —
while the API call is in flight, using an early-return `if` check.

```javascript
// CONDITIONAL RENDERING — Method 1: early return with "if"
if (restsList.length === 0) {
  return <h1>loading. . .</h1>; // or Spinner here...
}
```

---

## ✨ Part 2 — `shimmer-ui/` (Skeleton Placeholder UI)

**Goal:** Instead of a generic spinner, render **grey placeholder cards**
that match the exact shape/layout of the real `RestaurantCard` components —
so the user sees the page's structure appear immediately, before the real
data/images have even arrived.

```javascript
// CONDITIONAL RENDERING — Method 2: ternary operator, inline in JSX
return restsList.length === 0 ? (
  <Shimmer />
) : (
  <div className="app">
    <h1>{APP_TITLE}</h1>
    <div className="res-container">
      {restsList.map((resData) => (
        <RestaurantCard key={resData.info.id} resData={resData.info} />
      ))}
    </div>
  </div>
);
```

### What is Shimmer UI (Skeleton Screen)?

A **shimmer/skeleton UI** renders placeholder blocks that mimic the size and
position of the real content (cards, images, text lines) — often with a
subtle animated "shine" sweeping across them. It gives the perceived
impression that content is "already there, just filling in," which feels
faster to users than a blank screen or a plain spinner — even if the actual
load time is identical.

```javascript
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <h1>{APP_TITLE}</h1>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
    </div>
  );
};
```

```css
.shimmer-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    padding: 40px;
}

.shimmer-container h1 {
    grid-column: 1 / -1;
    text-align: center;
    margin: 0 0 30px;
    text-align: center;
}

.shimmer-card {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    height: 200px;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
}
```

### Key Takeaway from Part 2
> Shimmer UI takes more setup (needs a placeholder component matching your
> real layout), but gives a noticeably more polished, "professional app"
> feel — this is what most production apps (Swiggy, Zomato, LinkedIn,
> YouTube) actually use instead of plain spinners.

---

## 🔀 Two Conditional Rendering Styles Compared Side-by-Side

| | `spinner/` | `shimmer-ui/` |
|---|---|---|
| **Syntax** | Early return with `if` | Ternary operator inline in `return` |
| **Loading UI** | Rotating spinner icon | Grey skeleton cards matching real layout |
| **User perception** | "Something is loading" | "Content is already forming" (feels faster) |
| **Setup effort** | Very low — one small component | Slightly higher — placeholder must roughly match real card dimensions |

Both are triggered by the exact same underlying condition —
`restsList.length === 0` — just rendered differently, and written with a
different conditional-rendering syntax, so you can compare both patterns
directly.

---

## ▶️ How to Run

```bash
npm run dev
```

Then open either:
http://localhost:5173/019-react-loading-ui/spinner/index.html
http://localhost:5173/019-react-loading-ui/shimmer-ui/index.html


Throttle your network in DevTools (Network tab → "Slow 3G") to clearly see
each loading state before the real data replaces it.

---

## 🧠 Key Takeaways

- **Conditional rendering** just means using normal JS (`if`, ternary, `&&`)
  inside a component to decide what to show, based on state.
- A **spinner** is the simplest loading indicator — generic, fast to build,
  gives no content preview.
- A **shimmer/skeleton UI** mimics the real content's shape — more setup,
  but a noticeably better perceived-performance experience.
- Both are commonly triggered by the same state check
  (e.g., `data.length === 0` or a dedicated `isLoading` boolean).
- Real-world production apps almost always favor shimmer UI over plain
  spinners for list/grid-heavy pages.

---
📌 Part of the [react-from-scratch](../README.md) learning series.