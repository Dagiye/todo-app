# Todo App

A production-style full-stack Todo application built with React, Express, PostgreSQL, and Docker.

## Overview

This project includes:
- A React frontend with a responsive UI
- An Express backend with REST API endpoints
- A PostgreSQL database with schema and seed data
- Docker support for running the complete stack locally

## Folder Structure

- frontend/ — Vite + React application
- backend/ — Express server and API routes
- database/ — SQL schema and seed scripts
- docker-compose.yml — Container orchestration for frontend, backend, and PostgreSQL

## Installation

### Local development

1. Start PostgreSQL locally or use Docker.
2. Create a database named todoapp.
3. Run the SQL scripts in database/schema.sql and database/seed.sql.
4. Install backend dependencies:
   - cd backend && npm install
5. Install frontend dependencies:
   - cd frontend && npm install
6. Start the backend:
   - cd backend && npm run dev
7. Start the frontend:
   - cd frontend && npm run dev

## Environment Variables

Create a .env file in the backend folder using .env.example as a template.

Required variables:
- PORT
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

## Docker

Run the full stack with:

```bash
sudo docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

## API

### Endpoints

- GET /todos
- GET /todos/:id
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

### Todo Shape

```json
{
  "id": 1,
  "title": "Write documentation",
  "completed": false,
  "created_at": "2026-07-05T00:00:00.000Z"
}
```

## Troubleshooting

- If the backend cannot connect to PostgreSQL, confirm the database is running and the environment variables are correct.
- If the frontend cannot reach the backend, ensure VITE_API_URL points to the correct backend host.
- If Docker containers fail to start, run docker compose logs to inspect the issue.

## Recommended Git Branches

- feature/frontend
- feature/backend
- feature/database
- feature/docker
