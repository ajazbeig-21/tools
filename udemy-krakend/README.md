Here's a clean and focused `README.md` tailored for your **3-hour project**.

# 🚀 Production-Ready Microservices with KrakenD API Gateway, FastAPI & Docker

Build a production-style microservices application using **FastAPI**, **KrakenD API Gateway**, and **Docker Compose**.

This project demonstrates how multiple backend services can be exposed through a single API Gateway with routing, request aggregation, authentication, and other essential production features.

> **Course Duration:** 3 Hours
> **Level:** Beginner to Intermediate

---

# 📖 Course Overview

In this hands-on project, you'll build three independent FastAPI microservices, containerize them with Docker, and expose them through a KrakenD API Gateway.

By the end of the course, you'll understand how API Gateways work in real-world applications and how to deploy a complete microservices stack locally using Docker Compose.

---

# 🎯 What You'll Learn

* Understand Microservices Architecture
* Build multiple FastAPI services
* Dockerize Python applications
* Configure Docker Compose
* Install and configure KrakenD
* Route requests through an API Gateway
* Aggregate responses from multiple services
* Implement JWT Authentication
* Configure CORS
* Apply Rate Limiting
* Forward Custom Headers
* Manage Environment Variables
* Build a production-ready project structure

---

# 🏗️ Project Architecture

```text
                    Client
                       │
                       ▼
             KrakenD API Gateway
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
 User Service    Product Service   Order Service
                       │
                Docker Compose Network
```

---

# 📂 Project Structure

```text
production-ready-microservices/
│
├── gateway/
│   ├── krakend.json
│   ├── Dockerfile
│   └── settings/
│
├── services/
│   ├── user-service/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   ├── product-service/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── order-service/
│       ├── app.py
│       ├── Dockerfile
│       └── requirements.txt
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# 🛠️ Tech Stack

* FastAPI
* KrakenD API Gateway
* Docker
* Docker Compose
* Python 3.12+
* JWT Authentication

---

# 🚀 Features

## Microservices

* User Service
* Product Service
* Order Service

## API Gateway

* Request Routing
* Endpoint Aggregation
* Header Forwarding
* Centralized API Access

## Security

* JWT Authentication
* CORS Configuration
* Rate Limiting

## Deployment

* Dockerized Services
* Docker Compose
* Environment Variables
* Health Checks

---

# 🌐 API Endpoints

## User Service

```http
GET /users
GET /users/{id}
```

## Product Service

```http
GET /products
GET /products/{id}
```

## Order Service

```http
GET /orders
GET /orders/{id}
```

## Aggregated Endpoint

```http
GET /dashboard
```

Returns data from multiple services through KrakenD.

---

# 🐳 Getting Started

## Clone the Repository

```bash
git clone https://github.com/yourusername/production-ready-microservices.git

cd production-ready-microservices
```

## Start the Project

```bash
docker compose up --build
```

## Stop the Project

```bash
docker compose down
```

---

# 📍 Service URLs

| Service         | URL                                            |
| --------------- | ---------------------------------------------- |
| KrakenD Gateway | [http://localhost:8080](http://localhost:8080) |
| User Service    | [http://localhost:8001](http://localhost:8001) |
| Product Service | [http://localhost:8002](http://localhost:8002) |
| Order Service   | [http://localhost:8003](http://localhost:8003) |

---

# 📚 Course Curriculum

### Section 1 – Introduction

* What are Microservices?
* What is an API Gateway?
* Project Architecture

### Section 2 – Building FastAPI Services

* User Service
* Product Service
* Order Service

### Section 3 – Docker

* Dockerfiles
* Docker Compose
* Running Multiple Services

### Section 4 – KrakenD API Gateway

* Basic Routing
* Request Aggregation
* Header Forwarding
* JWT Authentication

### Section 5 – Production Features

* Environment Variables
* CORS
* Rate Limiting
* Health Checks

### Section 6 – Final Deployment

* Running the Complete Stack
* Testing APIs
* Project Recap

---

# 🎓 Prerequisites

* Basic Python knowledge
* Basic REST API understanding
* Docker installed
* Code editor (VS Code recommended)

---

# 🤝 Contributing

Contributions, suggestions, and improvements are always welcome.

If you find this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ajaz Beig**

Helping developers learn FastAPI, Docker, DevOps, and modern backend architecture through practical, project-based courses.

