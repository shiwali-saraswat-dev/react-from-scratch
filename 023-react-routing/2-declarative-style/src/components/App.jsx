// 2 - Route, Routes, Link, NavLink (declarative mode)
// Every element on screen is labelled with its type, so you can SEE how each one behaves.

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter, // provides URL/history context to everything below
  Routes,        // renders the FIRST <Route> that matches the URL
  Route,         // one rule: path -> element
  Link,          // navigation without reload
  NavLink,       // Link that knows if it is the current page
  useLocation,   // reads the current URL (used by the status panel)
} from "react-router";
import "../Style.css";

const BASE = "/023-react-routing/2-declarative-style";

// Module-level, so it is evaluated once per FULL page load.
// If this time changes after a click, the browser reloaded the page.
const loadedAt = new Date().toLocaleTimeString();

// ── Small presentational helpers ─────────────────────────────────────
const Badge = ({ type }) => {
  const map = {
    link:    ["Link", "link"],
    navlink: ["NavLink", "navlink"],
    anchor:  ["<a href>", "anchor"],
    route:   ["Route", "route"],
    routes:  ["Routes", "routes"],
  };
  const [label, cls] = map[type];
  return <span className={`badge ${cls}`}>{label}</span>;
};

// One row = badge + the actual clickable element + a plain-language explanation
const Row = ({ type, title, behaviour, children }) => (
  <div className="row">
    <Badge type={type} />
    <div className="row-link">{children}</div>
    <div className="row-text">
      <strong>{title}</strong>
      <span>{behaviour}</span>
    </div>
  </div>
);

// NavLink accepts a function as children: it receives { isActive }.
// This is how we print ACTIVE / not active next to each NavLink.
const ActiveTag = ({ isActive }) => (
  <em className={isActive ? "on" : "off"}>{isActive ? "ACTIVE" : "not active"}</em>
);

// ── Pages: each one announces which <Route> rendered it ──────────────
const Page = ({ title, routeCode }) => (
  <div className="page">
    <Badge type="route" />
    <h2>{title}</h2>
    <p>Rendered because this rule matched:</p>
    <code>{routeCode}</code>
  </div>
);

// ── Status panel: what the router sees right now ─────────────────────
const Status = ({ count, setCount }) => {
  const { pathname } = useLocation(); // basename already removed
  return (
    <div className="status">
      <div><span>Router path (matched against Routes)</span><code>{pathname}</code></div>
      <div><span>Browser address bar path</span><code>{window.location.pathname}</code></div>
      <div><span>Page fully loaded at</span><code>{loadedAt}</code></div>
      <div>
        <span>Counter (React state)</span>
        <code>{count}</code>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="wrap">
      <h1>Route · Routes · Link · NavLink</h1>
      <p className="sub">
        Increase the counter, then click each link below. If the counter and the load time
        stay the same, the page did NOT reload.
      </p>

      <Status count={count} setCount={setCount} />

      <h3>Navigation: click and compare</h3>

      <Row
        type="link"
        title="Link to /about"
        behaviour="Changes URL and content. No reload, counter kept. Has NO active state."
      >
        <Link to="/about">Go to About</Link>
      </Row>

      <Row
        type="navlink"
        title='NavLink to "/" with end'
        behaviour='Active only on exactly "/". Gets class "active" automatically.'
      >
        <NavLink to="/" end>
          {({ isActive }) => <>Home <ActiveTag isActive={isActive} /></>}
        </NavLink>
      </Row>

      <Row
        type="navlink"
        title="NavLink to /about"
        behaviour="Active on /about (and anything below it, such as /about/team)."
      >
        <NavLink to="/about">
          {({ isActive }) => <>About <ActiveTag isActive={isActive} /></>}
        </NavLink>
      </Row>

      <Row
        type="navlink"
        title="NavLink to /contact"
        behaviour="Same behaviour as About, for the /contact URL."
      >
        <NavLink to="/contact">
          {({ isActive }) => <>Contact <ActiveTag isActive={isActive} /></>}
        </NavLink>
      </Row>

      <Row
        type="navlink"
        title='NavLink to "/" WITHOUT end (the gotcha)'
        behaviour='"/" is a prefix of every URL, so this one is ACTIVE on every page.'
      >
        <NavLink to="/">
          {({ isActive }) => <>Home (no end) <ActiveTag isActive={isActive} /></>}
        </NavLink>
      </Row>

      <Row
        type="link"
        title="Link to a URL no Route matches"
        behaviour='Falls through to the path="*" route and shows the 404 page.'
      >
        <Link to="/xyz">Go to /xyz</Link>
      </Row>

      <Row
        type="anchor"
        title="Plain <a href> to the app"
        behaviour="Full browser reload. Counter resets to 0 and the load time changes."
      >
        <a href={`${BASE}/`}>Reload the whole app</a>
      </Row>

      <h3>Result area</h3>

      {/* Routes picks ONE matching Route. Only that element renders here. */}
      <div className="routes-box">
        <Badge type="routes" />
        <Routes>
          <Route path="/"        element={<Page title="Home"    routeCode={'<Route path="/" element={<Home />} />'} />} />
          <Route path="/about"   element={<Page title="About"   routeCode={'<Route path="/about" element={<About />} />'} />} />
          <Route path="/contact" element={<Page title="Contact" routeCode={'<Route path="/contact" element={<Contact />} />'} />} />
          {/* "*" = everything else: the declarative way to make a 404 */}
          <Route path="*"        element={<Page title="404 - Not found" routeCode={'<Route path="*" element={<NotFound />} />'} />} />
        </Routes>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // basename is stripped from the URL before Routes matching
  <BrowserRouter basename={BASE}>
    <App />
  </BrowserRouter>
);