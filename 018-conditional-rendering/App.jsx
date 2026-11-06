import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

/* ---------- 1) EARLY RETURN: loading / error / empty ---------- */
const RestaurantList = ({ restaurants, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="state" role="status">
        <div className="spinner" />
        <h2>Loading restaurants</h2>
        <p>Hang tight, this takes a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state state-error" role="alert">
        <h2>Couldn't load restaurants</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="state">
        <h2>No restaurants found</h2>
        <p>Try turning off the "Open only" filter.</p>
      </div>
    );
  }

  return (
    <ul className="restaurant-list">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} {...r} />
      ))}
    </ul>
  );
};

/* ---------- 2) TERNARY + 3) && ---------- */
const RestaurantCard = ({ name, rating, isOpen, offer, deliveryTime }) => {
  return (
    <li className={isOpen ? "card" : "card is-closed"}>
      <div className="card-top">
        <h3 className="card-name">{name}</h3>

        {/* ternary: exactly two outcomes */}
        {isOpen ? (
          <span className="pill pill-open">Open</span>
        ) : (
          <span className="pill pill-closed">Closed</span>
        )}

        {/* &&: show or nothing */}
        {rating >= 4.5 && <span className="pill pill-top">⭐ Top rated</span>}
      </div>

      <div className="card-meta">
        {offer && <span className="pill pill-offer">🏷️ {offer}</span>}
        {/* > 0 so a 0 is never rendered */}
        {deliveryTime > 0 && (
          <span className="pill pill-time">⏱️ {deliveryTime} mins</span>
        )}
      </div>
    </li>
  );
};

/* ---------- 4) Conditional variable ---------- */
const LoginButton = ({ isLoggedIn, onToggle }) => {
  let label = "Login";
  if (isLoggedIn) {
    label = "Logout";
  }
  return (
    <button className="btn btn-primary" onClick={onToggle}>
      {label}
    </button>
  );
};

const sampleData = [
  { id: 1, name: "Pizza Hub", rating: 4.6, isOpen: true, offer: "20% OFF", deliveryTime: 30 },
  { id: 2, name: "Biryani Bazaar", rating: 4.1, isOpen: false, offer: "", deliveryTime: 0 },
  { id: 3, name: "Chai Point", rating: 4.8, isOpen: true, offer: null, deliveryTime: 15 },
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const list = showOpenOnly ? sampleData.filter((r) => r.isOpen) : sampleData;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Food App</h1>
        <LoginButton
          isLoggedIn={isLoggedIn}
          onToggle={() => setIsLoggedIn(!isLoggedIn)}
        />
      </header>

      {isLoggedIn ? (
        <p className="welcome">Welcome back! 👋</p>
      ) : (
        <p className="welcome">Log in to see your saved orders.</p>
      )}

      <div className="toolbar">
        <button
          className="btn"
          aria-pressed={showOpenOnly}
          onClick={() => setShowOpenOnly(!showOpenOnly)}
        >
          Open only
        </button>
        <button
          className="btn"
          aria-pressed={isLoading}
          onClick={() => setIsLoading(!isLoading)}
        >
          Simulate loading
        </button>
      </div>

      <RestaurantList restaurants={list} isLoading={isLoading} error={null} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
