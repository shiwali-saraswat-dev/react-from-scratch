import { useContext } from "react";
import UserContext from "../utils/UserContext";

/*
 * PROFILE PAGE (function component)
 *
 * Shows the logged-in user's avatar, name, email, phone and address,
 * all read from Context (no props needed).
 *
 * Loaded lazily in App.jsx: lazy(() => import("./components/Profile")),
 * which is why this file must use `export default`.
 */
const Profile = () => {
    // Hooks must be called at the TOP LEVEL of the component, never inside if/loops.
    //
    // useContext(UserContext) returns the value of the NEAREST Provider above this
    // component: { user, setUserName } from AppLayout. If the name is edited in the
    // Header input, this page re-renders automatically with the new name.
    const userInfo = useContext(UserContext);

    // Short alias for the nested address object: { line1, city, state, pincode }
    const userAddress = userInfo.user.address;

    // Build the address text once, so the JSX stays clean.
    // Template literal = backticks with ${...} placeholders.
    const fullAddress = `${userAddress.line1}, ${userAddress.city}, ${userAddress.state}, ${userAddress.pincode}`;

    return (
        <div className="profile-container">
            <div className="img-div">
                {/* alt describes the image for screen readers and shows if the image fails to load.
                    FIX: the original used `name`, a variable that does not exist in this file, so alt
                    came out as " profile photo". It must come from the user object. */}
                <img src={ userInfo.user.avatar } alt={`${userInfo.user.name} profile photo`} />
            </div>

            <div className="user-detail">
                {/* Name: changes live when typed in the Header input (same shared Context value) */}
                <h1 className="profile-name">{ userInfo.user.name }</h1>

                {/* Each row = label + value. The two <span> classes are styled by the
                    .profile-container CSS (fixed label column, wrapping value). */}
                <p><span className="label">Email</span><span className="value">{ userInfo.user.email }</span></p>
                <p><span className="label">Phone</span><span className="value">{ userInfo.user.phone }</span></p>
                <p><span className="label">Address</span><span className="value">{ fullAddress }</span></p>
            </div>
        </div>
    );
};

export default Profile;