from pydantic import BaseModel

class Availability(BaseModel):
    day_id: int
    time_period_id: int