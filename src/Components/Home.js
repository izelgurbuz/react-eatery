import React, { useEffect } from "react";
import { useState } from "react";
import "../home.css";
import { useSelector, useDispatch } from "react-redux";
import { addRestaurant } from "../Redux/Actions";
import { NavLink } from "react-router-dom";
import dotenv from "dotenv";
import {
  FormGroup,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Image,
  Container,
  Jumbotron,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

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
      console.log(response.restaurants);
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

  const active = {
    fontWeight: "bold",
  };

  return (
    <div className="Home">
      <div className="Search">
        <Form
          className="d-flex justify-content-around search-group m-3 row"
          onSubmit={setSearchParams}
        >
          <FormGroup className="m-2 col-md-3  ">
            <Form.Control
              type="text"
              placeholder="Key"
              onChange={updateKey}
              value={keyword}
            />
          </FormGroup>
          <FormGroup className="m-2 col-md-3">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                value={city}
                onChange={updateCity}
                list="cities"
                placeholder="City"
                className="js-example-basic-single"
              />
              <datalist id="cities">
                {citySuggestions.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </datalist>
            </InputGroup>
          </FormGroup>

          <FormGroup
            className="m-2 col-md-3"
            style={
              citySuggestions.map((item) => item.name).includes(city)
                ? {}
                : { display: "none" }
            }
          >
            <Form.Control
              type="text"
              value={cuisine}
              onChange={updateCuisine}
              list="cuisines"
              placeholder="Cuisine"
            />
            <datalist id="cuisines">
              {cuisineSuggestions.map((item) => (
                <option key={item.id}>{item.cuisine.cuisine_name}</option>
              ))}
            </datalist>
          </FormGroup>

          <Button id="submit-button" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="flow row">
        {restaurants.map((item) => (
          <div key={item.restaurant.id} className="col-6 equal">
            <Jumbotron fluid>
              <Container className="m-3">
                <Row>
                  <Col xs={6} md={4}>
                    <NavLink
                      to={`/restaurants/${item.restaurant.id}`}
                      className="link-element"
                      activeStyle={active}
                    >
                      <Image src={item.restaurant.featured_image} fluid />
                    </NavLink>
                  </Col>
                  <Col xs={6} md={4}>
                    <Container>
                      <h3 style={{ textDecoration: "none" }}>
                        {item.restaurant.name}
                      </h3>
                      <p>{item.restaurant.timings}</p>
                      <p>
                        <Button
                          onClick={() =>
                            dispatch(addRestaurant(item.restaurant))
                          }
                        >
                          Add to Favs
                        </Button>
                      </p>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
