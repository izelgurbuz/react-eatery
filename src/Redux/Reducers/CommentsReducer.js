import React from "react";

const CommentsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "DELETE_COMMENT":
      return state.filter((item) => item.commentId !== action.payload);
    default:
      return state;
  }
};
export default CommentsReducer;
