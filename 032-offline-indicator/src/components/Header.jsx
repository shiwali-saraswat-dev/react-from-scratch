import { LOGO_URL } from "../utils/constants.js";
import { NavLink } from "react-router";
import { OfflineBadge } from "./OfflineIndicator";

/*
 * HEADER (function component)
 *
 * Shown on every page because AppLayout renders it above <Outlet />.
 * Contains: logo, a name input that edits the shared user name,
 * navigation links, and the logged-in user's name linking to /profile.
 */
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
                    <li><OfflineBadge /></li>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>
                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;