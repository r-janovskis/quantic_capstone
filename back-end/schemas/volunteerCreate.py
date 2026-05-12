from database.models.volunteer import VolunteerBase
from schemas.availability import Availability
from pydantic import field_validator
from datetime import date

class VolunteerCreate(VolunteerBase):
    country_id: int
    shirt_size_id: int
    skill_ids: list[int]
    interest_ids: list[int]
    language_ids: list[int]
    availability: list[Availability]

    @field_validator("date_of_birth")
    @classmethod
    def validate_age(cls, v: date) -> date:
        age = (date.today() - v).days / 365.25
        if age < 18:
            raise ValueError("You must be at least 18 years old to register!")
        return v
    # We are not doing any special field sanitazation/validation on the back end
    # React by default should block this.
    # We could use bleach package to sanitize input