// Method 2: Reference an image from the /public folder.
// Files in /public are NOT processed by the bundler;
// they are copied as-is to the build output and served from the site root.
// Use the absolute path starting with "/" (no "public" in the URL).
//
// IMPORTANT: "/public" means the public folder of the project ROOT, i.e. the
// folder that contains package.json / vite.config.js and where `npm run dev`
// is run. In this repo that root is D:\react-from-scratch, so the image must be at:
//   react-from-scratch/public/images/public-demo.svg      (works)
//   react-from-scratch/022-react-images/public/images/... (NOT served, wrong folder)
// Vite only serves "/images/..." from the root's public folder, never from a
// public folder inside a sub-folder like 022-react-images.
//
// Vite:  src="/images/public-demo.svg"
// CRA:   src={process.env.PUBLIC_URL + "/images/public-demo.svg"}
export default function PublicFolderImage() {
  return (
    <section className="card">
      <h2>2. Public folder</h2>
      <img
        src="/images/public-demo.svg"
        alt="Served from the public folder"
        width="320"
      />
      <p className="note">
        <code>src="/images/public-demo.svg"</code>
        <br />
        No import needed; no hashing; fails silently (404) if the path is wrong.
      </p>
    </section>
  );
}
