from dotenv import load_dotenv
import os
from sqlmodel import Session, create_engine, SQLModel, select
from database.models.status import Status
from database.models.user import User # noqa: F401

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