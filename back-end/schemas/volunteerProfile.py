from database.models.volunteer import VolunteerPublic
from database.models.skill import SkillPublic
from database.models.interest import InterestPublic
from database.models.language import LanguagePublic
from schemas.availability import Availability

class VolunteerProfile(VolunteerPublic):
    skills: list[SkillPublic]
    interests: list[InterestPublic]
    languages: list[LanguagePublic]
    availability: list[Availability]