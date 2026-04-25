import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import "./Header.css";

function Header() {
  return (
    <header>
      <h3>Caritas Volunteers</h3>
      <Nav id="navigation-bar" className="bg-body-tertiary">
        <NavLink to="auth/login">
          <Button variant="primary">Login</Button>
        </NavLink>
        <NavLink to="auth/signup">
          <Button variant="primary">Sign up</Button>
        </NavLink>
      </Nav>
    </header>
  );
}

export default Header;
