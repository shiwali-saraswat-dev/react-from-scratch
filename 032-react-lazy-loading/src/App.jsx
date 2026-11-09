import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";

/*
 * NORMAL import (eager loading), for comparison:
 *   import About from "./About";
 * The bundler puts About's code in the SAME js file as App.
 * The browser downloads it on first load, even if the user never opens About.
 *
 * LAZY import (code splitting):
 *   import("./About") is a DYNAMIC import. It is a function call that
 *   returns a Promise. It does NOT download anything until it is called.
 *   The bundler sees it and puts About in a SEPARATE js file (a "chunk").
 *
 * lazy(() => import("./About")):
 *   - lazy() takes a function that returns that Promise.
 *   - React calls the function only when <About /> is about to be rendered
 *     for the first time. That is when the chunk gets downloaded.
 *   - After the first download the result is cached, so it never downloads twice.
 *
 * PHP comparison: like spl_autoload_register. The class file is
 * loaded only when the class is first used, not with require at the top.
 *
 * Keep this line OUTSIDE the component. If it were inside, a new lazy
 * component would be created on every render and its state would reset.
 */
const About = lazy(() => import("./components/About"));

/*
 * TO SEE THE FALLBACK (demo only): locally the chunk loads in a few ms, so
 * the loading text flashes by. Replace the line above with this one, which
 * waits 1.5 seconds before importing, to simulate a slow network:
 *
 * const About = lazy(() =>
 *     new Promise((resolve) => setTimeout(resolve, 1500)).then(() => import("./components/About"))
 * );
 */

const App = () => {
    // showAbout decides whether <About /> is rendered at all.
    // Lazy loading is only useful when the component is NOT shown right away,
    // so we load it on a button click (similar to a route change).
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif" }}>
            <h2>Lazy Loading</h2>

            <button onClick={() => setShowAbout(true)}>Load About</button>

            {/*
              Suspense = "wait here" wrapper.
              While a lazy child is still downloading, React shows `fallback`.
              When the download finishes, React replaces the fallback with the real component.

              Suspense is REQUIRED around lazy components.
              Without it React throws an error, because it would have nothing to show during the wait.
            */}
            {showAbout && (
                <Suspense fallback={<p>Loading About...</p>}>
                    <About />
                </Suspense>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);