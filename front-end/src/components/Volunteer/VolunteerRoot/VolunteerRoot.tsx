import { Outlet } from "react-router-dom";
import Header from "../../headers/Header/Header";
import { HeaderProvider } from "../../../context/HeaderContext";

function VolunteerRoot() {
  return (
    <HeaderProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </HeaderProvider>
  );
}

export default VolunteerRoot;
