# FastAPI Backend for Keycloak Integration

This backend demonstrates how to secure REST APIs using **FastAPI**, **Keycloak**, and **JWT Token Validation**.

## Prerequisites

* Python 3.10+
* pip
* Virtual Environment (venv)
* Keycloak Server

Verify Python installation:

```bash
python --version
```

## Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

### macOS / Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn python-jose requests
```

Generate requirements file:

```bash
pip freeze > requirements.txt
```

## Project Structure

```text
backend/
│
├── app/
│   ├── auth/
│   ├── routers/
│   ├── services/
│   └── main.py
│
├── requirements.txt
└── venv/
```

## Running the Application

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

## API Documentation

FastAPI automatically generates interactive API documentation.

### Swagger UI

```text
http://localhost:8000/docs
```

### ReDoc

```text
http://localhost:8000/redoc
```

## Key Features

* JWT Token Validation
* Keycloak Integration
* Role-Based Access Control (RBAC)
* Protected APIs
* Dependency Injection
* Modular Project Structure
* Automatic API Documentation

## Technologies Used

### Backend

* FastAPI
* Uvicorn
* Python

### Authentication

* Keycloak
* JWT
* python-jose

### HTTP Client

* Requests

## Development Workflow

1. Start PostgreSQL and Keycloak.
2. Create Realm, Client, Roles, and Users in Keycloak.
3. Configure Keycloak settings in the FastAPI application.
4. Start the FastAPI server.
5. Obtain an access token from Keycloak.
6. Call protected APIs using the Bearer token.

## Learning Outcomes

By the end of this course, you will be able to:

* Build REST APIs using FastAPI
* Integrate Keycloak with FastAPI
* Validate JWT Access Tokens
* Implement Role-Based Authorization
* Secure Endpoints using Dependencies
* Structure FastAPI Applications for Production
* Connect React Frontends to Protected APIs
