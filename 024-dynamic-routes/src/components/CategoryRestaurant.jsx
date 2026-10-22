import { useParams, Link } from "react-router";
import { categories, restaurants } from "../utils/staticData";

const CategoryRestaurant = () => {
    const { catId } = useParams();

    const category = categories.find((c) => c.id === catId);
    const list = restaurants[catId] || [];

    if (!category) {
        return (
            <div className="page">
                <Link to="/" className="back-link">← Back to Home</Link>
                <h1 className="page-title">Category not found</h1>
                <div className="empty-box">No category found for "{catId}".</div>
            </div>
        );
    }

    return (
        <div className="page">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1 className="page-title">{category.name} Restaurants</h1>
            <span className="param-badge">URL param catId = <b>{catId}</b></span>

            {list.length === 0 ? (
                <div className="empty-box">No restaurants yet for {category.name}.</div>
            ) : (
                <div className="rest-grid">
                    {list.map((r) => (
                        <div className="rest-card" key={r.id}>
                            <span className="rest-name">{r.name}</span>
                            <span className="rating">★ {r.rating}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryRestaurant;