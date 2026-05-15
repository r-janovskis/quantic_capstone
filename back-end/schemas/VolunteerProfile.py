from database.models.volunteer import VolunteerPublic
from schemas.availability import Availability

class VolunteerProfile(VolunteerPublic):
    skill_ids: list[int]
    interest_ids: list[int]
    language_ids: list[int]
    availability: list[Availability]