import { useEffect, useState } from "react";
import "./App.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Medium");

  async function loadIncidents() {
    const response = await fetch(`${API_URL}/incidents`);
    const data = await response.json();
    setIncidents(data);
  }

  async function createIncident(e) {
    e.preventDefault();

    if (!title.trim()) return;

    await fetch(`${API_URL}/incidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        severity
      })
    });

    setTitle("");
    setDescription("");
    setSeverity("Medium");

    loadIncidents();
  }

  async function updateIncident(id, status) {
    await fetch(`${API_URL}/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    loadIncidents();
  }

  async function deleteIncident(id) {
    await fetch(`${API_URL}/incidents/${id}`, {
      method: "DELETE"
    });

    loadIncidents();
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>CloudOps</h1>
        <p>Incident Management Platform</p>
      </header>

      <section className="stats">
        <div>
          <h2>{incidents.length}</h2>
          <p>Total Incidents</p>
        </div>

        <div>
          <h2>
            {incidents.filter(i => i.status === "Open").length}
          </h2>
          <p>Open Incidents</p>
        </div>

        <div>
          <h2>
            {incidents.filter(i => i.status === "Resolved").length}
          </h2>
          <p>Resolved Incidents</p>
        </div>
      </section>

      <section className="form-section">
        <h2>Create Incident</h2>

        <form onSubmit={createIncident}>
          <input
            placeholder="Incident title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Incident description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <select
            value={severity}
            onChange={e => setSeverity(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button type="submit">Create Incident</button>
        </form>
      </section>

      <section>
        <h2>Incident History</h2>

        {incidents.map(incident => (
          <div className="incident" key={incident.id}>
            <div>
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <small>
                Severity: {incident.severity} |
                Status: {incident.status}
              </small>
            </div>

            <div className="actions">
              <button
                onClick={() => updateIncident(
                  incident.id,
                  "Resolved"
                )}
              >
                Resolve
              </button>

              <button
                className="delete"
                onClick={() => deleteIncident(incident.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;