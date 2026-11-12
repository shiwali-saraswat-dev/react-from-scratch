import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

// Eager imports: shown on first load, so lazy loading them would only add a loading flash
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";   // note: shadows the global Error; ErrorPage is a safer name
import "./Style.css";

// Context object. Holds the default user data and is used both to PROVIDE (UserContext.Provider below) and to READ (useContext(UserContext)) the value.
import UserContext from "./utils/UserContext";

// Lazy pages: each becomes a separate JS chunk, downloaded on first visit.
// Each file must use `export default`, and each needs a <Suspense> above it (see AppLayout).
const Profile = lazy(() => import("./components/Profile"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

/*
 * AppLayout: the shared shell around every page.
 *   - provides the user data to the whole app through Context
 *   - renders Header on every route
 *   - renders the matched page in <Outlet />
 */
const AppLayout = () => {
  // The logged-in user's name. Starts as undefined and is filled after the "authentication" effect below. 
  // setUserName is also shared through Context, so any component (for example a login form) can change the name.
  const [userName, setUserName] = useState();

  // AppLayout sits ABOVE the Provider, so useContext here returns the DEFAULT value defined in UserContext.js (email, phone, address, avatar...).
  // We reuse those fields and override only the name.
  const defaultContext = useContext(UserContext);

  // Runs ONCE after the first render ([] = no dependencies).
  // Stands in for a real login call.
  useEffect(() => {
    // TODO: replace with a real API call (send username and password, receive the user)
    const data = {
      name: "Shiwali Saraswat",
    };
    setUserName(data.name);   // state change -> AppLayout re-renders -> Provider gets the new name
  }, []);

  // Build the user object consumers will read: userInfo.user.name / userInfo.user.email ...
  // Spread copies all default fields; `name` is then replaced by the state value.
  const user = {
    ...defaultContext.user,
    name: userName ?? defaultContext.user.name, // ?? = use the default name until the "API call" finishes
  };

  return (
    // Provider makes `value` available to EVERY component below it, however deep.
    // value = { user, setUserName }: the data plus a function to change the name.
    // Components read it with useContext(UserContext) (no prop drilling).
    <UserContext.Provider value={{ user, setUserName }}>
      {/* Shiwali Saraswat */}
      <div className="app">
        {/* Example kept for learning: a NESTED Provider overrides the value for its children only. 
        Components inside would see this name instead of the outer one. */}
        {/* <UserContext.Provider
          value={{ user: { ...user, name: "Saraswat Shiwali" }, setUserName }}
        > */}
          {/* Saraswat Shiwali */}
          <Header />
        {/* </UserContext.Provider>*/}

        {/* One Suspense for ALL lazy pages: while a page chunk downloads, show the fallback.
            Header stays visible because it is outside this Suspense. */}
        <Suspense fallback={<div>Loading data...</div>}>
          <Outlet /> {/* matched child route renders here: Body / Profile / About / Contact */}
        </Suspense>
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> }, // home, eager
        { path: "/profile", element: <Profile /> }, // lazy
        { path: "/about", element: <About /> }, // lazy
        { path: "/contact", element: <Contact /> }, // lazy
      ],
      errorElement: <Error />,
    },
  ],
  { basename: "/035-react-context" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);