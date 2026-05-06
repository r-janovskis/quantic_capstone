from dotenv import load_dotenv
import os
from sqlmodel import Session, create_engine, SQLModel, select
from database.models.status import Status
from database.models.user import User # noqa: F401
from database.models.skill import Skill

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
            Skill(name="First aid certifiied"),
            Skill(name="Translation / interpretation"),
            Skill(name="Writing /editing"),
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