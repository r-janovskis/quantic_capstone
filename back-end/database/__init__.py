from dotenv import load_dotenv
import os
from sqlmodel import Session, create_engine, SQLModel

# All the table imports are needed to make sure they aare created in DB
# And created in the right order
from database.models.status import Status # noqa: F401
from database.models.user import User # noqa: F401
from database.models.skill import Skill # noqa: F401
from database.models.language import Language # noqa: F401
from database.models.country import Country # noqa: F401
from database.models.shirt_size import ShirtSize # noqa: F401
from database.models.interest import Interest # noqa: F401
from database.models.volunteer import Volunteer # noqa: F401
from database.models.volunteer_skill import VolunteerSkill # noqa: F401
from database.models.volunteer_interest import VolunteerInterest # noqa: F401
from database.models.volunteer_language import VolunteerLanguage # noqa: F401

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

