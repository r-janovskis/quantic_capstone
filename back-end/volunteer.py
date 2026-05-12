from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session
from datetime import date
from database import get_session
from dependencies import get_current_user_id
from schemas.volunteerCreate import VolunteerCreate
from database.models.volunteer import Volunteer
from database.repositories.volunteer_repo import create_volunteer, create_volunteer_skills, create_volunteer_languages, create_volunteer_interests, create_volunteer_availability, get_volunteer_by_user_id, update_volunteer_avatar
from PIL import Image
import io
import os



router = APIRouter(prefix="/volunteer", tags=["volunteer"])

@router.post("/register", response_model=dict[str, str])
def volunteer_register(volunteer: VolunteerCreate, user_id: int = Depends(get_current_user_id), session: Session = Depends(get_session)):

    if get_volunteer_by_user_id(session, user_id):
        return {
            "status": "Error",
            "message": "You already have a volunteer profile!"
        }
    # We create a volunteer object that will be saved to database
    # We need to remove elements that will go into junction tables
    # And add in user_id that we retrieve from the token
    new_volunteer = Volunteer(
        **volunteer.model_dump(exclude={"skill_ids", "interest_ids", "language_ids", "availability"}),
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
    create_volunteer_availability(session, saved_volunteer.id, volunteer.availability)

    return {
        "status": "Success",
        "message": "Volunteer registered successfully!"
    }

@router.post("/avatar", response_model=dict[str, str])
def volunteer_avatar(file: UploadFile = File(...), user_id: int = Depends(get_current_user_id), session: Session = Depends(get_session)):

    ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="File must be an image (jpeg, png, or webp)")

    volunteer = get_volunteer_by_user_id(session, user_id)
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer profile not found")
    
    ext = file.content_type.split("/")[1] # image/jpeg -> jpeg
    save_dir = "../uploads/avatars/volunteers"
    os.makedirs(save_dir, exist_ok=True)
    file_path = f"{save_dir}/{volunteer.id}.{ext}"

    # We save avatar image using Pillow package
    # And resize it to be just a bit bigger than avatar preview window 200x200
    image = Image.open(io.BytesIO(file.file.read()))
    image.thumbnail((200, 200))
    image.save(file_path)

    update_volunteer_avatar(session, volunteer, file_path)

    return {
        "status": "Success",
        "message": "Avatar uploaded successfully!"
    }