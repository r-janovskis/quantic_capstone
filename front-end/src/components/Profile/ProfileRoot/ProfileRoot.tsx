import { Outlet } from "react-router-dom";
import ProfileHeader from "../../headers/ProfileHeader/ProfileHeader";

function ProfileRoot() {
  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  );
}

export default ProfileRoot;
