// This is a normal component. Nothing special inside it.
// The "lazy" part happens only in App.jsx, where it is imported.
const About = () => {
    return (
        <div>
            <h3>About page (loaded lazily)</h3>
            <p>This code was downloaded only after you clicked the button.</p>
        </div>
    );
};

// IMPORTANT: React.lazy works only with a DEFAULT export.
// A named export (export const About) would not work directly with lazy.
export default About;