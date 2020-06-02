import React from "react";

export const addComment = (comment) => {
  return {
    type: "ADD_COMMENT",
    payload: comment,
  };
};
export const deleteComment = (commentindex) => {
  return {
    type: "DELETE_COMMENT",
    payload: commentindex,
  };
};
export const addRestaurant = (restaurant) => {
  return {
    type: "ADD_RESTAURANT",
    payload: restaurant,
  };
};
export const discardRestaurant = (restaurantid) => {
  return {
    type: "DISCARD_RESTAURANT",
    payload: restaurantid,
  };
};
