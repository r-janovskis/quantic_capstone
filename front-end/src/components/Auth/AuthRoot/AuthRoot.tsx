import { Outlet } from "react-router-dom";
import AuthHeader from "../../headers/AuthHeader/AuthHeader";

function Root() {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  );
}

export default Root;
