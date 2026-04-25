import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <header>
      <h3>Caritas Volunteers</h3>
      <NavLink to="auth/login">
        <Button variant="primary">Login</Button>
      </NavLink>
      <NavLink to="auth/signup">
        <Button variant="primary">Sign up</Button>
      </NavLink>
    </header>
  );
}

export default Header;
