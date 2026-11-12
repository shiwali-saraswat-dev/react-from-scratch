// Component -> base class for class components (named import, so we write
// `extends Component` instead of `extends React.Component`)
import { Component } from "react";

// Context object created in utils/UserContext.js.
// Class components cannot use the useContext() hook, so we read it with
// <UserContext.Consumer> (render-prop pattern) or `static contextType` (see note below).
import UserContext from "../utils/UserContext";

/*
 * ABOUT PAGE (class based)
 *
 * Shows the logged-in user's name, which is provided by
 * <UserContext.Provider> in AppLayout (App.jsx).
 *
 * Function component equivalent:
 *   const { user } = useContext(UserContext);
 */
class About extends Component {

  constructor(props) {
    super(props);   // always first, so this.props works
  }

  render() {
    return (
      <div className="container">
        <h2>About Class Component</h2>

        <h4>LoggedIn User:
            {/*
              Consumer = "give me the current context value".
              Its only child must be ONE FUNCTION. React calls it with the value from the nearest <UserContext.Provider> above in the tree.
              Whenever that value changes, React calls this function again, so the name updates automatically.
            */}
            <UserContext.Consumer>
                {(data) => {
                    // `data` = { user, setUserName } as passed in the Provider's value.
                    console.log(data); // block body { } lets you run statements first (debugging)

                    // With a block body we must return explicitly
                    return <span style={{ color: "#0bebe3" }}> { data.user.name } </span>;
                }}
            </UserContext.Consumer>
        </h4>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
}

export default About;