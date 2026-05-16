import { Outlet } from "react-router-dom";
import Header from "../../headers/Header/Header";

function VolunteerRoot() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default VolunteerRoot;
