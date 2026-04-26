import { Outlet } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";

function Root() {
  return (
    <>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
