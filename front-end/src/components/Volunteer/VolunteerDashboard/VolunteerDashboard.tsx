import { NavLink } from "react-router-dom";

function VolunteerDashboard() {
  return (
    <div>
      <h1>Volunteer Dashboard</h1>
      <section>
        <h2> My upcoming events/shifts</h2>
        <p> A list or cards of upcoming events I have signed up to</p>
        <p> Still to do</p>
      </section>
      <section>
        <h2> My event history</h2>
        <p> You have not participated at any events yet...</p>
        <p> Still to do</p>
      </section>
      <section>
        <h2> What else could we put in here?</h2>
        <p> You have not participated at any events yet...</p>
        <p> Still to do</p>
        <NavLink to="/volunteer/me">My Profile</NavLink>
      </section>
    </div>
  );
}

export default VolunteerDashboard;
