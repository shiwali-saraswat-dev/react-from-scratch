/*
 * CONTACT PAGE (function component)
 *
 * Shows the logged-in user's name from Context, with no props passed down
 * through the layout (this avoids "prop drilling").
 *
 * Loaded lazily in App.jsx: lazy(() => import("./components/Contact")),
 * which is why this file must use `export default`.
 */
const Contact = () => {
    return (
        <div className="container">
            <h2>Contact Functional Component</h2>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
        </div>
    );
};

export default Contact;