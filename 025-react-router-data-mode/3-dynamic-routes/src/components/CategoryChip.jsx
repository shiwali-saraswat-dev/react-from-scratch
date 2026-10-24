import { useNavigate } from "react-router";

const CategoryChip = ({ catData }) => {
    const navigate = useNavigate();              // hook first, before any early return
    if (!catData) return null;

    const handleClick = () => navigate(`/category/${catData.id}`);

    return (
        <button className="cat-chip" onClick={handleClick}>
            {catData.name}
        </button>
    );
};

export default CategoryChip;