import React from "react";
import { combineReducers } from "redux";
import FavoritesReducer from "./FavoritesReducer";
import CommentsReducer from "./CommentsReducer";

const CombinedReducers = combineReducers({
  favorites: FavoritesReducer,
  comments: CommentsReducer,
});

export default CombinedReducers;
