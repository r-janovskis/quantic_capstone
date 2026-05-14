import { NavLink } from "react-router-dom";

function VolunteerDashboard() {
  return (
    <div>
      <h1>Volunteer Dashboard</h1>
      <NavLink to="/volunteer/me">My Profile</NavLink>
      <NavLink to="/">Home page</NavLink>
    </div>
  );
}

export default VolunteerDashboard;
