from typing import Optional
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class IncidentBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: str = "Medium"
    status: str = "Open"


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None


class IncidentResponse(IncidentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)