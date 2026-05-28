import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getLeaderboard();
        setLeaders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      }
    };

    load();
  }, []);

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Volunteer / NGO Leaderboard</h1>
        <p className="page-subtitle">Top helpers based on deliveries and people served</p>

        <div className="list-grid">
          {leaders.length === 0 ? (
            <p className="empty-state">No completed deliveries yet</p>
          ) : (
            leaders.map((leader, index) => (
              <div className="list-card" key={leader._id?._id || index}>
                <h3>#{index + 1} {leader._id?.name}</h3>
                <div className="info-line"><strong>Role:</strong> {leader._id?.role}</div>
                <div className="info-line"><strong>Email:</strong> {leader._id?.email}</div>
                <div className="info-line"><strong>Deliveries:</strong> {leader.deliveries}</div>
                <div className="info-line"><strong>People Served:</strong> {leader.peopleServed}</div>
                <div className="info-line"><strong>Average Rating:</strong> {Number(leader.avgRating || 0).toFixed(1)}/5</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;