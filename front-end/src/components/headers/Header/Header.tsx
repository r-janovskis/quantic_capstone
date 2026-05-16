import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import volunteerServices from "../../../services/volunteerAPI";
import { getTokenRole } from "../../../utils/token";
import { ROLES } from "../../../constants/roles";

import "./Header.css";

function Header() {
  const [userDisplay, setUserDisplay] = useState<{
    name: string;
    avatar_url?: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const role = getTokenRole(token);
    if (role === ROLES.VOLUNTEER) {
      volunteerServices
        .getProfile(token)
        .then((response) => {
          setUserDisplay({
            name: response.display_name,
            avatar_url: response.avatar_url,
          });
        })
        .catch(() => {
          // token is expired or invalid. we stay as guests
          localStorage.removeItem("token");
        });
    }
    // When we have organisers set up we will have another if or expanded
    // if/else block to handle organisers
  }, []);

  return (
    <header>
      <NavLink to="/" className="header-title">
        Caritas Volunteers
      </NavLink>
      {userDisplay ? (
        <Nav className="main-navigation-bar">
          <Navbar.Toggle aria-controls="user-dropdown" />
          {userDisplay.avatar_url && (
            <Navbar.Brand href="/volunteer/dashboard">
              <img
                src={userDisplay.avatar_url}
                alt="avatar"
                className="header-avatar"
              />
            </Navbar.Brand>
          )}

          <NavDropdown id="user-dropdown" title={userDisplay.name}>
            {/* <span className="header-display-name">{userDisplay.name}</span> */}
            <NavDropdown.Item href="/volunteer/dashboard">
              Dashboard
            </NavDropdown.Item>
            <NavDropdown.Item href="/volunteer/me">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/"
              onClick={() => localStorage.removeItem("token")}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <Nav className="main-navigation-bar">
          <NavLink to="/auth/login">
            <Button variant="primary">Login</Button>
          </NavLink>
          <p className="divider-line">/</p>
          <NavLink className="signup-link" to="/auth/signup">
            Sign up
          </NavLink>
        </Nav>
      )}
    </header>
  );
}

export default Header;
