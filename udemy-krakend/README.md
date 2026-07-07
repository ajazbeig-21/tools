# 🚀 Production-Ready Microservices with KrakenD API Gateway, FastAPI & Docker

Build a production-style microservices application using **FastAPI**, **KrakenD API Gateway**, and **Docker Compose**.

This repository accompanies a **3-hour hands-on course** where you'll learn how to build multiple microservices, expose them through a single API Gateway, and deploy the complete stack using Docker.

Unlike theory-heavy courses, this project focuses on **building a real working application** while learning the core features of KrakenD used in production. KrakenD is commonly used for routing, request aggregation, authentication, and traffic management in microservices architectures.

---

## 📂 Repository

**GitHub Repository**

[Production-Ready Microservices with KrakenD, FastAPI & Docker](https://github.com/ajazbeig-21/tools/tree/aj_lin/udemy-krakend?utm_source=chatgpt.com)

---

# 🎯 What You'll Build

A complete microservices application consisting of:

* 👤 User Service
* 📦 Product Service
* 🛒 Order Service
* 🚪 KrakenD API Gateway
* 🐳 Docker Compose Deployment

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

# 📚 What You'll Learn

By the end of this course, you'll be able to:

* Understand Microservices Architecture
* Build REST APIs with FastAPI
* Create multiple independent microservices
* Dockerize Python applications
* Configure Docker Compose
* Configure KrakenD API Gateway
* Route requests to backend services
* Aggregate responses from multiple APIs
* Pass Query Parameters & Path Parameters
* Forward Custom Headers
* Protect APIs using JWT Authentication
* Configure CORS
* Apply Rate Limiting
* Use Environment Variables
* Configure Health Checks
* Organize a production-ready project structure

---

# 🛠 Tech Stack

* FastAPI
* KrakenD Community Edition
* Docker
* Docker Compose
* Python 3.12+
* JWT Authentication

---

# 📂 Project Structure

start the KrakenD service using Docker
docker run -p "8080:8080" -v $PWD:/etc/krakend/ krakend:2.13.7 run -c krakend.json

```text
udemy-krakend/

├── gateway/
│   ├── krakend.json
│   └── config/
│
├── services/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# 🚀 Course Curriculum

## Section 1 — Introduction

* Course Overview
* What are Microservices?
* What is an API Gateway?
* Understanding KrakenD
* Project Architecture

---

## Section 2 — Building Backend Services

* User Service
* Product Service
* Order Service
* Testing APIs
* Dockerizing Services
* Docker Compose Setup

---

## Section 3 — KrakenD Fundamentals

* Installing KrakenD
* Understanding `krakend.json`
* Creating Your First Endpoint
* Backend Configuration
* Testing Through KrakenD

---

## Section 4 — Routing & Aggregation

* Basic Routing
* Path Parameters
* Query Parameters
* Request Aggregation
* Endpoint Aliasing
* Response Transformation

---

## Section 5 — Authentication & Security

* JWT Authentication
* CORS Configuration
* Header Forwarding
* Header Injection
* Environment Variables

---

## Section 6 — Production Features

* Rate Limiting
* Health Checks
* Logging
* Error Handling
* Docker Best Practices

---

## Section 7 — Final Deployment

* Running the Complete Stack
* Testing APIs
* Project Recap

---

# ✨ Features

### FastAPI

* REST APIs
* Swagger Documentation
* Modular Project Structure

### KrakenD

* API Routing
* Request Aggregation
* Backend Routing
* Header Manipulation
* JWT Authentication
* Response Transformation
* Rate Limiting
* CORS

### Docker

* Multi-container Deployment
* Docker Networking
* Environment Variables
* Production-ready Docker Compose

---

# 🌐 Services

| Service         | Port |
| --------------- | ---- |
| KrakenD Gateway | 8080 |
| User Service    | 8001 |
| Product Service | 8002 |
| Order Service   | 8003 |

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone -b aj_lin https://github.com/ajazbeig-21/tools.git

cd tools/udemy-krakend
```

Start all services:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

---

# 🎓 Prerequisites

* Basic Python knowledge
* REST API fundamentals
* Docker installed
* VS Code (recommended)

---

# 👨‍💻 Who This Course Is For

* Python Developers
* Backend Developers
* FastAPI Developers
* DevOps Beginners
* Software Engineers
* Students learning Microservices
* Anyone interested in API Gateway architecture

---

# ⭐ Support

If this repository helps you learn KrakenD or FastAPI, consider giving it a **⭐ Star** on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ajaz Beig**

Creating practical, project-based courses on FastAPI, Docker, DevOps, and modern backend architecture.
