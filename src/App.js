import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import MyFavorites from "./Components/MyFavorites";
import About from "./Components/About";
import Restaurant from "./Components/Restaurant";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/myfavorites" exact component={MyFavorites} />
          <Route path="/about" exact component={About} />
          <Route path="/restaurants/:id" component={Restaurant} />

          <Route />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
