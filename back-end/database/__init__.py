from dotenv import load_dotenv
import os
from sqlmodel import Session, create_engine, SQLModel, select
from database.models.status import Status
from database.models.user import User # noqa: F401

# Load environment variables from .env file
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# We build connection string and tell to use psycopg2 driver to connect with DB
connection_string = f"postgresql+psycopg2://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

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