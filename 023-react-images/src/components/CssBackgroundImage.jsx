// Method 4: Use image assets inside CSS.
// The url() in App.css is resolved by the bundler relative to the CSS file,
// so it is hashed and optimised just like an ES6 import.
// Best for decorative images (backgrounds, patterns, icons), not content images.
export default function CssBackgroundImage() {
  return (
    <section className="card">
      <h2>4. CSS background</h2>
      <div className="css-bg" role="img" aria-label="Decorative CSS background">
        <span>Text on top of a CSS background</span>
      </div>
      <p className="note">
        <code>background-image: url("./assets/images/css-bg.svg")</code>
        <br />
        Add <code>role="img"</code> + <code>aria-label</code> if it carries meaning.
      </p>
    </section>
  );
}
