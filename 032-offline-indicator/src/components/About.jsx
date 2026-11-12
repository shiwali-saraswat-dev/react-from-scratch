// Component -> base class for class components (named import, so we write
// `extends Component` instead of `extends React.Component`)
import { Component } from "react";

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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
}

export default About;