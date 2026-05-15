from enum import Enum

class Role(str, Enum):
    ORGANISER = "organiser"
    VOLUNTEER = "volunteer"
    NEW_USER = "new_user"

    