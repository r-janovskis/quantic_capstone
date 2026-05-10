from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from auth import get_current_user_id
from database.models.volunteer import VolunteerBase, Volunteer
from database.repositories.volunteer_repo import create_volunteer, create_volunteer_skills, create_volunteer_languages, create_volunteer_interests

class VolunteerCreate(VolunteerBase):
    country_id: int
    shirt_size_id: int
    skill_ids: list[int]
    interest_ids: list[int]
    language_ids: list[int]

    # We are not doing any special field sanitazation/validation on the back end
    # React by default should block this.
    # We could use bleach package to sanitize input


router = APIRouter(prefix="/volunteer", tags=["volunteer"])

@router.post("/register", response_model=dict[str, str])
def volunteer_register(volunteer: VolunteerCreate, user_id: int = Depends(get_current_user_id), session: Session = Depends(get_session)):

    # We create a volunteer object that will be saved to database
    # We need to remove elements that will go into junction tables
    # And add in user_id that we retrieve from the token
    new_volunteer = Volunteer(
        **volunteer.model_dump(exclude={"skill_ids", "interest_ids", "language_ids"}),
        user_id=user_id
    )
    # Save new volunteer to database
    saved_volunteer = create_volunteer(session, new_volunteer)
    if saved_volunteer.id is None:
            raise HTTPException(status_code=500, detail="Something went wrong, please try again later")
    
    # Save his skills, interests and languages to database
    create_volunteer_skills(session, saved_volunteer.id, volunteer.skill_ids)
    create_volunteer_interests(session, saved_volunteer.id, volunteer.interest_ids)
    create_volunteer_languages(session, saved_volunteer.id, volunteer.language_ids)

    return {
        "status": "Success",
        "message": "Volunteer registered successfully!"
    }

