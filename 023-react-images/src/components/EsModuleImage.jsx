// Method 1: Import the image as an ES6 module.
// The bundler (Vite/Webpack) processes the file, hashes the filename
// for cache-busting, and gives back the final URL as a string.
// A missing file fails at BUILD time, not at runtime.
import esDemo from "../assets/images/es6-demo.svg";

export default function EsModuleImage() {
  return (
    <section className="card">
      <h2>1. ES6 module import</h2>
      <img src={esDemo} alt="Imported with an ES6 module" width="320" />
      <p className="note">
        <code>import img from "../assets/images/es6-demo.svg"</code>
        <br />
        Resolved URL: <code>{esDemo}</code>
      </p>
    </section>
  );
}
