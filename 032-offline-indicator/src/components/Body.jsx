import useOnlineStatus from "../utils/useOnlineStatus";
import Offline from "./Offline";

/*
 * HOME PAGE (function component)
 *
 * Shows the logged-in user's name from Context, with no props passed down
 * through Header/Layout (this avoids "prop drilling").
 */
const Body = () => {
    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return <Offline />;

    return (
        <div className="container">
            <h2>Home Page</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</p>
        </div>
    );
};

export default Body;