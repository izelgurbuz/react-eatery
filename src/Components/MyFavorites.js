import React from "react";
import { useSelector } from "react-redux";
import "../myfavorites.css";
import { Link } from "react-router-dom";

const MyFavorites = () => {
  const favs = useSelector((state) => state.favorites);
  console.log(favs);

  return (
    <div className="MyFavorites">
      {favs.map((item) => (
        <Link to={`/restaurants/${item.id}`}>
          <div className="my-fav-item">
            <h3>{item.name}</h3>
            <img src={item.featured_image}></img>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyFavorites;
