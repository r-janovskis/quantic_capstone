# Quantic Capstone

## Overview

In our capstone project we will be creating a Caritas-style volunteer portal. Volunteers can register and indicate their skills and availability for that heartwarming work of helping others. Organisations can create their own projects adding some description about their mission and attempts to make a world a better place. They can also create their events and send invitations to volunteers that seem good candidates for the roles that they need. Volunteers themselves have ability to browse available events/shifts and apply to them.

On the administrative/tracking side of things organisations have ability to see their scheduled events and get notified when under-manned event is approaching. They can also mark the volunteer attendance and flag out the ones who sign up but don't show up in the end. Volunteers will experience similar features - they will have dashboards with upcomming shifts and they will be able to see their event history.

In the later stages we plan to add AI-assistant that can suggest volunteers to event organisers based on the skills and availability indicated by volunteers. AI-assistance will be limited to suggestions only without ability to assign volunteers to events, that will be up to organisers to decide if suggested people suit their needs.

## Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL 14+

## How it works

The app is split into two independently running services:

- **Back-end** — a FastAPI REST API backed by a PostgreSQL database via SQLModel. On startup it creates all tables and seeds the `statuses` lookup table. Authentication is handled with JWT tokens.
- **Front-end** — a React + TypeScript SPA built with Vite. It communicates with the back-end API and uses JWT tokens stored in `localStorage` to protect routes.

## Setup and launch

### Back-end

1. Create and activate a virtual environment:
   ```bash
   cd back-end
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # macOS/Linux
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `back-end` directory:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`.

### Front-end

1. Install dependencies:
   ```bash
   cd front-end
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Running tests

The back-end tests require a dedicated PostgreSQL test database:

```sql
CREATE USER test_user WITH PASSWORD 'test_password';
CREATE DATABASE test_db OWNER test_user;
```

Then from the `back-end` directory:

```bash
pytest tests/
```
