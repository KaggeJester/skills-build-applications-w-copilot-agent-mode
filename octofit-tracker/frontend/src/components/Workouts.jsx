import { useState, useEffect } from 'react';
import { fetchFromApi } from '../utils/api';

// API endpoint: https://{codespace-name}-8000.app.github.dev/api/workouts

export const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchFromApi('workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: 'badge bg-success',
      intermediate: 'badge bg-info',
      advanced: 'badge bg-danger',
    };
    return badges[difficulty] || badges.intermediate;
  };

  const getTargetAreaBadge = (area) => {
    const badges = {
      'full-body': 'badge bg-primary',
      'upper-body': 'badge bg-info',
      'lower-body': 'badge bg-warning text-dark',
      cardio: 'badge bg-danger',
      core: 'badge bg-success',
    };
    return badges[area] || badges['full-body'];
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Workouts</h1>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">{workout.title}</h5>
                  {workout.recommended && (
                    <span className="badge bg-warning text-dark">⭐ Recommended</span>
                  )}
                </div>
                {workout.description && (
                  <p className="card-text">{workout.description}</p>
                )}
                <div className="mb-2">
                  <span className={getDifficultyBadge(workout.difficulty)}>
                    {workout.difficulty}
                  </span>
                  {workout.targetArea && (
                    <span className={`${getTargetAreaBadge(workout.targetArea)} ms-2`}>
                      {workout.targetArea}
                    </span>
                  )}
                </div>
                <p className="card-text">
                  <strong>Duration:</strong> {workout.duration} minutes
                </p>
                {workout.caloriesBurned && (
                  <p className="card-text">
                    <strong>Calories Burned:</strong> {workout.caloriesBurned} kcal
                  </p>
                )}
                {workout.exercises && workout.exercises.length > 0 && (
                  <div className="mt-2">
                    <strong>Exercises:</strong>
                    <ul className="list-unstyled ms-3 mt-1">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx} className="text-muted small">
                          {exercise.name}
                          {exercise.sets && ` - ${exercise.sets} sets`}
                          {exercise.reps && ` × ${exercise.reps} reps`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
