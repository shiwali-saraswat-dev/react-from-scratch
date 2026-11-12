// useContext -> reads the shared user data from Context
import { useContext } from "react";

// NavLink -> like <Link> (changes the URL without a page reload), but also adds an
// "active" class to the link that matches the current URL, so you can style it
import { NavLink } from "react-router";

// Context object. The value is supplied by <UserContext.Provider> in AppLayout (App.jsx).
import UserContext from "../utils/UserContext.js";

// App logo URL, kept in one place in utils/constants.js
import { LOGO_URL } from "../utils/constants.js";

/*
 * HEADER (function component)
 *
 * Shown on every page because AppLayout renders it above <Outlet />.
 * Contains: logo, a name input that edits the shared user name,
 * navigation links, and the logged-in user's name linking to /profile.
 */
const Header = () => {
    // Reads { user, setUserName } from the NEAREST UserContext.Provider above.
    //   user        -> the user object (name, email, phone, address, ...)
    //   setUserName -> function that changes the name stored in AppLayout's state
    // Because the value lives in AppLayout, a change made here re-renders
    // EVERY component that reads this context (Body, Contact, About, Profile ...).
    const { user, setUserName } = useContext(UserContext);

    return (
        <div className="header">
            <div className="logo-container">
                {/* Logo links to home. alt text is missing: add alt="Logo" for accessibility. */}
                <NavLink to="/">
                    <img className="logo" src={LOGO_URL} height="100" style={{ marginBottom: 20 }} />
                </NavLink>
            </div>

            <div className="search-container">
                {/* CONTROLLED input: value comes from Context, and every keystroke calls
                    setUserName with the new text. React state is the single source of truth,
                    so typing here updates the name everywhere on the page at the same time. */}
                <input type="text" className="search-box" placeholder="User Name..."
                    value={user.name}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <div className="nav-items">
                <ul>
                    {/* NavLink adds the "active" class to the link of the current page */}
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>
                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                    <li>
                      {/* Shows the current user name and links to the Profile page.
                          This text changes live while typing in the input above. */}
                      <NavLink to="/profile">
                        <span className="user-name">{ user.name }</span>
                      </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;