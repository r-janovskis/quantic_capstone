from dotenv import load_dotenv
import os
from sqlmodel import Session, create_engine, SQLModel, select
from database.models.status import Status
from database.models.user import User # noqa: F401
from database.models.skill import Skill
from database.models.language import Language
from database.models.country import Country
from database.models.shirt_size import ShirtSize
from database.models.interest import Interest
from database.models.volunteer import Volunteer
from database.models.volunteer_skill import VolunteerSkill
from database.models.volunteer_interest import VolunteerInterest
from database.models.volunteer_language import VolunteerLanguage

# Load environment variables from .env file
load_dotenv()

# We build connection string and tell to use psycopg2 driver to connect with DB
connection_string = os.environ["DATABASE_URL"]

# Create connection to DB
engine = create_engine(connection_string)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def seed_statuses():

    with Session(engine) as session:
        # Check if populated table already exists
        if session.exec(select(Status)).first():
            return
        session.add_all([
            Status(name="New"),
            Status(name="Active"),
            Status(name="Inactive"),
            Status(name="Locked")
        ])
        session.commit()

def seed_skills():

    with Session(engine) as session:
        # Check if populated table already exists
        if session.exec(select(Skill)).first():
            return
        session.add_all([
            Skill(name="Driving (own vehicle)"),
            Skill(name="Cooking / food preparation"),
            Skill(name="Gardening / outdoor work"),
            Skill(name="Manual labour (moving, lifting, sorting)"),
            Skill(name="Handyman / basic repairs"),
            Skill(name="Cleaning"),
            Skill(name="Childcare experience"),
            Skill(name="Elderly care experience"),
            Skill(name="Working with people with disabilities"),
            Skill(name="Tutoring / teaching"),
            Skill(name="Mentoring"),
            Skill(name="Active listening / companionship"),
            Skill(name="IT / digital literacy support"),
            Skill(name="Administrative / office work"),
            Skill(name="Bookkeeping / accounting"),
            Skill(name="Legal knowledge"),
            Skill(name="Healthcare / medical background"),
            Skill(name="First aid certified"),
            Skill(name="Translation / interpretation"),
            Skill(name="Writing / editing"),
            Skill(name="Social media / communications"),
            Skill(name="Photography / videography"),
            Skill(name="Graphic design"),
            Skill(name="Event coordination"),
            Skill(name="Fundraising"),
            Skill(name="Public speaking"),
            Skill(name="Music"),
            Skill(name="Arts and crafts"),
            Skill(name="Sports coaching"), 
        ])
        session.commit()


def seed_interests():

    # Check if populated table already exists
    with Session(engine) as session:
        if session.exec(select(Interest)).first():
            return
        session.add_all([
            Interest(name="Elderly care & companionship"),
            Interest(name="Children & youth"),
            Interest(name="Homelessness & housing"),
            Interest(name="Food poverty & food banks"),
            Interest(name="Mental health support"),
            Interest(name="Disability support"),
            Interest(name="Education & literacy"),
            Interest(name="Refugee & asylum support"),
            Interest(name="Community outreach"),
            Interest(name="Environmental projects"),
            Interest(name="Fundraising & events"),
            Interest(name="Sports & recreation"),
        ])
        session.commit()

def seed_languages():

    with Session(engine) as session:
        # Check if populated table already exists
        if session.exec(select(Language)).first():
            return
        session.add_all([
            Language(name="English"),
            Language(name="French"),
            Language(name="Irish"),
            Language(name="Spanish"),
            Language(name="Portuguese"),
            Language(name="German"),
            Language(name="Polish"),
            Language(name="Lithuanian"),
            Language(name="Latvian"),
            Language(name="Italian"),
        ])
        session.commit()


def seed_countries():

    with Session(engine) as session:
        # Check if populated table already exists
        if session.exec(select(Country)).first():
            return
        session.add_all([
            Country(name="France"),
            Country(name="Ireland"),
            Country(name="Portugal"),
            Country(name="Spain"),
            Country(name="United Kingdom"),
        ])
        session.commit()


def seed_shirt_sizes():
    
    with Session(engine) as session:
        if session.exec(select(ShirtSize)).first():
            return
        session.add_all([
            ShirtSize(name="2XS"),
            ShirtSize(name="XS"),
            ShirtSize(name="S"),
            ShirtSize(name="M"),
            ShirtSize(name="L"),
            ShirtSize(name="XL"),
            ShirtSize(name="2XL"),
        ])
        session.commit()