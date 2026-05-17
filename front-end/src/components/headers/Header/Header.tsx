import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import volunteerServices from "../../../services/volunteerAPI";
import { getTokenRole } from "../../../utils/token";
import { ROLES } from "../../../constants/roles";
import { useHeaderRefresh } from "../../../context/HeaderContext";
import VolunteerHeaderDisplay from "../VolunteerHeaderNav/VolunteerHeaderNav";

import "./Header.css";

function Header() {
  const [userDisplay, setUserDisplay] = useState<{
    role: string;
    name: string;
    avatar_url?: string;
  } | null>(null);

  const { refreshKey } = useHeaderRefresh();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const role = getTokenRole(token);
    // If the user is a volunteer or an organiser
    // we want to display their name and avatar in the top-right corner
    // So we set state and gather role too (as drop-down options might be different for each role)
    if (role === ROLES.VOLUNTEER || role === ROLES.ORGANISER) {
      volunteerServices
        .getProfile(token)
        .then((response) => {
          setUserDisplay({
            role: role,
            name: response.display_name,
            avatar_url: response.avatar_url,
          });
        })
        .catch(() => {
          // token is expired or invalid. we stay as guests
          localStorage.removeItem("token");
        });
    }
  }, [refreshKey]);

  return (
    <header>
      <NavLink to="/" className="header-title">
        Caritas Volunteers
      </NavLink>
      {!userDisplay ? (
        <Nav className="main-navigation-bar">
          <NavLink to="/auth/login">
            <Button variant="primary">Login</Button>
          </NavLink>
          <p className="divider-line">/</p>
          <NavLink className="signup-link" to="/auth/signup">
            Sign up
          </NavLink>
        </Nav>
      ) : userDisplay.role === ROLES.VOLUNTEER ? (
        <VolunteerHeaderDisplay
          name={userDisplay.name}
          avatar_url={userDisplay.avatar_url}
        />
      ) : (
        <p>Here we will have component OrganiserHeaderDisplay</p>
      )}
    </header>
  );
}

export default Header;
