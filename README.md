# Todo App

A full-stack Todo application developed during my DevOps internship to practice containerization, CI automation, and modern software delivery.

## Project Overview

This project started as a simple Todo application and was gradually enhanced using DevOps practices. The application allows users to manage their daily tasks while demonstrating how to build, containerize, test, and automate a full-stack application.

## Features

### Application

* User authentication (Login & Signup)
* Create, update, delete, and complete todos
* Responsive frontend interface
* RESTful backend API
* PostgreSQL database

### DevOps

* Dockerized frontend, backend, and database
* Docker Compose orchestration
* GitHub Actions CI pipeline
* Automated linting and testing
* Automatic Docker image build and push to Docker Hub
* Docker image versioning using Git SHA and `latest`
* Docker layer caching for faster builds

## Internship Progress

### Day 1 – Docker

* Containerized the frontend, backend, and PostgreSQL database.
* Configured Docker Compose to run the complete application.

### Day 2 – Docker Hub

* Built Docker images.
* Published frontend and backend images to Docker Hub.

### Day 3 – Continuous Integration

* Configured GitHub Actions.
* Added frontend and backend linting.
* Added frontend and backend tests.
* Automated Docker image build and publishing.
* Secured Docker Hub authentication using GitHub Secrets.

> **Current Progress:** Days 1–3 completed. Days 4–5 are currently in progress.

## Project Structure

```text
todo-app/
├── frontend/
├── backend/
├── database/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

## Running the Project

```bash
git clone <repository-url>
cd todo-app
docker compose up --build
```

### Services

* Frontend: http://localhost:5173
* Backend: http://localhost:5000
* PostgreSQL: localhost:5432

## Continuous Integration

Every Pull Request automatically:

* Runs frontend linting
* Runs backend linting
* Executes frontend tests
* Executes backend tests

After merging into the `main` branch, GitHub Actions automatically builds and publishes Docker images to Docker Hub.

## Future Improvements

* Continuous Deployment (CD)
* Nginx reverse proxy
* Load balancing
* Prometheus and Grafana monitoring
* Cloud deployment
