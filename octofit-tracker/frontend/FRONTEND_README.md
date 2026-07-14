# OctoFit Tracker Frontend - React 19 with Vite

## Project Structure

```
octofit-tracker/frontend/
├── src/
│   ├── components/
│   │   ├── Users.jsx          - Display all users with profiles
│   │   ├── Teams.jsx          - Display teams and members
│   │   ├── Activities.jsx     - Display user activities
│   │   ├── Leaderboard.jsx    - Display competitive rankings
│   │   └── Workouts.jsx       - Display workout library
│   ├── utils/
│   │   └── api.js             - API configuration and utilities
│   ├── App.jsx                - Main application with routing
│   ├── main.jsx               - Entry point with Bootstrap CSS
│   ├── App.css                - Application styles
│   ├── index.css              - Global styles
│   └── assets/                - Images and icons
├── .env.local.example         - Environment configuration example
├── package.json               - Dependencies and scripts
├── vite.config.js             - Vite configuration
└── index.html                 - HTML template
```

## Key Features

### 1. React Router DOM Navigation

All components are accessible via routing:
- `/` - Home page with API URL information
- `/users` - User profiles and management
- `/teams` - Team listings and membership
- `/activities` - Activity tracking
- `/leaderboard` - Competitive rankings
- `/workouts` - Workout suggestions

Navigation bar with responsive Bootstrap menu.

### 2. Codespaces-Aware API Configuration

**File**: `src/utils/api.js`

The frontend automatically detects and uses the appropriate API endpoint:

```javascript
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

if (codespaceName && codespaceName !== 'undefined') {
  return `https://${codespaceName}-8000.app.github.dev/api`;
}

// Fallback to localhost
return 'http://localhost:8000/api';
```

**Environment Variable**:
- `VITE_CODESPACE_NAME` - Set automatically in GitHub Codespaces
- Can be defined in `.env.local` for local testing
- Safe fallback if undefined (prevents `https://undefined-8000...` URLs)

### 3. API Integration

**Utility Function**: `fetchFromApi(endpoint)`

Features:
- Handles both array and paginated responses
- Compatible with different data structures
- Error handling with user-friendly messages
- Loading states for each component

Supported response formats:
```javascript
// Direct array
[{...}, {...}]

// Paginated (data property)
{ data: [{...}, {...}] }

// Paginated (results property)
{ results: [{...}, {...}] }
```

### 4. Component Features

#### Users Component
- Displays all users with profiles
- Shows avatars, names, emails, and teams
- Profile information from user objects

#### Teams Component
- Lists all teams with descriptions
- Shows team members (limited to 3 with count)
- Displays team leader information
- Member count and relationships

#### Activities Component
- Activity type badges (running, cycling, swimming, etc.)
- Duration, calories, and distance tracking
- Associated user and team information
- Date formatting

#### Leaderboard Component
- Sorted by score (highest first)
- Medal emojis for top 3 rankings
- Total activities, duration, and calories
- Responsive table layout

#### Workouts Component
- Difficulty levels (beginner, intermediate, advanced)
- Target areas (full-body, cardio, core, etc.)
- Exercise lists with sets and reps
- Recommended badge system

### 5. Styling

- **Bootstrap 5** - Responsive grid layout and components
- **Responsive Navigation** - Hamburger menu on mobile
- **Card-based UI** - Consistent card design across components
- **Badge System** - Color-coded activity and difficulty levels

## Development

### Install Dependencies
```bash
cd octofit-tracker/frontend
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:5173
```

### Production Build
```bash
npm run build
# Output in dist/ directory
```

### Linting
```bash
npm run lint
```

## Environment Configuration

### For Codespaces Development

The `VITE_CODESPACE_NAME` is automatically set by GitHub.

### For Local Development

Create `.env.local` file:
```
VITE_CODESPACE_NAME=optional-codespace-name
```

Or leave unset to use `http://localhost:8000/api`.

## API Endpoints Used

The frontend communicates with the backend API on port 8000:

- `GET /api/users` - Fetch all users
- `GET /api/teams` - Fetch all teams
- `GET /api/activities` - Fetch all activities
- `GET /api/leaderboard` - Fetch leaderboard rankings
- `GET /api/workouts` - Fetch workout library

All endpoints return populated objects with references (users, teams, etc.).

## Dependencies

- **React 19.2.7** - UI library
- **React Router DOM** - Client-side routing
- **Vite 8.1.1** - Build tool
- **Bootstrap 5** - CSS framework
- **Oxlint** - Linting

## Build Output

```
dist/
├── index.html           (0.45 kB)
├── assets/
│   ├── index-*.css      (234.16 kB → 32.21 kB gzipped)
│   └── index-*.js       (242.92 kB → 76.61 kB gzipped)
```

## Troubleshooting

### API Endpoints Not Loading

1. Check backend is running on port 8000
2. Verify `VITE_CODESPACE_NAME` is set correctly
3. Check browser console for CORS errors
4. Verify API endpoints are accessible:
   ```bash
   curl http://localhost:8000/api/health
   ```

### Undefined URLs in API Calls

1. Clear `.env.local` or set `VITE_CODESPACE_NAME` correctly
2. Restart dev server: `npm run dev`
3. Clear browser cache
4. Check `import.meta.env.VITE_CODESPACE_NAME` in browser console

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Then rebuild
npm run build
```

## Integration with Backend

Both services must run simultaneously:

**Terminal 1 - Backend**:
```bash
cd octofit-tracker/backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd octofit-tracker/frontend
npm run dev
```

- Backend: http://localhost:8000 (or Codespaces URL)
- Frontend: http://localhost:5173 (or Codespaces URL)
