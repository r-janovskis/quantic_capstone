import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

type Props = {
  name: string;
  avatar_url?: string;
};

function VolunteerHeaderDisplay({ name, avatar_url }: Props) {
  return (
    <Nav className="main-navigation-bar">
      <Navbar.Toggle aria-controls="user-dropdown" />
      {avatar_url && (
        <Navbar.Brand href="/volunteer/dashboard">
          <img src={avatar_url} alt="avatar" className="header-avatar" />
        </Navbar.Brand>
      )}

      <NavDropdown id="user-dropdown" title={name}>
        <NavDropdown.Item href="/volunteer/dashboard">
          Dashboard
        </NavDropdown.Item>
        <NavDropdown.Item href="/volunteer/me">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          className="logout-link"
          href="/"
          onClick={() => localStorage.removeItem("token")}
        >
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default VolunteerHeaderDisplay;
