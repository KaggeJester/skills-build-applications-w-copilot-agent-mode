# OctoFit Tracker API Configuration Guide

## Backend Configuration

### Server Port
- **Port**: 8000

### URL Configuration

The API automatically detects and configures the appropriate base URL:

#### Codespaces Environment
```bash
# Environment Variable
CODESPACE_NAME=<your-codespace-name>

# Generated URL
https://${CODESPACE_NAME}-8000.app.github.dev
```

#### Localhost Environment
```bash
# When CODESPACE_NAME is not set
http://localhost:8000
```

### Configuration Code
Located in [`src/index.ts`](src/index.ts#L16-L19):

```typescript
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
```

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/api/health
```

Response includes both the status and the configured API base URL:
```json
{
  "status": "OK",
  "message": "OctoFit Tracker API is running",
  "apiUrl": "http://localhost:8000"
}
```

### Users Endpoint
```bash
curl http://localhost:8000/api/users
```

Retrieves all users (passwords excluded for security).

### Activities Endpoint
```bash
curl http://localhost:8000/api/activities
```

Retrieves all activities with populated user and team data.

### Other Endpoints
- `/api/teams` - Team management
- `/api/leaderboard` - Competitive rankings
- `/api/workouts` - Workout suggestions

## Starting the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm run start
```

### Database Seeding
```bash
npm run seed
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CODESPACE_NAME` | Automatically set in GitHub Codespaces | No |
| `MONGODB_URI` | MongoDB connection string | No (defaults to localhost:27017) |

## Testing Configuration

### Test in Codespaces
```bash
# The API will automatically detect and use:
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/health
```

### Test Locally
```bash
# The API will fall back to localhost:
curl http://localhost:8000/api/health
```

## Verified Endpoints

✅ `/api/health` - Returns API status and base URL
✅ `/api/users` - Returns 5 test users
✅ `/api/activities` - Returns 7 test activities with populated references
✅ `/api/teams` - Team management
✅ `/api/leaderboard` - Leaderboard entries
✅ `/api/workouts` - Workout library

## Build Status
- ✅ TypeScript compiles without errors
- ✅ All routes registered and functional
- ✅ MongoDB connection established
- ✅ Codespaces URL auto-detection working
- ✅ API responding to curl requests
