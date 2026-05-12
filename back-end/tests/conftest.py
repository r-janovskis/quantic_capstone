import pytest
from datetime import time
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
from database.models.status import Status
from database.models.user import User # noqa: F401
from database.models.skill import Skill 
from database.models.country import Country
from database.models.shirt_size import ShirtSize
from database.models.interest import Interest
from database.models.language import Language
from database.models.day import Day
from database.models.time_period import TimePeriod
from database.models.volunteer import Volunteer # noqa: F401
from database.models.volunteer_skill import VolunteerSkill # noqa: F401
from database.models.volunteer_interest import VolunteerInterest # noqa: F401
from database.models.volunteer_language import VolunteerLanguage # noqa: F401
from database.models.volunteer_availability import VolunteerAvailability # noqa: F401


TEST_DB_URL = "postgresql+psycopg2://test_user:test_password@localhost:5432/test_db"

test_engine = create_engine(TEST_DB_URL)

def override_get_session():
    with Session(test_engine) as session:
        yield session
    
@pytest.fixture(scope="session", autouse=True)
def setup_database():
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        session.add_all([
            Status(name="New"), Status(name="Active"),
            Country(name="Ireland"), 
            ShirtSize(name="M"), 
            Skill(name="Driving"),
            Interest(name="Elderly care & companionship"),
            Language(name="English"),
            Day(name="Monday"),
            TimePeriod(name="Morning", start_time=time(8, 0), end_time=time(12, 0)),
        ])
        session.commit()
    yield
    SQLModel.metadata.drop_all(test_engine)

@pytest.fixture
def client():
    from main import app
    from database import get_session
    app.dependency_overrides[get_session] = override_get_session
    return TestClient(app)