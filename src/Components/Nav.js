import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "../navbar.css";

const NavBar = () => {
  const active = {
    fontWeight: "bold",
  };

  return (
    <Navbar className="bg-light" expand="lg" variant="tabs">
      <Navbar.Brand href="#">EATERY</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav fill>
        <Nav.Item>
          <Nav.Link>
            <NavLink activeStyle={active} className="nav-element" to="/">
              Home
            </NavLink>{" "}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <NavLink
              activeStyle={active}
              className="nav-element"
              to="/myfavorites"
            >
              Favorites
            </NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <NavLink activeStyle={active} className="nav-element" to="/about">
              About
            </NavLink>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
