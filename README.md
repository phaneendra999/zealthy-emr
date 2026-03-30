# Mini EMR & Patient Portal

A full-stack application with an admin EMR interface and a patient-facing portal.

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Java Spring Boot
- **Database:** PostgreSQL

## Project Structure

```
/
├── backend/       Spring Boot REST API
├── frontend/      React application
└── db/            SQL seed script
```

## Setup

### Database

Run the seed script against a PostgreSQL instance:

```bash
psql -U postgres -f db/init.sql
```

Update `backend/src/main/resources/application.properties` with your DB credentials.

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080`

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

## Usage

- **Patient Portal:** `http://localhost:3000` — login with seeded credentials
- **Admin EMR:** `http://localhost:3000/admin` — no login required

## Seeded Credentials

| Name | Email | Password |
|------|-------|----------|
| Mark Johnson | mark@some-email-provider.net | Password123! |
| Lisa Smith | lisa@some-email-provider.net | Password123! |
