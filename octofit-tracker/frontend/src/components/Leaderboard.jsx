import { useState, useEffect } from 'react';
import { fetchFromApi } from '../utils/api';

// API endpoint: https://{codespace-name}-8000.app.github.dev/api/leaderboard

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchFromApi('leaderboard');
        const sorted = data.sort((a, b) => b.score - a.score);
        setLeaderboard(sorted);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Activities</th>
              <th>Total Duration</th>
              <th>Total Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry._id} className={idx < 3 ? 'table-warning' : ''}>
                <td>
                  <strong>
                    {getMedalEmoji(idx + 1)} #{idx + 1}
                  </strong>
                </td>
                <td>
                  {typeof entry.userId === 'object'
                    ? entry.userId.username
                    : 'Unknown'}
                </td>
                <td>
                  <strong className="text-primary">{entry.score}</strong>
                </td>
                <td>{entry.totalActivities}</td>
                <td>{entry.totalDuration} min</td>
                <td>{entry.totalCalories} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
