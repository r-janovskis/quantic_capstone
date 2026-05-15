import { ROLES } from "../constants/roles";

function getRoleHomePath(role: string | null): string {
  switch (role) {
    case ROLES.NEW_USER:
      return "/profile/create";
    case ROLES.VOLUNTEER:
      return "/volunteer/dashboard";
    case ROLES.ORGANISER:
      return "/organiser/dashboard";
    default:
      return "/";
  }
}

export { getRoleHomePath };
