import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./ProfileHeader.css";

function ProfileHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <h3 className="header-title">Caritas Volunteers</h3>
      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
}

export default ProfileHeader;
