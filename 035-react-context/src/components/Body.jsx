import { useContext } from "react";
import UserContext from "../utils/UserContext.js";

/*
 * HOME PAGE (function component)
 *
 * Shows the logged-in user's name from Context, with no props passed down
 * through Header/Layout (this avoids "prop drilling").
 */
const Body = () => {
    // Hooks must be called at the TOP LEVEL of the component, never inside if/loops.
    //
    // useContext(UserContext) returns the value of the NEAREST Provider above this component. 
    // In this app that is { user, setUserName } from AppLayout.
    // If there were no Provider above, it would return the default value from UserContext.js.
    //
    // When the Provider's value changes (for example setUserName is called), React re-renders this component automatically with the new data.
    const userInfo = useContext(UserContext);

    return (
        <div className="container">
            <h2>Home Page</h2>

            {/* userInfo.user.name -> the name field of the user object in the context.
                Destructuring makes it shorter: const { user } = useContext(UserContext); then {user.name} */}
            <h4>LoggedIn User: <span style={{ color: "#d70e76" }}>{userInfo.user.name}</span></h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</p>
        </div>
    );
};

export default Body;