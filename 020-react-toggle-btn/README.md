# Header Component

This folder demonstrates the same header UI built two different ways —
first as plain HTML & CSS, then rebuilt using React functional components
and component composition.

## 📁 Structure
```
012-headercomponent/
├── html-css-version/     → Plain HTML + CSS implementation
└── react-version/        → React implementation using component composition
```

## 1. HTML & CSS Version

A static header built using vanilla HTML5 and CSS only — no JavaScript framework.

**Features:**
- Logo on the left
- Search bar in the center (inline SVG icon)
- User icon on the right

### Run locally
Simply open the file directly in your browser:
html-css-version/index.html

No build step or server required — double-click the file, or open it via
`File > Open` in your browser.

## 2. React Version

The same header rebuilt using React, demonstrating:
- Functional components
- Component composition (`Logo`, `SearchBar`, `UserIcon` combined into `HeaderComponent`)
- Importing and displaying an image (`user-icon.png`) inside a component
- Using inline SVG for the search icon
- Component-scoped CSS (`Header.css`)

## Run locally

1. Make sure dependencies are installed at the project root:
npm install

2. Run the React version using **either** of the following bundlers:

   **Using Vite:**
npm run dev

Then open your browser at the URL shown in the terminal (typically `http://localhost:5173`).

   **Using Parcel:**
npx parcel 012-headercomponent/react-version/index.html

Then open your browser at:
http://localhost:1234

## Tech Stack

- React 19
- Vite / Parcel (bundler — either can be used to run this project)
- HTML5 & CSS3