import { useState, useEffect } from 'react';
import { fetchFromApi } from '../utils/api';

// API endpoint: https://{codespace-name}-8000.app.github.dev/api/teams

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchFromApi('teams');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <div className="mb-2">
                  <strong>Members:</strong> {team.members?.length || 0}
                  {team.members && team.members.length > 0 && (
                    <ul className="list-unstyled ms-3 mt-1">
                      {team.members.slice(0, 3).map((member, idx) => (
                        <li key={idx} className="text-muted small">
                          {typeof member === 'object' ? member.username : member}
                        </li>
                      ))}
                      {team.members.length > 3 && (
                        <li className="text-muted small">+{team.members.length - 3} more</li>
                      )}
                    </ul>
                  )}
                </div>
                {team.leader && (
                  <p className="card-text">
                    <strong>Leader:</strong>{' '}
                    {typeof team.leader === 'object'
                      ? team.leader.username
                      : team.leader}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
