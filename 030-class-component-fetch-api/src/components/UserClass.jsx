import React from "react";

/**
 * UserClass
 * ---------
 * A class-based component that displays a GitHub user's profile card.
 * It shows default (dummy) data first, then replaces it with real data fetched from the GitHub API once the component has mounted.
 */
class UserClass extends React.Component {
  /**
   * Constructor
   * Runs first, once, when the component is created.
   * - super(props) is mandatory so that this.props is available.
   * - Initial state is set here with dummy data, so the first render has something to show before the API responds.
   */
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    console.log("Constructor");
  }

  /**
   * componentDidMount
   * Runs once, right after the first render is committed to the DOM.
   * Best place for API calls, subscriptions, and timers.
   * - Fetches the GitHub user profile.
   * - setState() replaces the dummy data with the real data and
   *   triggers a re-render (which leads to componentDidUpdate).
   */
  async componentDidMount() {
    console.log("Component Did Mount");

    // API call: fetch user profile from GitHub
    const data = await fetch("https://api.github.com/users/shiwali-saraswat-dev");
    const json = await data.json();

    // Update state with API data -> triggers a re-render
    this.setState({
      userInfo: json,
    });

    console.log("json : ", json);
  }

  /**
   * componentDidUpdate
   * Runs after every re-render caused by a state or props change (not on the initial mount).
   * Here it runs once, after setState() in componentDidMount.
   * Note: avoid calling setState here unconditionally, or it will cause an infinite update loop.
   */
  componentDidUpdate() {
    console.log("Component Did Update");
  }

  /**
   * componentWillUnmount
   * Runs just before the component is removed from the DOM.
   * Use it for cleanup: clearing timers (setInterval), removing event listeners, cancelling subscriptions or pending requests.
   */
  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  /**
   * render
   * Returns the JSX (UI) for the current state.
   * Runs on mount and on every state/props update.
   * Must stay pure: no API calls or setState here.
   */
  render() {
    console.log("Render");

    // Destructure the fields needed from state
    const { name, location, avatar_url, url } = this.state.userInfo;

    // debugger; // Uncomment to pause execution and inspect the render phase

    return (
      <div className="user-card">
        {/* avatar_url is undefined on the first render (dummy data) */}
        <img width="200" height="200" src={avatar_url} alt={name} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: 9999999999</h4>
        <h4>URL: {url}</h4>
      </div>
    );
  }
}

export default UserClass;

/**
 * ============ COMPONENT LIFECYCLE FLOW ============
 *
 * --- MOUNTING PHASE (first load) ---
 *
 * 1. Constructor        -> state initialised with dummy data
 * 2. Render             -> UI drawn with dummy data
 *                          <HTML with Dummy / Default>
 * 3. componentDidMount  -> runs after the first render
 *      -> API call is made
 *      -> this.setState() updates the state variable
 *
 * --- UPDATE PHASE (after setState) ---
 *
 * 4. Render             -> re-renders with real API data
 *                          <HTML with new API data>
 * 5. componentDidUpdate -> runs after the re-render
 *
 * --- UNMOUNTING PHASE ---
 *
 * 6. componentWillUnmount -> runs just before the component is removed
 *
 * Console output order:
 *   Constructor -> Render -> Component Did Mount -> (API resolves)
 *   -> Render -> Component Did Update -> json
 *
 * Note: React splits work into two phases:
 *   - Render phase (constructor, render): pure, no side effects
 *   - Commit phase (componentDidMount, componentDidUpdate,
 *     componentWillUnmount): DOM is ready, side effects allowed
 */