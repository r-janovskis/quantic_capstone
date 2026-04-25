import React from "react";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <header>
      <h3>Caritas Volunteers</h3>
      <Button variant="primary">Login</Button>
      <Button variant="primary">Sign up</Button>
    </header>
  );
}

export default Header;
