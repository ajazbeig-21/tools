# Keycloak React + FastAPI Course

This project demonstrates authentication and authorization using **Keycloak**, **React (Vite)**, and **FastAPI**.

## Prerequisites

* Node.js **v22.12.0+** (or **v20.19.0+**)
* npm
* Docker & Docker Compose
* Python 3.10+

Verify your Node.js version:

```bash
node -v
```

## Frontend Setup

Install dependencies:

```bash
npm install
npm install react-router-dom axios keycloak-js
```

Start the development server:

```bash
npm run dev
```

The React application will be available at:

```text
http://localhost:5173
```

## Project Structure

```text
src/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Admin.jsx
│   └── Profile.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleGuard.jsx
│
├── services/
│   ├── api.js
│   └── keycloak.js
│
├── App.jsx
└── main.jsx
```

## Key Features

* Keycloak Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* React Router Integration
* Axios API Integration
* FastAPI Backend Security
* Access Token Management

## Technologies Used

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Keycloak JS

### Backend

* FastAPI
* Python
* JWT Authentication

### Identity Provider

* Keycloak

## Development Workflow

1. Start PostgreSQL and Keycloak using Docker Compose.
2. Configure a Realm, Client, Roles, and Users in Keycloak.
3. Start the FastAPI backend.
4. Start the React frontend.
5. Login using Keycloak.
6. Access protected pages based on assigned roles.

## Learning Outcomes

By the end of this course, you will be able to:

* Configure Keycloak from scratch
* Integrate Keycloak with React
* Secure FastAPI APIs using JWT tokens
* Implement role-based access control
* Protect frontend routes
* Consume secured APIs using Axios
* Build production-ready authentication flows
