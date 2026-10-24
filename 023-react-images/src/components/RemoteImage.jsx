import { useState } from "react";

// Method 3: Load an image from a remote source (CDN, API, another domain).
// The URL is just a string, so it can also come from props, state or an API.
// Always add an alt, a fallback for errors, and lazy loading for below-the-fold images.
const REMOTE_URL = "https://picsum.photos/id/1015/640/360";
const FALLBACK = "/images/public-demo.svg";

export default function RemoteImage() {
  const [src, setSrc] = useState(REMOTE_URL);
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="card">
      <h2>3. Remote source</h2>
      {!loaded && <p className="note">Loading…</p>}
      <img
        src={src}
        alt="Landscape loaded from a remote URL"
        width="320"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setSrc(FALLBACK); // offline / blocked / 404 -> show fallback
          setLoaded(true);
        }}
        // Don't use display:none here. A hidden image has no box, so a lazy
        // image would never start loading. visibility keeps the box in place.
        style={{
          visibility: loaded ? "visible" : "hidden",
          aspectRatio: "16 / 9", // reserves space so the layout doesn't jump
        }}
      />
      <p className="note">
        <code>src="{REMOTE_URL}"</code>
        <br />
        Needs network; falls back to a local image on error.
      </p>
    </section>
  );
}