import React, { useEffect } from "react";
import { useState } from "react";
import "../home.css";
import { useSelector, useDispatch } from "react-redux";
import { addRestaurant } from "../Redux/Actions";
import { Link } from "react-router-dom";
import dotenv from "dotenv";

const Home = () => {
  const MAIN_URL = `https://developers.zomato.com/api/v2.1/`;
  const USER_KEY = process.env.REACT_APP_USER_KEY;

  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cuisineSuggestions, setCuisineSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [params, setParams] = useState("");

  const favorite = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const fetchData = async (fullUrl) => {
    const data = await fetch(fullUrl, {
      headers: {
        "user-key": USER_KEY,
      },
    });
    const response = await data.json();
    return response;
  };

  const fetchCuisineSuggestions = async () => {
    if (citySuggestions.map((item) => item.name).includes(city)) {
      const selectedCityId = citySuggestions.find((item) => item.name === city)
        .id;
      const response = await fetchData(
        MAIN_URL + `cuisines?city_id=${selectedCityId}`
      );
      setCuisineSuggestions(response.cuisines);
    }
  };

  const fetchCitySuggestions = async () => {
    const query = city.replace(/\s/g, "");
    const suggestions = await fetchData(MAIN_URL + `cities?q=${query}`);
    setCitySuggestions(suggestions.location_suggestions);
  };

  const fetchRestaurants = async () => {
    if (citySuggestions.map((item) => item.name).includes(city)) {
      const response = await fetchData(MAIN_URL + `search?${params}`);
      setRestaurants(
        response.restaurants.filter((item) =>
          item.restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setKeyWord("");
    }
  };

  useEffect(() => {
    fetchCitySuggestions();
    fetchCuisineSuggestions();
  }, [city]);

  useEffect(() => {
    fetchRestaurants();
  }, [params]);

  const updateKey = (e) => {
    setKeyWord(e.target.value);
  };
  const updateCity = (e) => {
    setCity(e.target.value);
  };
  const updateCuisine = (e) => {
    setCuisine(e.target.value);
  };

  const setSearchParams = (e) => {
    e.preventDefault();
    const selectedCity = citySuggestions.find((item) => city === item.name);
    const selectedCuisine = cuisineSuggestions.find(
      (item) => cuisine == item.cuisine.cuisine_name
    );
    if (typeof selectedCity !== "undefined" && selectedCity !== null) {
      var cityparam = {
        entity_id: selectedCity.id,
        entity_type: "city",
      };
    } else alert("City Name Is Not Valid!");
    if (keyword !== "") {
      var keyparam = { q: keyword };
    }
    if (typeof selectedCuisine !== "undefined" && selectedCuisine !== null) {
      var cuisineparam = {
        cuisines: selectedCuisine.cuisine.cuisine_id,
      };
    }

    const toConvert = { ...cityparam, ...keyparam, ...cuisineparam };
    const paramsConverted = new URLSearchParams(toConvert).toString();
    setParams(paramsConverted);
  };

  return (
    <div>
      <div className="Home">
        <form className="search-group" onSubmit={setSearchParams}>
          <input
            value={keyword}
            className="search-element"
            onChange={updateKey}
            placeholder="Key"
          />

          <input
            type="text"
            value={city}
            className="search-element"
            onChange={updateCity}
            list="cities"
            placeholder="City"
            autoComplete="on"
          />
          <datalist id="cities">
            {citySuggestions.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </datalist>
          <div
            className="search-element"
            style={
              citySuggestions.map((item) => item.name).includes(city)
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <input
              type="text"
              value={cuisine}
              onChange={updateCuisine}
              list="cuisines"
              placeholder="Cuisine"
              autoComplete="on"
              className="cuisine"
            />
            <datalist id="cuisines">
              {cuisineSuggestions.map((item) => (
                <option key={item.id}>{item.cuisine.cuisine_name}</option>
              ))}
            </datalist>
          </div>

          <button id="submit-button" type="submit" className="search-element">
            Search
          </button>
        </form>
      </div>
      <div className="flow">
        {restaurants.map((item) => (
          <div key={item.restaurant.id} className="restaurant-container">
            <Link to={`/restaurants/${item.restaurant.id}`}>
              <div className="restaurant-overlook-container">
                <img
                  className="restaurant-overlook"
                  src={item.restaurant.featured_image}
                  alt=""
                />
                <h3 className="restaurant-overlook">{item.restaurant.name}</h3>
              </div>
            </Link>
            <div className="add-fav-btn">
              <button onClick={() => dispatch(addRestaurant(item.restaurant))}>
                Add to Favs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
