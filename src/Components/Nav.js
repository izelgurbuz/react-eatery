import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <nav>
      <ul className="nav-links">
        <NavLink style={navLinkStyle} to="/">
          <li>Home</li>
        </NavLink>
        <NavLink style={navLinkStyle} to="/myfavorites">
          <li>Favorites</li>
        </NavLink>
        <NavLink style={navLinkStyle} to="/about">
          <li>About</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
