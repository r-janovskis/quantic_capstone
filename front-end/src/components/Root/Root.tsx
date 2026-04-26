import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Root() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
