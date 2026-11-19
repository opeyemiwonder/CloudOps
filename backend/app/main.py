# Imports
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app import models, schemas

Base.metadata.create_all(bind=engine)

#2. Initialize
app = FastAPI(title="CloudOps Incident Manager")

# 3. Prometheus instrumentation
Instrumentator().instrument(app).expose(
    app,
    endpoint="/metrics"
)
# 4. CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. API routes
@app.get("/")
def home():
    return {"message": "CloudOps API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/incidents", response_model=list[schemas.IncidentResponse])
def get_incidents(db: Session = Depends(get_db)):
    return db.query(models.Incident).all()


@app.post("/incidents", response_model=schemas.IncidentResponse)
def create_incident(
    incident: schemas.IncidentCreate,
    db: Session = Depends(get_db)
):
    new_incident = models.Incident(**incident.model_dump())

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident


@app.patch("/incidents/{incident_id}")
def update_incident(
    incident_id: int,
    update: schemas.IncidentUpdate,
    db: Session = Depends(get_db)
):
    incident = db.query(models.Incident).filter(
        models.Incident.id == incident_id
    ).first()

    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    incident.status = update.status

    db.commit()

    return {"message": "Incident updated successfully"}


@app.delete("/incidents/{incident_id}")
def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db)
):
    incident = db.query(models.Incident).filter(
        models.Incident.id == incident_id
    ).first()

    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    db.delete(incident)
    db.commit()

    return {"message": "Incident deleted successfully"}