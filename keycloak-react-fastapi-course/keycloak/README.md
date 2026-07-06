# Keycloak & PostgreSQL Setup with Docker Compose

This project uses **Docker Compose** to provision a complete Keycloak environment backed by PostgreSQL.

## Prerequisites

* Docker 24+
* Docker Compose
* 4 GB RAM minimum
* Ports `8080` and `5432` available

Verify your installation:

```bash
docker --version
docker compose version
```

## Project Structure

```text
keycloak/
│
├── docker-compose.yml
└── README.md
```

## Docker Compose Configuration

The setup includes:

### PostgreSQL

* Database: `keycloak`
* Username: `keycloak`
* Password: `keycloak123`
* Port: `5432`

### Keycloak

* Version: `26.2`
* Admin Username: `admin`
* Admin Password: `admin123`
* Port: `8080`
* Database: PostgreSQL

## Start the Environment

Navigate to the Keycloak directory:

```bash
cd keycloak
```

Start all services:

```bash
docker compose up -d
```

Verify the containers are running:

```bash
docker ps
```

Expected containers:

```text
keycloak
keycloak-postgres
```

## Access Keycloak

Open your browser and navigate to:

```text
http://localhost:8080
```

Login credentials:

```text
Username: admin
Password: admin123
```

## View Logs

View Keycloak logs:

```bash
docker logs -f keycloak
```

View PostgreSQL logs:

```bash
docker logs -f keycloak-postgres
```

## Stop the Environment

Stop all containers:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

> Warning: Using `-v` will permanently delete all Keycloak and PostgreSQL data.

## Persistent Storage

The setup uses Docker volumes for data persistence.

### PostgreSQL Volume

```text
postgres_data
```

Stores:

* Users
* Realms
* Clients
* Roles
* Database records

### Keycloak Volume

```text
keycloak_data
```

Stores:

* Keycloak runtime data
* Import/export data
* Cache and temporary files

List volumes:

```bash
docker volume ls
```

Inspect a volume:

```bash
docker volume inspect postgres_data
```

## Database Connection Details

Use the following settings when connecting to PostgreSQL:

```text
Host: localhost
Port: 5432
Database: keycloak
Username: keycloak
Password: keycloak123
```

## Common Commands

Restart Keycloak:

```bash
docker restart keycloak
```

Restart PostgreSQL:

```bash
docker restart keycloak-postgres
```

View running containers:

```bash
docker ps
```

View all containers:

```bash
docker ps -a
```

Remove all containers and volumes:

```bash
docker compose down -v
docker volume prune
```

## Learning Outcomes

By the end of this setup, you will understand:

* Running Keycloak using Docker Compose
* Integrating Keycloak with PostgreSQL
* Persisting data using Docker Volumes
* Managing Keycloak containers
* Viewing logs and troubleshooting
* Preparing a production-ready identity platform
* Using Keycloak for React and FastAPI authentication
