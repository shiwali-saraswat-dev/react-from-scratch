const RestaurantCard = (props) => {
    const { resData } = props;
    return (
        <div className="res-card">
            <img className="res-logo" src={resData.imgUrl} alt="res-logo" />
            <h3>{resData.resName}</h3>
            <p>{resData.cuisine.join(", ")}</p>
            <h4>{`₹${resData.price} for one`}</h4>
            <h4>
                <span>{`⭐ ${resData.rating}`}</span>
            </h4>
            <h4>{`${resData.time} minutes`}</h4>
        </div>
    );
};

export default RestaurantCard;