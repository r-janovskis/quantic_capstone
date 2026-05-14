from pydantic import BaseModel, ConfigDict

class Availability(BaseModel):
    model_config = ConfigDict(frozen=True)
    day_id: int
    time_period_id: int