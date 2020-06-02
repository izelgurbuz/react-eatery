import React from "react";

const FavoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESTAURANT":
      console.log([...state, action.payload]);
      return [...state, action.payload];
    case "DISCARD_RESTAURANT":
      return state;
    default:
      return state;
  }
};

export default FavoritesReducer;
