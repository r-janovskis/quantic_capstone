import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import "./Header.css";

function Header() {
  return (
    <header>
      <p className="header-title">Caritas Volunteers</p>
      <Nav className="main-navigation-bar">
        <NavLink to="auth/login">
          <Button variant="primary">Login</Button>
        </NavLink>
        <p className="divider-line">/</p>
        <NavLink className="signup-link" to="auth/signup">
          Sign up
        </NavLink>
      </Nav>
    </header>
  );
}

export default Header;
