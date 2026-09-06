#  Event Planet API

> A modular Full-Stack Event & Learning Management System built with Django REST Framework, PostgreSQL, Vanilla JS, and Docker.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-5.x-success)
![DRF](https://img.shields.io/badge/Django_REST_Framework-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

---

# Table of Contents

- About
- Features
- Tech Stack
- System Architecture
- Project Structure
- Database Design
- Business Rules
- Installation
- Environment Variables
- Running the Project
- Docker
- API Overview
- Project Design Decisions
- Future Improvements

---

#  About

**Event Planet** is a modular Event Management System developed using **Django REST Framework** on the backend and native **Vanilla JavaScript, HTML5, and CSS3** on the frontend.

The system enables organizers to create and manage events, define multiple stages, manage participant registrations, collect feedback after event completion, and publish final results through both a RESTful API and an interactive web interface.

The project follows clean architecture principles with separated applications to improve scalability, maintainability, and code organization.

---

#  Features

## User Management & Auth

- User Registration & Login
- JWT Authentication
- Role Based Access Control (RBAC)
- Organizer & Participant Roles

## Event Management

- Create, Edit & Delete Event (ModelViewSet)
- Event Lifecycle Management (Draft → Published → Closed → Finished)
- Search, Filter & Order Events

## Stage Management

- Multiple Stages per Event
- Ordered Execution & Schedule
- Independent Stage Management

## Registration System

- Register Participants
- Capacity Validation & Automated Closing
- Duplicate Registration Prevention

## Dynamic Attributes (EAV)

- Custom Event Attributes
- EAV Database Design (No JSONField required)
- Flexible Attribute Values

## Feedback & Results

- Rating System and Participant Comments (Post-Event Only)
- Final Results & Achievements Publication

## Frontend UI

- Interactive Single Page Dashboard (Vanilla JS, HTML5, CSS3)
- Real-time API Integration

---

# 🛠 Tech Stack

## Backend

- Python 3.11
- Django 5.x
- Django REST Framework (DRF)
- PostgreSQL
- JWT Authentication (`djangorestframework-simplejwt`)
- Psycopg2 & Django-Filter

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla / ES6+)

## DevOps

- Docker
- Docker Compose

---

#  System Architecture

The project is divided into independent Django applications following the Separation of Concerns principle: