import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from './components/Users';
import { Teams } from './components/Teams';
import { Activities } from './components/Activities';
import { Leaderboard } from './components/Leaderboard';
import { Workouts } from './components/Workouts';
import { API_BASE_URL } from './utils/api';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🏋️ OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-5 text-center">
              <h1>Welcome to OctoFit Tracker</h1>
              <p className="lead">Your personal fitness tracking application</p>
              <div className="alert alert-info mt-4">
                <strong>API Base URL:</strong> <code>{API_BASE_URL}</code>
              </div>
              <p className="text-muted">
                Use the navigation bar to explore users, teams, activities, leaderboards, and workouts.
              </p>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>

      <footer className="bg-light text-center py-3 mt-5">
        <p className="text-muted">
          OctoFit Tracker &copy; 2026 • Powered by React & Express
        </p>
      </footer>
    </Router>
  );
}

export default App;
