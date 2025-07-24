

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SessionManager.css";

export default function ManageResponses() {
  const { accessKey } = useParams();
  const [session, setSession] = useState(null);
  const [responses, setResponses] = useState([]);
  const [relationshipStats, setRelationshipStats] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sourabh/manage/${accessKey}`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setResponses(data.responses);

        const stats = {};
        data.responses.forEach((res) => {
          const rel = res.relationshipType;
          stats[rel] = (stats[rel] || 0) + 1;
        });
        setRelationshipStats(stats);
      });
  }, [accessKey]);

  return (
    <div className="manage-container">
      <div className="floating-leaves"></div>

      {/* Emoji Cloud on Top Right */}
      <div className="emoji-cloud">
        <span>😂</span>
        <span>😍</span>
        <span>🤔</span>
        <span>🥰</span>
        <span>😎</span>
      </div>

      {/* Relationship Summary on Right Side */}
      {Object.keys(relationshipStats).length > 0 && (
        <div className="relationship-stats-floating">
          <h3>👥 Responses by Relationship Type:</h3>
          <ul>
            {Object.entries(relationshipStats).map(([type, count]) => (
              <li key={type}>
                <strong>{type}:</strong> {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content Box */}
      <div className="content">
        {session ? (
          <>
            <h1>🌟 Responses for {session.name}</h1>
            <p className="session-desc">{session.description}</p>

            <div className="responses-list">
              {responses.length > 0 ? (
                responses.map((res) => (
                  <div key={res.id} className="response-card">
                    <div className="meta">
                      <span className="relation-tag">{res.relationshipType}</span>
                      <span className="timestamp">
                        {new Date(res.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="message">💬 {res.message}</p>
                  </div>
                ))
              ) : (
                <p>No responses yet 😢</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading session...</p>
        )}
      </div>

      {/* Home Link on Bottom Right */}
      <Link to="/" className="go-home-link">
        🏡 Go Back to Home
      </Link>
    </div>
  );
}


// mongodb+srv://sourabh_gorai001:<db_password>@cluster1.34uch1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
// mongodb+srv://sourabh_gorai001:<db_password>@cluster1.34uch1f.mongodb.net/