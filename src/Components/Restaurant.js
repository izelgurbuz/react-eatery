import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addComment, deleteComment } from "../Redux/Actions";
import "../restaurant.css";
import dotenv from "dotenv";
import { Image, Container, Row, Col } from "react-bootstrap";

const Restaurant = () => {
  const MAIN_URL = `https://developers.zomato.com/api/v2.1/`;
  const USER_KEY = process.env.REACT_APP_USER_KEY;

  const [restaurant, setRestaurant] = useState({});
  const [comment, setComment] = useState({});
  const [text, setText] = useState("");
  const params = useParams();
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const fetchRestaurant = async () => {
    const data = await fetch(MAIN_URL + `restaurant?res_id=${params.id}`, {
      headers: {
        "user-key": USER_KEY,
      },
    });
    const response = await data.json();
    setRestaurant(response);
  };

  const sendComment = () => {
    const newComment = {
      restaurantId: restaurant.id,
      text: text,
      commentId: Math.round(Date.now() / 1000),
    };
    setComment(newComment);
    dispatch(addComment(newComment));
    console.log(comments);
    setText("");
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const UpdateText = (e) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <h2>{restaurant.name}</h2>
      <Row className="justify-content-between">
        <Col md={5} xs={12}>
          <div>
            <Image
              fluid
              style={{ height: "30rem" }}
              src={restaurant.featured_image}
            ></Image>
          </div>
        </Col>
        <Col md={5} xs={12}>
          {comments
            .filter((item) => item.restaurantId === params.id)
            .map((item) => (
              <div>
                <h6>{`${item.commentId}:`}</h6>
                <div className="comment-section">
                  <div className="">
                    <h5>{item.text}</h5>
                  </div>
                  <div>
                    <button
                      onClick={() => dispatch(deleteComment(item.commentId))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div>
            <input
              className="newComment"
              value={text}
              onChange={UpdateText}
            ></input>
            <button onClick={sendComment}>Send Comment</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Restaurant;
