import { useState, useEffect } from "react";
import { LOGO_URL } from "../utils/constants.js"; // Import the app logo URL from the centralized constants file

// NavLink — like <Link> but adds "active" class automatically when its route matches the current URL
import { NavLink } from "react-router";

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <NavLink to="/">
                    <img className="logo" src={LOGO_URL} height="100" style={{ marginBottom: 20 }} />
                </NavLink>
            </div>

            <div className="nav-items">
                <ul>
                    <li><NavLink to="/">Home</NavLink ></li>
                    <li><NavLink to="/about">About Us</NavLink ></li>
                    <li><NavLink to="/contact">Contact Us</NavLink ></li>

                    <li className="user-menu">
                        <button className="user-trigger">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                style={{ stroke: "#e6cd26" }}
                                >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                            </svg>
                            <span className="user-name">John Doe</span>
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    )
};

export default Header; // Default export so Header can be imported without curly braces