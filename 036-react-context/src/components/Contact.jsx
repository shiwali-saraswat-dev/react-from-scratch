import { useContext } from "react";
import UserContext from "../utils/UserContext.js";

/*
 * CONTACT PAGE (function component)
 *
 * Shows the logged-in user's name from Context, with no props passed down
 * through the layout (this avoids "prop drilling").
 *
 * Loaded lazily in App.jsx: lazy(() => import("./components/Contact")),
 * which is why this file must use `export default`.
 */
const Contact = () => {
    // Hooks must be called at the TOP LEVEL of the component, never inside if/loops.
    //
    // useContext(UserContext) returns the value of the NEAREST Provider above this
    // component. In this app that is { user, setUserName } from AppLayout.
    // Without a Provider above, it would return the default value from UserContext.js.
    //
    // When the Provider's value changes (for example setUserName is called),
    // React re-renders this component automatically with the new data.
    const userInfo = useContext(UserContext);

    return (
        <div className="container">
            <h2>Contact Functional Component</h2>
            
            {/* userInfo.user.name -> the name field of the user object in the context.
                Shorter form: const { user } = useContext(UserContext); then {user.name} */}
            <h4>LoggedIn User: <span style={{ color: "#d90beb" }}>{userInfo.user.name}</span></h4>

            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
        </div>
    );
};

export default Contact;