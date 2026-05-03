import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
from database.models.status import Status
from database.models.user import User # noqa: F401

TEST_DB_URL = "postgresql+psycopg2://test_user:test_password@localhost:5432/test_db"

test_engine = create_engine(TEST_DB_URL)

def override_get_session():
    with Session(test_engine) as session:
        yield session
    
@pytest.fixture(scope="session", autouse=True)
def setup_database():
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        session.add_all([Status(name="New"), Status(name="Active")])
        session.commit()
    yield
    SQLModel.metadata.drop_all(test_engine)

@pytest.fixture
def client():
    from main import app
    from database import get_session
    app.dependency_overrides[get_session] = override_get_session
    return TestClient(app)