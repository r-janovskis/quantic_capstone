from sqlmodel import Session, select
from database import engine
from datetime import time

# Import tables that we are seeding values for
from database.models.skill import Skill
from database.models.language import Language
from database.models.country import Country
from database.models.shirt_size import ShirtSize
from database.models.interest import Interest
from database.models.day import Day
from database.models.time_period import TimePeriod


# Functions to seed tables with values
# These are pre-defined values we use in our forms in front-end
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


def seed_days():

    with Session(engine) as session:
        if session.exec(select(Day)).first():
            return
        session.add_all([
            Day(name="Monday"),
            Day(name="Tuesday"),
            Day(name="Wednesday"),
            Day(name="Thursday"),
            Day(name="Friday"),
            Day(name="Saturday"),
            Day(name="Sunday"),
        ])
        session.commit()


def seed_time_periods():

    with Session(engine) as session:
        if session.exec(select(TimePeriod)).first():
            return
        session.add_all([
            TimePeriod(name="Morning", start_time=time(8, 0), end_time=time(12, 0)),
            TimePeriod(name="Afternoon", start_time=time(13, 0), end_time=time(17, 0)),
            TimePeriod(name="Evening", start_time=time(18, 0), end_time=time(22, 0)),
            TimePeriod(name="Whole day", start_time=time(8, 0), end_time=time(22, 0)),
        ])
        session.commit()