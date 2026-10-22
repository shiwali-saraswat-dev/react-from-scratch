import { LOGO_URL } from "../utils/constants.js"; // Import the app logo URL from the centralized constants file

// NavLink — like <Link> but adds "active" class automatically when its route matches the current URL
import { NavLink } from "react-router";

// NavLink passes { isActive } to a className function.
// isActive is true when the link's "to" matches the current URL.
// The returned string is used as the className, so "active" can be styled in Style.css:
//     nav a.active { font-weight: bold; border-bottom: 2px solid; }
const linkClass = ({ isActive }) => (isActive ? "active" : "");

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
                    {/* "to" is relative to the router's basename, so write "/about", not "/023-react-routing/about".
                    "end" on the Home link: matching is by prefix by default, and "/" is a prefix of every URL. 
                    Without "end", Home would be highlighted on every page.
                    Use "end" on any link whose path is also the start of other links' paths. */}
                    <li><NavLink to="/" end className={linkClass}>Home</NavLink ></li>
                    <li><NavLink to="/about" className={linkClass}>About Us</NavLink ></li>
                    <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink ></li>

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