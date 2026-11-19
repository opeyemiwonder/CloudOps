from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text)

    severity = Column(String(20), default="Medium")

    status = Column(String(30), default="Open")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )