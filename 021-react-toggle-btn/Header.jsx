import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./Header.css";
import userIcon from "./assets/user-icon.png";


const Header = () => {
  // Tracks the current label of the auth button.
  // "Login" = user is logged out, "Logout" = user is logged in.
  // (In a real app this should be driven by actual auth state,
  // not just a button label — see note below.)
  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
          <img className="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png" height="100" style={{ marginBottom: 20 }} />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>

          <button
            className="login-new"
            onClick={() => {
              // setBtnNameReact("Logout");
              // console.log(btnNameReact); 

              // Toggle handler: flips the button between "Login" and "Logout" each time it's clicked, using a ternary as a simple two-state switch.
              // TODO: this only changes the label — it doesn't perform real authentication. 
              // Wire this up to your actual login/logout logic(API call, context/store update, redirect, etc.) before shipping.
              btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>

          <li className="px-4 user-name">John Doe</li>
        </ul>
     </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);