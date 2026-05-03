import { NavLink } from "react-router-dom";

import "./AuthHeader.css";

function AuthHeader() {
  return (
    <header>
      <NavLink to="/" className="header-title">
        Caritas Volunteers
      </NavLink>
    </header>
  );
}

export default AuthHeader;
