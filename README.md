# FlowTrack - Smart Team Workflow Manager

FlowTrack is a MERN-style workflow app for small teams. Admins create workspaces, add members, create tasks, assign deadlines, and set priority. Members see assigned work and update status.

## Core Features

- JWT authentication with admin and member roles
- Workspace creation and member management
- Task creation, assignment, status updates, and deadline tracking
- Priority badges for low, medium, and high priority tasks
- Smart sorting: overdue tasks first, then high priority, then nearest deadline
- Deadline highlighting: red for overdue, yellow for near deadline
- Dashboard analytics for task totals, overdue work, near deadlines, and high-priority work

## Project Structure

```text
flowtrack/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
      utils/
      App.js
      index.js
```

## Local Setup

You can run commands from the project root:

```bash
cd flowtrack
npm run backend
npm run frontend
```

Use two terminals: one for the backend and one for the frontend.

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `backend/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/flowtrack
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Important: the backend will not start unless MongoDB is available. Either start local MongoDB on `mongodb://127.0.0.1:27017/flowtrack` or replace `MONGO_URI` with a MongoDB Atlas connection string.

If you see `Database connection failed: connect ECONNREFUSED 127.0.0.1:27017`, MongoDB is not running locally.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` from `frontend/.env.example` if the API URL changes.

```env
VITE_API_URL=http://localhost:5000/api
```

If Vite shows `spawn EPERM` for esbuild on Windows, run the terminal with normal filesystem permissions outside a restricted sandbox. A rebuild can also help:

```bash
cd frontend
npm rebuild esbuild
npm run dev
```

## Main API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/workspaces/:id`
- `POST /api/workspaces/:id/members`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id/status`
- `GET /api/tasks/analytics/summary`

## Demo Flow

1. Sign up as an admin.
2. Create a workspace.
3. Sign up member accounts.
4. Add members to the workspace by email.
5. Create tasks, choose assignee, priority, status, and deadline.
6. Sign in as a member to view assigned tasks and update status.

## Deployment Plan

- Backend: Railway
- Frontend: Vercel or Railway
- Database: MongoDB Atlas

For production, set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `VITE_API_URL` in the host dashboard.
