// Importing React from node_modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node_modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// Import component-specific styles for the Header component
import "./Header.css";

// Import the user icon image as a module; 
// bundlers(Parcel/Vite) resolve this to a usable URL pointing to the final bundled asset
import userIcon from "./assets/user-icon.png";

// Child component: renders the brand logo
const Logo = () => (
  <div className="logo">MyBrand</div>
);

// Child component: renders the search bar with an inline SVG icon
const SearchBar = () => (
  <div className="search-bar">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input type="text" placeholder="Search..." />
  </div>
);

// Child component: renders the user icon using an actual image file
const UserIcon = () => (
  <div className="user-icon">
    {/* User icon - displayed using an actual image file */}
    <img src={userIcon} alt="User" className="user-icon" />
  </div>
);

// Parent component: demonstrates component composition by combining Logo, SearchBar, and UserIcon into a single header layout.
// Wrapped in a <header> element since JSX requires a single root element.
const HeaderComponent = () => (
  <header>
    <Logo />
    <SearchBar />
    <UserIcon />
  </header>
);

// Create a React root attached to the DOM element with id "root".
// This root serves as the entry point where the React component tree will be rendered into the actual DOM.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component, which internally renders Logo, SearchBar, and UserIcon as composed child components
root.render(<HeaderComponent />);