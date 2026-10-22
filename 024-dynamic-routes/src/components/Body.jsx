import CategoryChip from "./CategoryChip";
import { categories } from "../utils/staticData";

const Body = () => (
    <div className="page">
        <h1 className="page-title">Categories</h1>
        <p className="page-subtitle">Pick a category to see matching restaurants</p>

        <div className="chip-list">
            {categories.map((cat) => (
                <CategoryChip key={cat.id} catData={cat} />
            ))}
        </div>
    </div>
);

export default Body;