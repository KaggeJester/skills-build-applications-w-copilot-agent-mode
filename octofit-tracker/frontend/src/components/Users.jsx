import { useState, useEffect } from 'react';
import { fetchFromApi } from '../utils/api';

// API endpoint: https://{codespace-name}-8000.app.github.dev/api/users

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchFromApi('users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Users</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <img
                  src={user.profile?.avatar || 'https://via.placeholder.com/100'}
                  alt={user.username}
                  className="rounded-circle mb-2"
                  style={{ width: '60px', height: '60px' }}
                />
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                {user.profile?.firstName && (
                  <p className="card-text">
                    <strong>Name:</strong> {user.profile.firstName} {user.profile.lastName}
                  </p>
                )}
                <p className="card-text">
                  <strong>Teams:</strong> {user.teams?.length || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
