// useRouteError — returns the error object (status, statusText) thrown by the current route
// useNavigate  — returns a function to programmatically navigate between routes
import { useRouteError, useNavigate } from "react-router";

const Error = () => {
  // Error details from the router; optional chaining below guards against undefined
  const error = useRouteError();

  // Navigation helper used by the "Go home" and "Go back" buttons
  const navigate = useNavigate();

  // 404 = no route matched the URL. Anything else is treated as a runtime/render error.
  const is404 = error?.status === 404;

  return (
    <div className="error-page">

      {/* Decorative plate icon above the error message */}
      <div className="error-plate">
        <span>🍽️</span>
      </div>

      {/* Status badge: shows e.g. "404 — Not Found".
          Falls back to generic text when the error has no status
          (for example, an exception thrown inside a component) */}
      <div className="error-badge">
        {error?.status || "Error"} — {error?.statusText || "something went wrong"}
      </div>

      {/* Heading changes based on the error type */}
      <h1 className="error-title">
        {is404
          ? "Looks like this page went missing"
          : "Something went wrong in the kitchen"}
      </h1>

      {/* Supporting message: friendly explanation for 404 vs. unexpected errors */}
      <p className="error-sub">
        {is404
          ? "The page you're looking for isn't on the menu. It may have moved, or the URL might be off."
          : "We hit an unexpected error. Our team has been notified — try again in a moment."}
      </p>

      {/* Recovery actions */}
      <div className="error-btn-row">
        {/* "/" is relative to the router basename, so this goes to /023-react-routing/ */}
        <button className="error-btn-primary" onClick={() => navigate("/")}>
          Go home
        </button>

        {/* -1 moves back one step in the browser history, same as the Back button */}
        <button className="error-btn-ghost" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>

      {/* Shows the URL that triggered the error, useful for debugging.
          Note: window.location.pathname includes the basename (/023-react-routing/...) */}
      <div className="error-meta">
        {window.location.pathname}
      </div>

    </div>
  );
};

export default Error;