import React from "react";
import { useSelector } from "react-redux";
import "../myfavorites.css";
import { Link } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";

const MyFavorites = () => {
  const favs = useSelector((state) => state.favorites);
  console.log(favs);

  return (
    <div>
      <Container>
        <Row>
          {favs.map((item) => (
            <Col md={4}>
              <Link to={`/restaurants/${item.id}`}>
                <div>
                  <h3>{item.name}</h3>
                  <Image fluid src={item.featured_image}></Image>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyFavorites;
