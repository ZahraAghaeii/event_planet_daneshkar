# 🌍 Event Planet

<div align="center">

## Event Planning & Management Platform

**A modular API-first event planning and management platform built with Django REST Framework, PostgreSQL, JWT Authentication, JavaScript, and Docker.**

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-REST_API-A30000?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens)

</div>

---

# 📖 Table of Contents

* [About The Project](#-about-the-project)
* [Project Goals](#-project-goals)
* [Main Scenario](#-main-scenario)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [User & Roles](#-user--roles)
* [Authentication](#-authentication)
* [Event Management](#-event-management)
* [Event Lifecycle](#-event-lifecycle)
* [Multi-Stage Events](#-multi-stage-events)
* [Dynamic Attributes](#-dynamic-attributes)
* [Registration](#-registration)
* [Feedback & Results](#-feedback--results)
* [Database Design](#-database-design)
* [API Structure](#-api-structure)
* [Frontend](#-frontend)
* [Docker](#-docker)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Testing](#-testing)
* [Security](#-security)
* [Future Improvements](#-future-improvements)
* [Repository](#-repository)
* [Author](#-author)

---

# 📌 About The Project

**Event Planet** is an event planning and management platform developed with **Django REST Framework**.

The project is designed as an **API-first application** where users can interact with events according to their roles.

The system supports two main roles:

* **Organizer**
* **Participant**

Organizers can create and manage events, define stages, configure dynamic attributes, manage event status, view participants, and publish results.

Participants can discover published events, register for them, view their registrations, and submit feedback after eligible events.

The platform uses **PostgreSQL** for persistent data storage and **Docker** for containerized development and deployment.

---

# 🎯 Project Goals

The main objectives of Event Planet are:

* Build a modular event management system.
* Provide a RESTful API using Django REST Framework.
* Implement JWT-based authentication.
* Support role-based access.
* Manage event lifecycle and status transitions.
* Support multi-stage events.
* Implement dynamic event attributes without using `JSONField`.
* Prevent duplicate registrations.
* Manage event capacity.
* Support feedback and results.
* Use PostgreSQL as the main database.
* Provide Docker-based development.
* Keep frontend and backend responsibilities separated.

---

# 🎪 Main Scenario

A typical Event Planet workflow looks like this:

```text
Organizer
   │
   ├── Create Event
   ├── Configure Event
   ├── Add Stages
   ├── Add Dynamic Attributes
   │
   ▼
DRAFT
   │
   ▼
PUBLISHED
   │
   ├── Participants discover event
   ├── Participants register
   │
   ▼
CLOSED
   │
   ▼
FINISHED
   │
   ├── Feedback
   └── Results
```

The project requirement defines four main event states: `Draft`, `Published`, `Closed`, and `Finished`.

---

# ✨ Features

## 👤 User Management

* Custom Django User model
* Organizer role
* Participant role
* User registration
* User login
* Profile management
* JWT authentication

---

## 🎪 Event Management

Each event contains information such as:

* Title
* Slug
* Description
* Category
* Organizer
* Status
* Capacity
* Banner image
* Start time
* End time
* Creation/update timestamps

Supported event categories include:

```text
TOURNAMENT
WEBINAR
WORKSHOP
SPORTS
```

---

## 🔄 Event Lifecycle

Events follow a logical lifecycle:

```text
DRAFT
  ↓
PUBLISHED
  ↓
CLOSED
  ↓
FINISHED
```

Invalid transitions should be rejected.

For example:

```text
DRAFT → FINISHED     ❌
PUBLISHED → DRAFT   ❌
FINISHED → DRAFT    ❌
```

---

# 🧩 Multi-Stage Events

An Event can contain multiple stages.

Examples:

```text
Tournament
├── Qualification
├── Semi Final
└── Final
```

or:

```text
Workshop
├── Session 1
├── Session 2
└── Session 3
```

Each stage has its own:

* Title
* Description
* Order
* Start time
* End time
* Optional capacity

The project requirements explicitly allow workshops, webinars, tournaments, and similar multi-stage events.

---

# 🎭 Stage Roles

A stage can have users assigned to specialized roles.

Current role types include:

```text
SPEAKER
JUDGE
COACH
```

For example:

```text
Workshop
└── Stage 1
    ├── Speaker
    └── Coach
```

or:

```text
Tournament
└── Final
    └── Judge
```

---

# 🧬 Dynamic Attributes

Different event categories require different properties.

For example:

### Tournament

```text
Number of rounds
Elimination type
```

### Webinar

```text
Platform
Recording availability
```

### Workshop

```text
Difficulty
Prerequisites
```

### Sports

```text
Sport category
Field type
Gender group
```

The project requirement specifically requires dynamic attributes without adding a new database column for every attribute and prohibits the use of `JSONField`.

---

# 🧩 EAV Architecture

Event Planet uses an EAV-style relational design:

```text
Event
  │
  └── EventAttributeValue
          │
          └── Attribute
```

An `Attribute` represents a reusable attribute definition.

For example:

```text
Attribute
name = Difficulty
slug = difficulty
```

An event can then store:

```text
EventAttributeValue
event = Python Workshop
attribute = Difficulty
value = Intermediate
```

The same `Difficulty` attribute can be reused by multiple events while each event keeps its own value.

---

# 🎟 Registration

Participants register for the **whole Event**, not individual stages.

The architecture is:

```text
Participant
      │
      ▼
Registration
      │
      ▼
Event
      │
      ├── Stage 1
      ├── Stage 2
      └── Stage 3
```

This means a participant registers once for an Event and the Event's stages are considered parts of the same registration.

The main capacity is also associated with the Event.

---

# 📊 Capacity Management

Events contain a total capacity.

The remaining capacity can conceptually be calculated as:

```text
Remaining Capacity
=
Event Capacity
-
Confirmed Registrations
```

The registration system also prevents duplicate registration for the same participant and event.

The project requirements explicitly require capacity validation and prohibit duplicate registration.

---

# 💳 Registration Status

Registration records support states such as:

```text
PENDING
PAID
CANCELLED
```

Confirmed registrations can be used when calculating occupied event capacity.

---

# ⭐ Feedback & Results

## Feedback

Participants can provide feedback after the event according to the event's completion state.

Feedback contains:

```text
Event
Participant
Rating
Comment
```

Duplicate feedback for the same participant and event is prevented by the data model.

The project specification requires feedback to be restricted to registered participants and to completed events.

---

## 🏆 Results

The system also provides a Result model for storing event outcomes.

A result can contain:

```text
Event
Participant
Score
Details
```

This allows different event categories to represent their results in a flexible way.

The project requirements specify that results should only be published after the event has finished and should then be publicly viewable through the API.

---

# 👥 User & Roles

The project uses a custom Django user model.

Available roles:

```text
ORGANIZER
PARTICIPANT
```

### Organizer

Responsible for:

* Creating events
* Managing owned events
* Managing stages
* Managing dynamic attributes
* Managing event status
* Viewing participants
* Publishing results

### Participant

Responsible for:

* Browsing events
* Viewing event details
* Registering for events
* Viewing registrations
* Sending feedback

The role-based API separation is part of the original project requirements.

---

# 🔐 Authentication

Authentication is based on **JWT** using Django REST Framework Simple JWT.

Clients send the access token using:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

Configured token lifetimes are approximately:

```text
Access Token  → 60 minutes
Refresh Token → 1 day
```

Protected endpoints require authentication.

---

# 🏗 Architecture

The project follows a modular Django architecture.

```text
Client
  │
  ▼
REST API
  │
  ├── User
  ├── Event
  ├── Attribute
  ├── Relation
  └── Core
  │
  ▼
Django ORM
  │
  ▼
PostgreSQL
```

The major Django apps are:

```text
user
event
attribute
relation
core
```

This separation follows the **Separation of Concerns** principle.

---

# 📂 Project Structure

```text
event_planet_daneshkar/
│
├── attribute/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── core/
│   ├── migrations/
│   ├── models.py
│   ├── permissions.py
│   ├── tests.py
│   └── views.py
│
├── event/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── frontend/
│   ├── static/
│   └── templates/
│       ├── index.html
│       └── profile.html
│
├── relation/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── user/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── manage.py
└── README.md
```

---

# 🗄 Database Design

Main entities:

```text
CustomUser
Event
EventStage
StageRole
Attribute
EventAttributeValue
Registration
Feedback
Result
```

Simplified relationship:

```text
CustomUser
    │
    ├── Organizer ──────► Event
    │                       │
    │                       ├── EventStage
    │                       │      └── StageRole
    │                       │
    │                       ├── Attribute Values
    │                       │      └── Attribute
    │                       │
    │                       ├── Registration
    │                       │
    │                       ├── Feedback
    │                       │
    │                       └── Result
    │
    └── Participant ─────► Registration
```

---

# 🧱 Core Models

## CustomUser

Extends Django's `AbstractUser`.

Main additional concept:

```text
role
```

---

## Event

Stores the main event information:

```text
title
slug
description
category
organizer
status
capacity
image
start_time
end_time
```

---

## EventStage

Represents a stage belonging to an Event.

```text
event
title
description
order
start_time
end_time
stage_capacity
```

---

## StageRole

Connects users to stages through roles:

```text
stage
user
role_type
```

---

## Attribute

Stores reusable dynamic attribute definitions:

```text
name
slug
```

---

## EventAttributeValue

Stores an attribute value for a specific event:

```text
event
attribute
value
```

---

## Registration

Connects a participant to an event:

```text
event
participant
payment_status
```

---

## Feedback

Stores participant feedback:

```text
event
participant
rating
comment
```

---

## Result

Stores event results:

```text
event
participant
score
details
```

---

# 🌐 API Structure

The project uses versioned API URLs:

```text
/api/v1/
```

Main API groups:

```text
/api/v1/user/
/api/v1/event/
/api/v1/attribute/
/api/v1/relation/
```

The assignment requires at least Public, Participant, and Organizer API groups.

---

# 👤 User API

Base:

```text
/api/v1/user/
```

Important operations include:

```http
POST /api/v1/user/register/
POST /api/v1/user/login/
GET  /api/v1/user/profile/
PUT  /api/v1/user/profile/
PATCH /api/v1/user/profile/
```

---

# 🎪 Event API

Base:

```text
/api/v1/event/
```

Typical REST operations:

```http
GET    /api/v1/event/
POST   /api/v1/event/
GET    /api/v1/event/{id}/
PUT    /api/v1/event/{id}/
PATCH  /api/v1/event/{id}/
DELETE /api/v1/event/{id}/
```

---

# 🧩 Stage API

Base:

```text
/api/v1/event/stages/
```

Typical operations:

```http
GET
POST
PUT
PATCH
DELETE
```

---

# 🧬 Attribute API

Base:

```text
/api/v1/attribute/
```

Used for managing reusable event attributes.

---

# 🎟 Registration API

Base:

```text
/api/v1/relation/registrations/
```

Used for event registration management.

---

# 🔎 Search & Filtering

The project uses:

```text
django-filter
DjangoFilterBackend
SearchFilter
OrderingFilter
```

Events can be filtered using fields such as:

```text
status
category
```

Example:

```http
GET /api/v1/event/?status=PUBLISHED
```

Search example:

```http
GET /api/v1/event/?search=python
```

Event search is primarily based on fields such as:

```text
title
description
```

---

# 🖥 Frontend

Although the project is API-first, it also includes a lightweight frontend.

Frontend structure:

```text
frontend/
├── static/
└── templates/
    ├── index.html
    └── profile.html
```

The home page provides event discovery and category sections.

The available categories are:

```text
Tournament
Webinar
Workshop
Sports
```

The profile page provides user-related information and profile interaction.

---

# 🐳 Docker

The project includes:

```text
Dockerfile
docker-compose.yml
.dockerignore
```

The Compose setup contains two main services:

```text
web
db
```

Architecture:

```text
Browser
   │
   ▼
Django Container
   │
   ▼
PostgreSQL Container
```

The Django container uses Python 3.11 and PostgreSQL uses a PostgreSQL 15 Alpine image.

---

# ▶️ Run With Docker

Clone the project:

```bash
git clone https://github.com/ZahraAghaeii/event_planet_daneshkar.git
cd event_planet_daneshkar
```

Create a `.env` file.

Then run:

```bash
docker compose up --build
```

The container executes migrations before starting the Django development server.

The application is available at:

```text
http://localhost:3000
```

---

# 🛑 Stop Docker

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

Enter the web container:

```bash
docker compose exec web sh
```

---

# ⚙️ Environment Variables

Example `.env`:

```env
SECRET_KEY=your-secret-key
DEBUG=True

ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=event_planet_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=db
DB_PORT=5432
```

Database credentials and other environment-specific configuration should not be hard-coded into the application.

The project requirements also explicitly require database credentials to come from environment variables.

---

# 💻 Run Without Docker

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the server:

```bash
python manage.py runserver
```

The application will normally be available at:

```text
http://127.0.0.1:8000/
```

---

# 👑 Create Superuser

With Docker:

```bash
docker compose exec web python manage.py createsuperuser
```

Without Docker:

```bash
python manage.py createsuperuser
```

Admin panel:

```text
http://localhost:3000/admin/
```

or:

```text
http://127.0.0.1:8000/admin/
```

---

# 🧪 Testing

Each application contains a `tests.py` module.

Important tests for this project include:

### Event

* Valid date range
* Invalid date range
* Valid lifecycle transitions
* Invalid lifecycle transitions
* Stage capacity validation

### Registration

* Duplicate registration
* Capacity validation
* Authentication requirements

### Feedback

* Registered participant validation
* Finished-event validation
* Duplicate feedback

### Authorization

* Organizer ownership
* Participant permissions
* Protected endpoints

### Attributes

* Attribute reuse
* Unique event/attribute values
* Relational integrity

---

# 🔒 Security

Important security practices include:

* JWT authentication
* Backend-side authorization
* Environment variables for secrets
* Django password validation
* Database constraints
* CORS configuration
* HTTPS in production

For production:

```env
DEBUG=False
```

and `ALLOWED_HOSTS` and CORS origins should be restricted to trusted values.

---

# 🧠 Design Decisions

## API First

The API is the main interface of the system.

This makes it possible to add different clients later:

```text
Web
Mobile
Desktop
Third-party integrations
```

---

## PostgreSQL

PostgreSQL is appropriate because the project contains many relational entities:

```text
User → Event
Event → Stage
Event → Registration
Event → Feedback
Event → Result
Event → Attribute
```

---

## Custom User

A custom user model allows the project to represent platform-specific roles directly.

---

## Modular Django Apps

Responsibilities are separated into:

```text
user
event
attribute
relation
core
```

This improves maintainability and keeps domain responsibilities clear.

---

## Event-Level Registration

Participants register for an entire event rather than individual stages.

Stages represent the internal structure of the Event.

---

## EAV for Dynamic Attributes

Dynamic attributes are stored relationally instead of adding new columns for every event-specific property.

This makes the Event model easier to extend.

---

# 🚀 Future Improvements

Possible future improvements include:

* More advanced permission classes
* Complete organizer/participant API separation
* Dedicated Feedback and Result endpoints
* Swagger/OpenAPI documentation
* Email notifications
* Event reminders
* Calendar integration
* Ticket generation
* QR-code check-in
* Payment gateway
* Waiting lists
* Redis caching
* Celery background tasks
* Advanced analytics
* Production deployment with Nginx/Gunicorn
* Automated CI/CD
* Expanded automated tests

---

# 📈 Production Architecture

A future production deployment could look like:

```text
                 Internet
                    │
                    ▼
                  Nginx
                    │
                    ▼
                Gunicorn
                    │
                    ▼
                 Django
              ┌─────┴─────┐
              │           │
              ▼           ▼
         PostgreSQL     Redis
                            │
                            ▼
                         Celery
```

This architecture would allow the platform to scale beyond a simple development environment.

---

# 🌟 Why Event Planet?

Event Planet brings several backend concepts together in one practical project:

```text
Django
Django REST Framework
JWT Authentication
PostgreSQL
Docker
REST APIs
Role-Based Access
State Management
Database Constraints
EAV Modeling
Multi-Stage Events
Registration
Feedback
Results
Frontend/API Integration
```

The project demonstrates how a real-world domain can be divided into manageable components while keeping the core business logic in the backend.

---

# 🔗 Repository

GitHub:

https://github.com/ZahraAghaeii/event_planet_daneshkar

Clone:

```bash
git clone https://github.com/ZahraAghaeii/event_planet_daneshkar.git
```

---

# 👩‍💻 Author

**Zahra Aghaeii**

GitHub:

https://github.com/ZahraAghaeii

---

<div align="center">

## 🌍 Event Planet

### Plan Events. Connect People. Create Experiences.

**Built with Django REST Framework, PostgreSQL and Docker.**

⭐ If you like the project, consider giving the repository a star.

</div>
