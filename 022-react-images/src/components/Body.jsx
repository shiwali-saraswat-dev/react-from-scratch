
import EsModuleImage from "./EsModuleImage";
import PublicFolderImage from "./PublicFolderImage";
import RemoteImage from "./RemoteImage";
import CssBackgroundImage from "./CssBackgroundImage";
import "../Style.css";

export default function Body() {
  return (
    <main className="page">
      <h1>Images in React: 4 ways</h1>
      <div className="grid">
        <EsModuleImage />
        <PublicFolderImage />
        <RemoteImage />
        <CssBackgroundImage />
      </div>
    </main>
  );
}