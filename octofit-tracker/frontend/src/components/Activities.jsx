import { useState, useEffect } from 'react';
import { fetchFromApi } from '../utils/api';

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchFromApi('activities');
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const getActivityBadge = (type) => {
    const badges = {
      running: 'badge bg-danger',
      cycling: 'badge bg-info',
      swimming: 'badge bg-primary',
      gym: 'badge bg-warning text-dark',
      walking: 'badge bg-success',
      other: 'badge bg-secondary',
    };
    return badges[type] || badges.other;
  };

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Activities</h1>
      <div className="row">
        {activities.map((activity) => (
          <div key={activity._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">
                    {typeof activity.userId === 'object'
                      ? activity.userId.username
                      : 'Unknown User'}
                  </h5>
                  <span className={getActivityBadge(activity.activityType)}>
                    {activity.activityType}
                  </span>
                </div>
                <p className="card-text">
                  <strong>Duration:</strong> {activity.duration} minutes
                </p>
                <p className="card-text">
                  <strong>Calories:</strong> {activity.calories || 'N/A'} kcal
                </p>
                {activity.distance && (
                  <p className="card-text">
                    <strong>Distance:</strong> {activity.distance} km
                  </p>
                )}
                <p className="card-text text-muted">
                  <small>
                    {activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}
                  </small>
                </p>
                {activity.teamId && (
                  <p className="card-text">
                    <strong>Team:</strong>{' '}
                    {typeof activity.teamId === 'object'
                      ? activity.teamId.name
                      : 'Team'}
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
