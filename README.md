# 🌍 Event Planet

<div align="center">

### Event Planning & Management Platform

**A modular API-first event planning and management system built with Django REST Framework, PostgreSQL, JWT Authentication, Vanilla JavaScript, and Docker.**

<br>

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST_Framework-API-A30000?style=for-the-badge\&logo=django\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-Frontend-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)

<br>

**Plan. Organize. Participate. Manage.**

</div>

---

# 📖 Table of Contents

* [About The Project](#-about-the-project)
* [Project Goals](#-project-goals)
* [Main Scenario](#-main-scenario)
* [Core Concepts](#-core-concepts)
* [Key Features](#-key-features)
* [Technology Stack](#-technology-stack)
* [High-Level Architecture](#-high-level-architecture)
* [Application Architecture](#-application-architecture)
* [Project Structure](#-project-structure)
* [Core Application](#-core-application)
* [User Management](#-user-management)
* [Roles and Authorization](#-roles-and-authorization)
* [Authentication](#-authentication)
* [Event Management](#-event-management)
* [Event Categories](#-event-categories)
* [Event Lifecycle](#-event-lifecycle)
* [Multi-Stage Events](#-multi-stage-events)
* [Stage Roles](#-stage-roles)
* [Registration Architecture](#-registration-architecture)
* [Capacity Management](#-capacity-management)
* [Dynamic Attributes](#-dynamic-attributes)
* [EAV Design](#-eav-design)
* [Feedback System](#-feedback-system)
* [Results System](#-results-system)
* [Database Design](#-database-design)
* [Entity Relationships](#-entity-relationships)
* [Model Reference](#-model-reference)
* [Business Rules](#-business-rules)
* [Validation Rules](#-validation-rules)
* [API Architecture](#-api-architecture)
* [API Versioning](#-api-versioning)
* [API Endpoint Overview](#-api-endpoint-overview)
* [Filtering, Searching and Ordering](#-filtering-searching-and-ordering)
* [Frontend](#-frontend)
* [Frontend Architecture](#-frontend-architecture)
* [Docker](#-docker)
* [Docker Architecture](#-docker-architecture)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Running With Docker](#-running-with-docker)
* [Running Without Docker](#-running-without-docker)
* [Database Migrations](#-database-migrations)
* [Creating a Superuser](#-creating-a-superuser)
* [Django Admin](#-django-admin)
* [Configuration](#-configuration)
* [Security Considerations](#-security-considerations)
* [Error Handling](#-error-handling)
* [Development Workflow](#-development-workflow)
* [Testing](#-testing)
* [Current Implementation Notes](#-current-implementation-notes)
* [Possible Future Improvements](#-possible-future-improvements)
* [Design Decisions](#-design-decisions)
* [Why This Architecture](#-why-this-architecture)
* [Repository](#-repository)
* [Maintainer](#-maintainer)
* [Final Notes](#-final-notes)

---

# 🚀 About The Project

**Event Planet** is an Event Planning & Management Platform developed using **Django** and **Django REST Framework**.

The primary goal of the project is to provide a flexible backend architecture for creating, managing, publishing, registering for, and evaluating different kinds of events.

Unlike a simple event-listing application, Event Planet is designed around the complete lifecycle of an event.

An organizer can:

* create an event,
* configure its information,
* select its category,
* define its capacity,
* divide it into multiple stages,
* assign roles to stages,
* define custom dynamic attributes,
* publish the event,
* manage registrations,
* close registration,
* finish the event,
* receive participant feedback,
* and publish final results.

Participants can:

* browse available events,
* search events,
* inspect event information,
* register for events,
* view their registrations,
* and interact with the platform according to their permissions.

The project follows an **API-first architecture**.

This means that the backend API represents the main source of application logic and data.

The frontend is an additional client of the API rather than the place where the main business logic should live.

---

# 🎯 Project Goals

The primary goals of Event Planet are:

1. Build a modular event-management backend.

2. Implement RESTful APIs using Django REST Framework.

3. Support multiple user roles.

4. Provide token-based authentication.

5. Manage the complete lifecycle of events.

6. Support events containing multiple stages.

7. Support dynamic attributes without adding database columns for each new attribute.

8. Prevent duplicate registrations.

9. Manage event capacity.

10. Provide a structure for participant feedback.

11. Provide a structure for event results.

12. Store application data in PostgreSQL.

13. Make the application reproducible using Docker.

14. Keep backend business logic independent from the frontend.

15. Design the application with software architecture principles in mind.

---

# 🌐 Main Scenario

Event Planet represents a system in which different users interact with events in different roles.

There are two primary user types:

```text
Organizer
Participant
```

An **Organizer** manages events.

A **Participant** discovers and joins events.

A typical workflow looks like this:

```text
Organizer
   │
   ├── Creates Event
   │
   ├── Adds Event Information
   │
   ├── Defines Event Stages
   │
   ├── Defines Dynamic Attributes
   │
   ├── Publishes Event
   │
   ▼
Published Event
   │
   ├── Participant discovers event
   ├── Participant registers
   ├── Event reaches capacity / organizer closes registration
   │
   ▼
Closed Event
   │
   ├── Event takes place
   ├── Stages are completed
   │
   ▼
Finished Event
   │
   ├── Participants can submit feedback
   └── Organizer can publish results
```

---

# 🧠 Core Concepts

Event Planet revolves around several important domain concepts.

```text
User
│
├── Organizer
└── Participant

Event
│
├── Event Lifecycle
├── Event Category
├── Capacity
├── Stages
├── Dynamic Attributes
├── Registrations
├── Feedback
└── Results
```

The main entities are:

| Entity                | Responsibility                             |
| --------------------- | ------------------------------------------ |
| `CustomUser`          | Stores users and roles                     |
| `Event`               | Core event information                     |
| `EventStage`          | Represents sessions/rounds/stages          |
| `StageRole`           | Associates users with stage-specific roles |
| `Attribute`           | Defines reusable dynamic metadata          |
| `EventAttributeValue` | Stores event-specific dynamic values       |
| `Registration`        | Connects a participant to an event         |
| `Feedback`            | Stores participant ratings/comments        |
| `Result`              | Stores participant results                 |
| `TimeStampedModel`    | Adds creation/update timestamps            |

---

# ✨ Key Features

## 👤 User Management

* Custom Django user model
* Organizer role
* Participant role
* User registration structure
* User profile structure
* Authentication-protected API endpoints
* Role helper methods

---

## 🔐 Authentication

* JWT-based authentication configuration
* Bearer token support
* Access-token configuration
* Refresh-token configuration
* Protected DRF endpoints

---

## 🎪 Event Management

Events contain:

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
* Creation timestamp
* Update timestamp

---

## 🔄 Event Lifecycle

The platform defines four primary event states:

```text
DRAFT
   │
   ▼
PUBLISHED
   │
   ▼
CLOSED
   │
   ▼
FINISHED
```

Only logically valid transitions should occur.

---

## 🧩 Multi-Stage Events

An event can contain multiple stages.

Examples:

* tournament rounds,
* workshop sessions,
* webinar sessions,
* sport-event rounds,
* educational sessions,
* competition phases.

Each stage can have:

* Title
* Description
* Order
* Start time
* End time
* Optional capacity
* Assigned roles

---

## 🎭 Stage Roles

Stages support role assignments such as:

```text
SPEAKER
JUDGE
COACH
```

This allows stage-specific responsibilities to be represented independently from the user's global platform role.

---

## 🎟 Registration

Participants can be associated with events using the `Registration` model.

The model also supports a payment/confirmation state:

```text
PENDING
PAID
CANCELLED
```

Duplicate registration for the same participant and event is prevented at the database level.

---

## 📊 Capacity

Every Event contains a total capacity.

The Event model also provides a method for calculating remaining capacity.

Conceptually:

```text
remaining capacity
=
total event capacity
-
number of PAID registrations
```

The result never becomes negative.

---

## 🧬 Dynamic Event Attributes

Different kinds of events can require different metadata.

For example:

### Tournament

```text
Number of rounds
Elimination type
Competition format
```

### Webinar

```text
Platform
Recording availability
Online provider
```

### Workshop

```text
Difficulty
Prerequisites
Required tools
```

### Sports Event

```text
Sport category
Field type
Competition group
```

Instead of adding new columns to the `Event` table for every possible property, Event Planet separates attribute definitions from attribute values.

---

## ⭐ Feedback

The domain model includes participant feedback consisting of:

* Event
* Participant
* Rating
* Comment

The database also prevents the same participant from submitting more than one feedback record for the same event.

---

## 🏆 Results

Final event results can be stored through the `Result` model.

Each result can include:

* Event
* Participant
* Score or rank
* Additional details

---

# 🛠 Technology Stack

## Backend

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Python 3.11           | Programming language           |
| Django                | Main web framework             |
| Django REST Framework | REST API development           |
| Simple JWT            | JWT authentication             |
| django-filter         | Filtering API querysets        |
| django-cors-headers   | Frontend/backend communication |
| python-dotenv         | Environment configuration      |
| Pillow                | Image support                  |
| psycopg2              | PostgreSQL adapter             |

---

## Database

```text
PostgreSQL
```

PostgreSQL is used as the relational database of the application.

---

## Frontend

The project also contains an optional lightweight frontend built using:

```text
HTML5
CSS3
JavaScript
Django Templates
Bootstrap-compatible UI structure
```

The frontend is intentionally separated from the core business domain.

---

## DevOps

```text
Docker
Docker Compose
Environment Variables
```

---

# 🏗 High-Level Architecture

The system can be represented using the following high-level architecture:

```text
┌─────────────────────────────────────────────┐
│                   Client                    │
│                                             │
│ Browser / Frontend / API Client / Postman  │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP / REST
                       ▼
┌─────────────────────────────────────────────┐
│              Django REST API                │
│                                             │
│   Serializers ─ Views ─ Permissions         │
│                                             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                Domain Layer                 │
│                                             │
│ User | Event | Attribute | Relation | Core │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                Django ORM                   │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                PostgreSQL                   │
└─────────────────────────────────────────────┘
```

---

# 🧱 Application Architecture

Instead of putting the entire project inside one Django application, Event Planet separates responsibilities into multiple apps.

```text
user
event
attribute
relation
core
```

This follows the principle of **Separation of Concerns**.

Each application represents a separate part of the domain.

---

## `user`

Responsible for:

```text
Users
Authentication-related structures
Roles
Profiles
```

---

## `event`

Responsible for:

```text
Events
Event Lifecycle
Categories
Stages
Stage Roles
```

---

## `attribute`

Responsible for:

```text
Dynamic Attribute Definitions
Event-specific Attribute Values
EAV-style metadata
```

---

## `relation`

Responsible for:

```text
Registration
Feedback
Results
User ↔ Event relationships
```

---

## `core`

Responsible for reusable project-level components such as:

```text
Abstract Models
Shared Permissions
Common Utilities
```

---

# 📂 Project Structure

The repository is organized approximately as follows:

```text
event_planet_daneshkar/
│
├── attribute/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── config/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── core/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── permissions.py
│   ├── tests.py
│   └── views.py
│
├── event/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
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
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── user/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── manage.py
├── requirements.txt
└── README.md
```

---

# 🧱 Core Application

The `core` application contains components that can be reused by the other apps.

One of its main components is:

```python
TimeStampedModel
```

This abstract model provides:

```text
created_at
updated_at
```

Instead of defining these columns repeatedly in every model, domain models can inherit from the shared abstract model.

Conceptually:

```text
TimeStampedModel
      │
      ├── CustomUser
      ├── Event
      ├── EventStage
      ├── StageRole
      ├── Attribute
      ├── EventAttributeValue
      ├── Registration
      ├── Feedback
      └── Result
```

This reduces duplication and creates consistent timestamps throughout the system.

---

# 👥 User Management

Event Planet uses a custom Django user model.

The model extends:

```text
AbstractUser
```

and adds a role field.

---

# 🎭 Roles and Authorization

Two primary roles are defined:

```text
ORGANIZER
PARTICIPANT
```

The default role is:

```text
PARTICIPANT
```

---

## Organizer

An organizer represents a user responsible for managing events.

Conceptually, an organizer should be able to:

* create events,
* update owned events,
* manage event stages,
* manage event attributes,
* control event status,
* inspect event participants,
* publish results.

---

## Participant

A participant represents a normal event attendee.

Conceptually, participants can:

* browse published events,
* register for events,
* view registrations,
* submit eligible feedback,
* inspect published results.

---

## Role Helper Methods

The custom user model contains helper methods equivalent to:

```text
is_organizer()
is_participant()
```

These simplify role checks within future permission classes and business logic.

---

# 🔐 Authentication

The project is configured to use:

```text
JWT Authentication
```

through:

```text
djangorestframework-simplejwt
```

The DRF authentication class is configured as:

```text
JWTAuthentication
```

The expected authorization format is:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

## JWT Lifetime

The project configuration defines approximately:

```text
Access Token  → 60 minutes
Refresh Token → 1 day
```

---

## Protected APIs

Protected APIs require authentication before access.

At the framework level, JWT is the configured authentication mechanism.

---

# 🎪 Event Management

The `Event` model represents the core entity of the application.

An Event contains:

| Field         | Description                      |
| ------------- | -------------------------------- |
| `id`          | Database identifier              |
| `title`       | Event title                      |
| `slug`        | Unique human-readable identifier |
| `description` | Event description                |
| `category`    | Event category                   |
| `organizer`   | Event owner                      |
| `status`      | Event lifecycle state            |
| `capacity`    | Maximum number of participants   |
| `image`       | Optional banner image            |
| `start_time`  | Event start                      |
| `end_time`    | Event end                        |
| `created_at`  | Creation timestamp               |
| `updated_at`  | Last update timestamp            |

---

# 🏷 Event Categories

The current domain model provides four event categories.

```text
TOURNAMENT
WEBINAR
WORKSHOP
SPORTS
```

---

## Tournament

Useful for:

* competitions,
* elimination tournaments,
* multi-round contests.

---

## Webinar

Useful for:

* online seminars,
* lectures,
* live online events,
* educational sessions.

---

## Workshop

Useful for:

* practical courses,
* training sessions,
* technical workshops,
* educational activities.

---

## Sports

Useful for:

* sports tournaments,
* matches,
* leagues,
* competitions.

---

# 🔗 Event Slugs

Every Event contains a unique slug.

When a new event does not explicitly contain a slug, the model creates one based on the event title.

Conceptually:

```text
"Python Workshop"
        ↓
"python-workshop"
```

The project enables Unicode-aware slug generation.

---

# ⏰ Event Time Validation

An event cannot end before it starts.

The following logical requirement is enforced at model-validation level:

```text
end_time > start_time
```

Invalid example:

```text
start_time = 18:00
end_time   = 16:00
```

Result:

```text
Validation Error
```

Valid example:

```text
start_time = 16:00
end_time   = 18:00
```

---

# 🔄 Event Lifecycle

Events are modeled as stateful entities.

Four statuses are available:

```text
DRAFT
PUBLISHED
CLOSED
FINISHED
```

---

## 1. DRAFT

A newly created event starts as:

```text
DRAFT
```

This represents an event that is still being configured.

Conceptually:

* organizer can prepare information,
* stages can be defined,
* attributes can be configured,
* event is not ready for public registration.

---

## 2. PUBLISHED

After configuration, an event can move to:

```text
PUBLISHED
```

This means the event is ready to become publicly accessible and available for registration.

---

## 3. CLOSED

Registration can later be closed.

```text
PUBLISHED
   ↓
CLOSED
```

Participants should no longer register after this point.

---

## 4. FINISHED

After the event is completed:

```text
CLOSED
   ↓
FINISHED
```

The event becomes final.

This state is important because post-event functionality such as:

```text
Feedback
Results
```

is conceptually tied to event completion.

---

# 🔁 Valid State Transitions

The serializer defines the following transition rules:

```text
DRAFT
  │
  ▼
PUBLISHED
  │
  ▼
CLOSED
  │
  ▼
FINISHED
```

Equivalent transition table:

| Current State | Allowed Next State |
| ------------- | ------------------ |
| DRAFT         | PUBLISHED          |
| PUBLISHED     | CLOSED             |
| CLOSED        | FINISHED           |
| FINISHED      | None               |

---

## Invalid Transition Examples

The following transitions are not considered valid:

```text
DRAFT → FINISHED
DRAFT → CLOSED
PUBLISHED → DRAFT
CLOSED → PUBLISHED
FINISHED → DRAFT
```

The serializer validates update requests and can reject invalid state transitions.

---

# 🧩 Multi-Stage Events

Event Planet supports events made of several stages.

This is useful because not every event is a single continuous session.

Examples include:

```text
Workshop
├── Session 1
├── Session 2
└── Session 3
```

or:

```text
Tournament
├── Qualification
├── Quarter Final
├── Semi Final
└── Final
```

or:

```text
Webinar
├── Introduction
├── Technical Session
└── Q&A
```

---

# 📌 EventStage

An `EventStage` belongs to exactly one Event.

It contains:

| Field            | Purpose                          |
| ---------------- | -------------------------------- |
| `event`          | Parent event                     |
| `title`          | Stage title                      |
| `description`    | Stage description                |
| `order`          | Position within event            |
| `start_time`     | Stage start                      |
| `end_time`       | Stage end                        |
| `stage_capacity` | Optional stage-specific capacity |
| `created_at`     | Creation timestamp               |
| `updated_at`     | Modification timestamp           |

---

# 🔢 Stage Ordering

Stages contain an explicit:

```text
order
```

field.

This allows stages to be displayed logically.

For example:

```text
order = 1 → Introduction
order = 2 → Main Session
order = 3 → Final Session
```

The model ordering is based on:

```text
order
start_time
```

This ensures a predictable ordering of stages.

---

# ⏱ Stage Time Validation

Like Events, stages require:

```text
end_time > start_time
```

A stage whose ending time precedes its starting time is invalid.

---

# 📦 Stage Capacity

A Stage may optionally specify:

```text
stage_capacity
```

A validation rule prevents:

```text
stage_capacity > event.capacity
```

Therefore:

```text
Stage Capacity ≤ Event Capacity
```

---

# 🎭 Stage Roles

Event stages can have users assigned to specialized roles.

The current role types are:

```text
SPEAKER
JUDGE
COACH
```

---

## Speaker

Suitable for:

* webinars,
* seminars,
* workshops,
* training events.

---

## Judge

Suitable for:

* tournaments,
* competitions,
* evaluation rounds.

---

## Coach

Suitable for:

* sports events,
* competitions,
* workshops.

---

## Duplicate Role Prevention

The database applies a uniqueness constraint on:

```text
stage + user + role_type
```

Therefore the exact same user cannot receive the exact same role multiple times for the same stage.

---

# 🎟 Registration Architecture

One of the most important architectural decisions in this project concerns registrations.

## Registration is Event-Based

In the current architecture:

```text
Registration
    │
    └── Event
```

rather than:

```text
Registration
    │
    └── EventStage
```

This means users register for the **entire event**, not independently for each stage.

---

# 💡 Why Event-Level Registration?

Event-level registration was selected because it provides a simpler and more consistent participant experience.

A participant registers once:

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

instead of registering separately for:

```text
Stage 1
Stage 2
Stage 3
```

This model is suitable when event stages are parts of one complete event package.

---

# 📦 Capacity Architecture

The primary capacity belongs to:

```text
Event.capacity
```

This represents the maximum overall number of participants.

Stages can optionally specify:

```text
EventStage.stage_capacity
```

but registrations themselves are attached to the Event.

Therefore, the **Event capacity is the authoritative registration capacity** in the current architecture.

---

# 📝 Registration Model

A registration associates:

```text
Participant
+
Event
```

The model contains:

| Field            | Description                |
| ---------------- | -------------------------- |
| `event`          | Registered event           |
| `participant`    | Registered user            |
| `payment_status` | Registration/payment state |
| timestamps       | Record history             |

---

# 💳 Registration / Payment States

Registration includes three possible states:

```text
PENDING
PAID
CANCELLED
```

---

## PENDING

The registration exists but has not yet been counted as a confirmed/paid registration.

---

## PAID

The registration is considered confirmed.

Confirmed registrations are counted when calculating remaining capacity.

---

## CANCELLED

The registration has been cancelled.

---

# 🚫 Duplicate Registration Prevention

A participant should not register for the same event more than once.

The database enforces uniqueness for:

```text
event + participant
```

This provides protection even if API validation is bypassed accidentally.

Conceptually:

```text
Participant #12 + Event #5 → Allowed
Participant #12 + Event #5 → Duplicate → Rejected
```

---

# 📊 Remaining Capacity

The Event model provides a remaining-capacity calculation.

Conceptually:

```python
remaining_capacity =
    event.capacity
    -
    confirmed_registrations
```

Only registrations in the appropriate confirmed state are counted.

The result is bounded at zero.

Therefore:

```text
remaining_capacity >= 0
```

---

# 🧬 Dynamic Attributes

One of the major architectural requirements of Event Planet is supporting different attributes for different event types.

A traditional database structure might add columns such as:

```text
round_count
platform
difficulty
field_type
recording_available
prerequisites
```

directly to the Event table.

This quickly becomes problematic.

---

# ❌ Why Not Add One Column Per Attribute?

Consider the following event categories:

```text
Tournament
Webinar
Workshop
Sports
```

A Tournament may need:

```text
number_of_rounds
elimination_type
```

A Webinar may need:

```text
platform
recording_available
```

A Workshop may need:

```text
difficulty
prerequisites
```

A Sports event may need:

```text
field_type
sport_category
```

If every possible attribute becomes an Event column, the Event model becomes:

* large,
* sparse,
* hard to maintain,
* difficult to extend,
* tightly coupled to event types.

---

# 🧩 EAV Design

Event Planet instead uses an EAV-style approach.

EAV means:

```text
Entity
Attribute
Value
```

In this project:

```text
Entity    → Event
Attribute → Attribute
Value     → EventAttributeValue
```

---

# 🏷 Attribute

`Attribute` represents a reusable metadata definition.

Examples:

```text
difficulty
platform
round_count
recording_available
field_type
```

An Attribute can be shared across multiple events.

---

# 🔗 EventAttributeValue

`EventAttributeValue` connects:

```text
Event
+
Attribute
+
Value
```

Example:

```text
Event:
Python Workshop

Attribute:
difficulty

Value:
Intermediate
```

Another Event could reuse the same attribute:

```text
Event:
Django Workshop

Attribute:
difficulty

Value:
Advanced
```

Therefore the attribute definition itself is reusable.

---

# 🚫 Duplicate Attribute Values

The combination:

```text
event + attribute
```

is unique.

This prevents an event from receiving multiple conflicting values for the exact same attribute definition.

---

# 💾 Why No JSONField?

The project architecture intentionally avoids storing all event metadata in a single unstructured JSON document.

The relational approach provides:

* reusable attribute definitions,
* explicit relationships,
* database-level constraints,
* easier normalization,
* better conceptual separation.

---

# 🔍 Dynamic Attribute Example

Suppose we create:

```text
Attribute #1
name = Difficulty
slug = difficulty
```

Then:

```text
Event #10
Python Workshop
```

can have:

```text
EventAttributeValue
event = Python Workshop
attribute = Difficulty
value = Intermediate
```

Meanwhile:

```text
Event #11
Advanced Django Workshop
```

can contain:

```text
EventAttributeValue
event = Advanced Django Workshop
attribute = Difficulty
value = Advanced
```

The `Attribute` itself is shared while the value belongs to each Event.

---

# ⭐ Feedback System

Event Planet contains a dedicated feedback model.

Feedback associates:

```text
Participant
+
Event
```

and stores:

```text
Rating
Comment
```

---

# 🌟 Rating

Feedback contains a small positive integer rating intended to represent values such as:

```text
1
2
3
4
5
```

The expected semantic range is:

```text
1 → Poor
5 → Excellent
```

---

# 💬 Comment

Participants can attach a textual comment to their feedback.

For example:

```text
"The workshop was very useful and well organized."
```

---

# 🚫 Duplicate Feedback

The model defines uniqueness for:

```text
event + participant
```

Therefore one participant can only have one feedback record for a particular event.

---

# 🕒 Feedback Business Rule

At the domain level, feedback is intended to become available after an event is finished.

Conceptually:

```text
Participant registered?
        │
       yes
        │
        ▼
Event FINISHED?
        │
       yes
        │
        ▼
Feedback Allowed
```

---

# 🏆 Results System

The Result model represents outcomes of an event.

A Result links:

```text
Event
+
Participant
```

and contains:

```text
score
details
```

---

# 🥇 Possible Result Examples

For a tournament:

```text
score = "1st Place"
```

For a competition:

```text
score = "92 / 100"
```

For a sports event:

```text
score = "Winner"
```

For another event:

```text
score = "Completed"
```

Additional information can be stored inside:

```text
details
```

---

# 🗄 Database Design

Event Planet uses PostgreSQL as its relational database.

A simplified entity view is:

```text
CustomUser
   │
   ├──────────────┐
   │              │
   ▼              ▼
Event          Registration
   │              │
   │              └── Participant
   │
   ├── EventStage
   │      │
   │      └── StageRole
   │
   ├── EventAttributeValue
   │       │
   │       └── Attribute
   │
   ├── Feedback
   │
   └── Result
```

---

# 🔗 Entity Relationships

## User → Events

```text
CustomUser
    │
    │ organizer
    ▼
Event
```

Relationship:

```text
One Organizer → Many Events
```

---

## Event → Stages

```text
Event
 │
 ├── Stage
 ├── Stage
 └── Stage
```

Relationship:

```text
One Event → Many EventStages
```

---

## Stage → Roles

```text
EventStage
 │
 ├── Speaker
 ├── Judge
 └── Coach
```

Relationship:

```text
One Stage → Many StageRoles
```

---

## Event → Registrations

```text
Event
 │
 ├── Registration A
 ├── Registration B
 └── Registration C
```

Relationship:

```text
One Event → Many Registrations
```

---

## Participant → Registrations

```text
Participant
 │
 ├── Event A
 ├── Event B
 └── Event C
```

Relationship:

```text
One Participant → Many Registrations
```

---

## Attribute → Values

```text
Attribute
 │
 ├── EventAttributeValue
 ├── EventAttributeValue
 └── EventAttributeValue
```

An Attribute definition can therefore be shared among multiple events.

---

# 📚 Model Reference

## CustomUser

```text
Base:
AbstractUser
TimeStampedModel

Extra Field:
role
```

Available roles:

```text
ORGANIZER
PARTICIPANT
```

---

## Event

Core fields:

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
created_at
updated_at
```

---

## EventStage

Core fields:

```text
event
title
description
order
start_time
end_time
stage_capacity
created_at
updated_at
```

---

## StageRole

Core fields:

```text
stage
user
role_type
```

Role types:

```text
SPEAKER
JUDGE
COACH
```

---

## Attribute

Core fields:

```text
name
slug
```

---

## EventAttributeValue

Core fields:

```text
event
attribute
value
```

---

## Registration

Core fields:

```text
event
participant
payment_status
```

---

## Feedback

Core fields:

```text
event
participant
rating
comment
```

---

## Result

Core fields:

```text
event
participant
score
details
```

---

# ⚙️ Business Rules

A platform like Event Planet requires business logic in addition to database models.

The principal business rules include the following.

---

## Rule 1 — Event Ownership

Every event belongs to an Organizer.

Conceptually:

```text
Event.organizer
```

represents its owner.

Only the owner should be allowed to perform owner-restricted management operations.

---

## Rule 2 — Valid Event Dates

```text
Event.end_time > Event.start_time
```

---

## Rule 3 — Valid Stage Dates

```text
EventStage.end_time > EventStage.start_time
```

---

## Rule 4 — Stage Capacity Limit

```text
stage_capacity <= event.capacity
```

---

## Rule 5 — State Transitions

Allowed:

```text
DRAFT → PUBLISHED
PUBLISHED → CLOSED
CLOSED → FINISHED
```

---

## Rule 6 — No Duplicate Event Registration

```text
Unique(event, participant)
```

---

## Rule 7 — No Duplicate Feedback

```text
Unique(event, participant)
```

---

## Rule 8 — No Duplicate Stage Role Assignment

```text
Unique(stage, user, role_type)
```

---

## Rule 9 — No Duplicate Attribute Value

```text
Unique(event, attribute)
```

---

# ✅ Validation Rules

Validation is implemented across multiple architectural layers.

These include:

```text
Django Model Validation
Serializer Validation
Database Constraints
Permission Classes
```

---

## Model Validation

Used for domain consistency such as:

```text
Event time validation
Stage time validation
Stage capacity validation
```

---

## Serializer Validation

Used for API-level validation such as:

```text
Event status transitions
```

---

## Database Constraints

Used for uniqueness guarantees such as:

```text
Registration uniqueness
Feedback uniqueness
Result uniqueness
StageRole uniqueness
EventAttributeValue uniqueness
```

---

# 🌐 API Architecture

The project follows a versioned API structure.

The base namespace is:

```text
/api/v1/
```

Current primary API groups include:

```text
/api/v1/user/
/api/v1/event/
/api/v1/attribute/
/api/v1/relation/
```

---

# 🔢 API Versioning

Including:

```text
v1
```

inside API URLs allows future versions to be introduced without immediately breaking existing clients.

For example:

```text
/api/v1/event/
```

could eventually coexist with:

```text
/api/v2/event/
```

---

# 🛣 API Endpoint Overview

## User API

Base route:

```text
/api/v1/user/
```

The User ViewSet provides a structure for user operations.

Custom actions include:

```text
register
login
profile
```

Conceptual routes:

```text
POST /api/v1/user/register/
POST /api/v1/user/login/
GET  /api/v1/user/profile/
PUT  /api/v1/user/profile/
PATCH /api/v1/user/profile/
```

---

# 🎪 Event API

Base route:

```text
/api/v1/event/
```

The Event application uses a DRF:

```text
ModelViewSet
```

which conventionally provides CRUD routes.

Examples:

```text
GET    /api/v1/event/
POST   /api/v1/event/
GET    /api/v1/event/{id}/
PUT    /api/v1/event/{id}/
PATCH  /api/v1/event/{id}/
DELETE /api/v1/event/{id}/
```

---

# 🧩 Stage API

Stages are routed under:

```text
/api/v1/event/stages/
```

Typical ViewSet routes include:

```text
GET    /api/v1/event/stages/
POST   /api/v1/event/stages/
GET    /api/v1/event/stages/{id}/
PUT    /api/v1/event/stages/{id}/
PATCH  /api/v1/event/stages/{id}/
DELETE /api/v1/event/stages/{id}/
```

---

# 🧬 Attribute API

Base route:

```text
/api/v1/attribute/
```

Typical routes include:

```text
GET    /api/v1/attribute/
POST   /api/v1/attribute/
GET    /api/v1/attribute/{id}/
PUT    /api/v1/attribute/{id}/
PATCH  /api/v1/attribute/{id}/
DELETE /api/v1/attribute/{id}/
```

---

# 🎟 Registration API

Registration routes are grouped under:

```text
/api/v1/relation/
```

and currently use:

```text
registrations
```

as the router prefix.

Therefore the base registration URL is:

```text
/api/v1/relation/registrations/
```

Typical routes:

```text
GET    /api/v1/relation/registrations/
POST   /api/v1/relation/registrations/
GET    /api/v1/relation/registrations/{id}/
PUT    /api/v1/relation/registrations/{id}/
PATCH  /api/v1/relation/registrations/{id}/
DELETE /api/v1/relation/registrations/{id}/
```

---

# 🔎 Filtering, Searching and Ordering

The Event API uses DRF and django-filter backends.

Configured backend concepts include:

```text
DjangoFilterBackend
SearchFilter
OrderingFilter
```

---

## Event Filtering

Events support filtering around domain fields such as:

```text
status
category
```

Example concept:

```http
GET /api/v1/event/?status=PUBLISHED
```

Another example:

```http
GET /api/v1/event/?category=WORKSHOP
```

Combined:

```http
GET /api/v1/event/?status=PUBLISHED&category=WORKSHOP
```

---

# 🔍 Event Search

Search fields include:

```text
title
description
```

Conceptually:

```http
GET /api/v1/event/?search=python
```

---

# ↕️ Event Ordering

Ordering functionality is also enabled.

This allows clients to request event results in an appropriate order where supported by configured fields.

---

# 🔎 Attribute Search

The Attribute API also contains search functionality.

Attributes can be searched by their metadata fields such as:

```text
name
```

---

# 🖥 Frontend

Although Event Planet is designed as an **API-first application**, the repository also contains a lightweight web interface.

The frontend lives inside:

```text
frontend/
```

and is divided into:

```text
templates/
static/
```

---

# 🏠 Home Page

The root URL:

```text
/
```

renders:

```text
index.html
```

The home page contains event-category sections for:

```text
Tournament
Webinar
Workshop
Sports
```

It also includes UI elements for:

```text
Published events
Search
Category filtering
Event listing
```

---

# 👤 Profile Page

A dedicated profile page is available at:

```text
/profile/
```

and renders:

```text
profile.html
```

The page contains UI components for:

* username,
* email,
* role display,
* profile editing,
* password-related form controls.

---

# 🧱 Frontend Architecture

The frontend is intentionally lightweight.

Conceptually:

```text
Django Template
      │
      ├── HTML
      ├── CSS
      └── JavaScript
             │
             ▼
         REST API
```

The backend remains responsible for domain entities and persistent data.

---

# 🎨 Event Categories in UI

The frontend home page provides category cards for:

```text
TOURNAMENT
WEBINAR
WORKSHOP
SPORTS
```

These match the Event categories defined in the backend model.

---

# 🔍 Frontend Search

The home interface also contains a search input intended for event discovery.

This allows users to search event titles from the UI.

---

# 🐳 Docker

Event Planet is fully prepared for containerized development.

The repository contains:

```text
Dockerfile
docker-compose.yml
.dockerignore
```

---

# 🧱 Docker Architecture

The Compose stack contains two main services:

```text
web
db
```

Architecture:

```text
┌─────────────────────┐
│        Browser      │
└──────────┬──────────┘
           │
           │ localhost:3000
           ▼
┌─────────────────────┐
│     Django Web      │
│     Container       │
│                     │
│ Internal Port 8000  │
└──────────┬──────────┘
           │
           │ PostgreSQL connection
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      Container      │
│                     │
│ Internal Port 5432  │
└─────────────────────┘
```

---

# 🐍 Web Container

The Django container is built using:

```text
python:3.11-slim
```

The container:

1. configures Python environment behavior,
2. installs required system packages,
3. copies `requirements.txt`,
4. installs Python dependencies,
5. copies project source code,
6. runs database migrations,
7. starts the Django development server.

---

# 🗃 Database Container

PostgreSQL uses:

```text
postgres:15-alpine
```

The Alpine-based image provides a relatively lightweight database container.

---

# 🔌 Docker Ports

Current Compose mapping:

```text
Django:
Host 3000 → Container 8000
```

Therefore the application is normally available at:

```text
http://localhost:3000
```

The PostgreSQL service maps its database port separately for host access.

---

# 📦 Docker Volumes

The project directory is mounted inside the Django container.

Conceptually:

```text
Current Project Directory
        │
        ▼
      /app
```

This is useful during development because source-code changes can become visible inside the running container.

---

# 🔗 Service Dependency

The Django service declares a dependency on:

```text
db
```

Therefore the architecture explicitly communicates that the web application requires PostgreSQL.

---

# ⚙️ Environment Variables

The application loads configuration from:

```text
.env
```

using:

```text
python-dotenv
```

A recommended `.env` structure is:

```env
SECRET_KEY=your-secure-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=event_planet_db
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_HOST=db
DB_PORT=5432
```

---

# 🔐 `SECRET_KEY`

Used internally by Django for cryptographic signing.

Example:

```env
SECRET_KEY=replace-this-with-a-secure-random-secret
```

Never expose a real production secret key publicly.

---

# 🐞 `DEBUG`

For local development:

```env
DEBUG=True
```

For production:

```env
DEBUG=False
```

---

# 🌍 `ALLOWED_HOSTS`

Example:

```env
ALLOWED_HOSTS=127.0.0.1,localhost
```

Multiple hosts can be separated by commas.

---

# 🗃 `DB_NAME`

Example:

```env
DB_NAME=event_planet_db
```

---

# 👤 `DB_USER`

Example:

```env
DB_USER=postgres
```

---

# 🔑 `DB_PASSWORD`

Example:

```env
DB_PASSWORD=change_me
```

Use a strong value outside local throwaway development.

---

# 🌐 `DB_HOST`

When Django runs inside Docker Compose:

```env
DB_HOST=db
```

because Compose service names can be used for internal service discovery.

When PostgreSQL runs directly on the host:

```env
DB_HOST=127.0.0.1
```

---

# 🔌 `DB_PORT`

Inside the Docker Compose network:

```env
DB_PORT=5432
```

---

# 📥 Installation

There are two main ways to run Event Planet.

```text
1. Docker — recommended
2. Local Python environment
```

---

# 🐳 Running With Docker

## Step 1 — Clone Repository

```bash
git clone https://github.com/ZahraAghaeii/event_planet_daneshkar.git
```

Move into the project:

```bash
cd event_planet_daneshkar
```

---

## Step 2 — Create `.env`

Create:

```text
.env
```

in the root of the project.

Example:

```env
SECRET_KEY=development-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=event_planet_db
DB_USER=postgres
DB_PASSWORD=change_me
DB_HOST=db
DB_PORT=5432
```

Make sure your Compose database configuration and `.env` values are consistent.

---

# ▶️ Step 3 — Build and Start

Run:

```bash
docker compose up --build
```

or in older Docker Compose installations:

```bash
docker-compose up --build
```

---

# 🔄 Migration Execution

The current container command automatically runs:

```bash
python manage.py migrate
```

before starting Django.

Conceptually:

```text
Container Start
      │
      ▼
Run Migrations
      │
      ▼
Start Django
```

---

# 🌍 Open The Application

After successful startup:

```text
http://localhost:3000
```

Django Admin:

```text
http://localhost:3000/admin/
```

API base:

```text
http://localhost:3000/api/v1/
```

---

# 🛑 Stop Containers

Use:

```bash
docker compose down
```

---

# 🔁 Rebuild Containers

After dependency or Dockerfile changes:

```bash
docker compose up --build
```

---

# 📋 View Logs

```bash
docker compose logs
```

Follow logs:

```bash
docker compose logs -f
```

---

# 📦 List Containers

```bash
docker compose ps
```

---

# 🐚 Enter Django Container

```bash
docker compose exec web sh
```

---

# 🐘 Enter PostgreSQL

Example:

```bash
docker compose exec db psql -U postgres -d event_planet_db
```

Use credentials matching your configured environment.

---

# 💻 Running Without Docker

Docker is the recommended method, but the application can also be executed locally.

---

## Step 1 — Clone

```bash
git clone https://github.com/ZahraAghaeii/event_planet_daneshkar.git
cd event_planet_daneshkar
```

---

## Step 2 — Create Virtual Environment

Windows:

```bash
python -m venv venv
```

Linux/macOS:

```bash
python3 -m venv venv
```

---

## Step 3 — Activate Environment

Windows CMD:

```bash
venv\Scripts\activate
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source venv/bin/activate
```

---

# 📦 Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

# 🐘 Configure PostgreSQL

Create a PostgreSQL database.

Example:

```text
event_planet_db
```

Then configure `.env`:

```env
DB_NAME=event_planet_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432
```

---

# 🗄 Database Migrations

Create migrations when required:

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```

---

# ▶️ Start Development Server

```bash
python manage.py runserver
```

Default local URL:

```text
http://127.0.0.1:8000/
```

---

# 👑 Creating a Superuser

Using Docker:

```bash
docker compose exec web python manage.py createsuperuser
```

Without Docker:

```bash
python manage.py createsuperuser
```

Django asks for information such as:

```text
Username
Email
Password
```

---

# 🛡 Django Admin

After creating a superuser, visit:

```text
/admin/
```

Docker example:

```text
http://localhost:3000/admin/
```

Local example:

```text
http://127.0.0.1:8000/admin/
```

The admin interface can be used during development for inspecting database objects.

---

# ⚙️ Configuration

The central Django configuration lives inside:

```text
config/settings.py
```

Important settings include:

```text
INSTALLED_APPS
MIDDLEWARE
DATABASES
REST_FRAMEWORK
SIMPLE_JWT
TEMPLATES
STATICFILES_DIRS
MEDIA_ROOT
AUTH_USER_MODEL
```

---

# 📦 Installed Applications

Project-specific Django applications:

```text
user
event
attribute
relation
core
```

Third-party applications include:

```text
rest_framework
rest_framework_simplejwt
corsheaders
django_filters
```

---

# 👤 Custom User Model

Django is configured with:

```text
AUTH_USER_MODEL = user.CustomUser
```

This enables the platform-specific role system.

---

# 🌎 Localization

The project uses:

```text
LANGUAGE_CODE = fa-ir
TIME_ZONE = Asia/Tehran
```

Internationalization and timezone-aware datetimes are enabled.

---

# 🖼 Media

Uploaded files such as Event banner images use:

```text
MEDIA_URL
MEDIA_ROOT
```

Event banner images are configured to upload under an event-specific media directory.

---

# 🎨 Static Files

Static frontend resources are loaded from:

```text
frontend/static
```

Django templates are loaded from:

```text
frontend/templates
```

---

# 🔄 CORS

The project includes:

```text
django-cors-headers
```

to allow frontend/API communication.

The current development configuration is permissive.

For production, allowed origins should be explicitly restricted.

---

# 🔒 Security Considerations

Although Event Planet is primarily an educational/development project, production deployment should consider several security practices.

---

## 1. Protect Secret Keys

Never commit a real production:

```text
SECRET_KEY
```

---

## 2. Protect Database Credentials

Database credentials should be stored in environment variables rather than committed directly into source-controlled configuration.

---

## 3. Disable Debug Mode

Production:

```env
DEBUG=False
```

---

## 4. Restrict Allowed Hosts

Production should explicitly define:

```text
ALLOWED_HOSTS
```

---

## 5. Restrict CORS

Instead of allowing every origin, production should explicitly define trusted frontend origins.

---

## 6. Use HTTPS

JWT tokens should be transmitted over HTTPS in production.

---

## 7. Validate Permissions

Sensitive actions must be checked on the backend.

Frontend role checks should never be treated as security enforcement.

---

## 8. Use Strong Passwords

Django password validators are enabled and provide:

* similarity checks,
* minimum length validation,
* common-password rejection,
* numeric-password checks.

---

# 🚨 Error Handling

Django REST Framework provides structured API errors.

Possible classes of errors include:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
500 Internal Server Error
```

---

# ❌ Validation Error Example

An invalid event status transition may conceptually produce:

```json
{
  "status": [
    "Invalid event state transition."
  ]
}
```

---

# ❌ Invalid Date Example

If:

```text
end_time <= start_time
```

model validation rejects the object.

---

# ❌ Duplicate Registration

The database uniqueness rule protects against:

```text
same participant
+
same event
+
multiple registration rows
```

---

# 🧪 Development Workflow

A typical development workflow is:

```text
1. Create branch
2. Implement domain change
3. Create migration
4. Apply migration
5. Test API
6. Verify database behavior
7. Commit
8. Push
```

---

# 🌿 Git Example

Create a branch:

```bash
git checkout -b feature/new-feature
```

Check status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add new feature"
```

Push:

```bash
git push origin feature/new-feature
```

---

# 🧪 Testing

Each Django app contains a:

```text
tests.py
```

module.

Recommended test categories include:

```text
Model tests
Serializer tests
Permission tests
API tests
Authentication tests
Business-rule tests
Database constraint tests
```

---

# ✅ Suggested Event Tests

Examples:

```text
Event end date must follow start date
Slug generation works
Invalid status transition is rejected
Stage capacity cannot exceed event capacity
Stage end time must follow start time
```

---

# ✅ Suggested Registration Tests

Examples:

```text
Duplicate registration is rejected
Participant can inspect own registrations
Unauthenticated user cannot access protected registration API
Capacity is calculated correctly
Cancelled registrations are treated correctly
```

---

# ✅ Suggested Permission Tests

Examples:

```text
Organizer can modify owned event
Organizer cannot modify another organizer's event
Participant cannot access organizer-only operations
Unauthenticated users cannot access protected routes
```

---

# ✅ Suggested Feedback Tests

Examples:

```text
Registered participant can submit feedback after completion
Unregistered participant cannot submit feedback
Feedback before FINISHED state is rejected
Duplicate feedback is rejected
```

---

# ✅ Suggested Attribute Tests

Examples:

```text
Attribute can be reused by multiple events
Same event cannot have duplicate value for one attribute
Deleting an event removes its related values
```

---

# 📌 Current Implementation Notes

The repository represents an actively developed educational project.

The domain model already defines most major concepts required by Event Planet, including:

```text
Users
Roles
Events
Lifecycle
Stages
Stage Roles
Dynamic Attributes
Registrations
Feedback
Results
PostgreSQL
JWT configuration
Docker
Frontend
```

Some integration points should still be kept synchronized as the codebase evolves.

In particular, whenever models change, the following layers should be reviewed together:

```text
models.py
serializers.py
views.py
urls.py
frontend API calls
tests.py
```

This prevents serializers or ViewSets from referencing renamed or removed fields.

---

# 🔧 Serializer / Model Synchronization

A recommended development rule is:

> Whenever a model field is renamed, immediately update every serializer, ViewSet, frontend request, and test using that field.

For example:

```text
Event.organizer
```

must use the same name throughout:

```text
Model
Serializer
ViewSet
Permissions
Frontend
Tests
```

Likewise:

```text
Registration.participant
```

should remain consistent throughout the complete registration flow.

---

# 🔐 Permission Enforcement

The project contains a reusable permission concept:

```text
IsOwnerOrReadOnly
```

which checks whether the current user owns an object through its organizer field.

For production-complete behavior, object-level permissions should be consistently attached to the appropriate organizer endpoints.

The important principle is:

```text
Frontend visibility ≠ Authorization
```

The backend must always be responsible for actual authorization.

---

# 🧬 Typed Dynamic Attribute Values

The dynamic-attribute architecture is based on EAV-style relational storage.

The current model provides the fundamental relationship:

```text
Event
Attribute
Value
```

A possible future extension is explicit safe typed-value support.

For example:

```text
STRING
NUMBER
BOOLEAN
DATE
```

with separate validated storage appropriate to each type.

This would allow type-aware queries and stronger validation while retaining the EAV architecture.

---

# ⭐ Feedback and Result APIs

`Feedback` and `Result` already exist as domain models.

A natural next step is exposing dedicated ViewSets and routes such as:

```text
/api/v1/relation/feedbacks/
/api/v1/relation/results/
```

with the required business-rule checks.

---

# 🛠 Possible Future Improvements

Event Planet can be expanded in many directions.

---

## 🔐 Authentication Improvements

Possible improvements:

* dedicated JWT token obtain endpoint,
* refresh-token endpoint,
* token blacklist,
* logout flow,
* email verification,
* password reset,
* account activation.

---

## 🛡 Authorization Improvements

Possible improvements:

* `IsOrganizer`
* `IsParticipant`
* `IsEventOwner`
* `IsRegisteredParticipant`
* `CanSubmitFeedback`
* `CanPublishResults`

---

## 🎟 Registration Improvements

Possible additions:

```text
Waiting List
Ticket Number
QR Code
Check-in
Cancellation Deadline
Registration Timestamp
Payment Gateway
```

---

## 📬 Notifications

Notifications could be generated when:

* user registers,
* event is published,
* event time changes,
* registration closes,
* event starts,
* results are published.

Possible delivery channels:

```text
Email
In-app notification
Push notification
SMS
```

---

## 📆 Calendar Support

Possible integration:

```text
Google Calendar
iCalendar / ICS
Outlook Calendar
```

---

## 📊 Organizer Dashboard

Possible statistics:

```text
Total Events
Published Events
Upcoming Events
Participant Count
Registration Conversion
Average Rating
Remaining Capacity
```

---

## 🔎 Advanced Search

Future filters could include:

```text
Date Range
Capacity
Available Seats
Organizer
Category
Dynamic Attributes
Event Status
```

---

## 🗺 Location Support

Future events could support:

```text
Online
In-person
Hybrid
```

with information such as:

```text
Address
City
Coordinates
Online Meeting URL
```

---

## 🎫 Ticketing

Future ticket models could include:

```text
Free
Paid
VIP
Student
Early Bird
```

---

## 💳 Payments

Possible integration with a payment provider could support:

```text
Payment initiation
Payment verification
Refund
Transaction history
```

---

## 📷 Media

Events could support:

```text
Multiple images
Video trailers
Documents
Attachments
Certificates
```

---

## 📃 API Documentation

The API could be documented automatically using:

```text
OpenAPI
Swagger UI
ReDoc
drf-spectacular
```

Potential routes:

```text
/api/schema/
/api/docs/
/api/redoc/
```

---

## ⚡ Performance

Future optimization could include:

```text
select_related
prefetch_related
database indexes
Redis caching
pagination
query optimization
```

---

## 🚀 Production Deployment

Possible production infrastructure:

```text
Gunicorn
Nginx
PostgreSQL
Docker
Redis
Celery
Cloud Storage
HTTPS
```

---

## 🧵 Background Tasks

Celery could handle:

```text
Email notifications
Scheduled reminders
Certificate generation
Reports
Large exports
```

---

## 🗃 Redis

Redis could support:

```text
Caching
Celery broker
Rate limiting
Temporary sessions
```

---

# 🧠 Design Decisions

This section documents important architecture decisions made for Event Planet.

---

# Decision 1 — API First

The backend is the primary application interface.

Why?

Because APIs make it possible to support multiple clients:

```text
Web Application
Mobile App
Desktop App
Third-party integration
Admin Dashboard
```

without rewriting the core business logic.

---

# Decision 2 — PostgreSQL

PostgreSQL was selected because the domain is fundamentally relational.

The project contains relationships such as:

```text
Organizer → Event
Event → Stage
Event → Registration
Participant → Registration
Event → Dynamic Attribute Value
Event → Feedback
Event → Result
```

A relational database provides:

* foreign keys,
* uniqueness,
* constraints,
* transactions,
* predictable relations.

---

# Decision 3 — Custom User Model

A custom model was selected from the beginning because the platform needs additional user-domain information such as:

```text
role
```

Using a custom user model early is preferable to replacing Django's default user after the database has already evolved.

---

# Decision 4 — Separate Django Apps

The project separates major responsibilities into:

```text
user
event
attribute
relation
core
```

This prevents one extremely large Django app from owning every responsibility.

Benefits:

* easier navigation,
* clearer boundaries,
* lower coupling,
* better maintainability,
* easier future testing.

---

# Decision 5 — Event-Level Registration

Registration is performed for the entire event.

Therefore:

```text
Registration → Event
```

rather than:

```text
Registration → EventStage
```

This means a participant joins an event as one conceptual unit.

Stages describe the internal structure of that event.

---

# Decision 6 — Event-Level Main Capacity

The main registration capacity belongs to the Event.

```text
Event.capacity
```

Stages may have optional capacities, but the Event remains the primary registration unit.

---

# Decision 7 — Explicit Event Lifecycle

Instead of treating event status as arbitrary text, the domain defines a state machine:

```text
DRAFT
   ↓
PUBLISHED
   ↓
CLOSED
   ↓
FINISHED
```

This makes domain behavior easier to reason about.

---

# Decision 8 — Dynamic Attributes via Relations

Custom event properties are separated from the Event table.

Instead of:

```text
Event.platform
Event.round_count
Event.difficulty
Event.field_type
...
```

the project uses:

```text
Attribute
+
EventAttributeValue
```

This provides extensibility without adding a column for every new event property.

---

# Decision 9 — Shared Timestamp Model

All timestamped domain objects can inherit from one reusable abstraction.

This follows the DRY principle:

```text
Don't Repeat Yourself
```

---

# Decision 10 — Dockerized Development

Docker reduces environment differences between developers.

Instead of requiring everyone to manually configure exactly matching versions, the project describes its environment through:

```text
Dockerfile
docker-compose.yml
requirements.txt
```

---

# 🧠 Why This Architecture?

Event Planet is not designed only around controllers and CRUD endpoints.

It tries to represent a real domain.

For example, an Event is not simply:

```text
title
description
```

It has:

```text
ownership
lifecycle
capacity
stages
attributes
registrations
feedback
results
```

This domain-oriented design makes the project more representative of real backend software.

---

# 🔄 Example Complete Workflow

A complete conceptual scenario could be:

### Step 1

Organizer registers.

```text
role = ORGANIZER
```

### Step 2

Organizer creates:

```text
Django Advanced Workshop
```

with:

```text
category = WORKSHOP
capacity = 30
status = DRAFT
```

### Step 3

Organizer creates stages:

```text
1. Django Fundamentals
2. Django REST Framework
3. Deployment
```

### Step 4

Organizer creates/reuses an Attribute:

```text
Difficulty
```

and assigns:

```text
Advanced
```

to the workshop.

### Step 5

Event moves:

```text
DRAFT → PUBLISHED
```

### Step 6

Participants discover the event.

### Step 7

Participants register.

### Step 8

Confirmed registrations reduce available capacity.

### Step 9

Registration closes:

```text
PUBLISHED → CLOSED
```

### Step 10

After completion:

```text
CLOSED → FINISHED
```

### Step 11

Participants can provide feedback according to final business-rule enforcement.

### Step 12

Organizer can publish/store results.

This demonstrates how the models work together as a complete system rather than independent CRUD tables.

---

# 📐 Domain Diagram

```text
                         ┌───────────────────┐
                         │    CustomUser     │
                         │                   │
                         │ ORGANIZER         │
                         │ PARTICIPANT       │
                         └─────────┬─────────┘
                                   │
                                   │ organizes
                                   ▼
                         ┌───────────────────┐
                         │       Event       │
                         │                   │
                         │ title             │
                         │ status            │
                         │ category          │
                         │ capacity          │
                         └─────┬─────┬───────┘
                               │     │
                      stages   │     │ attributes
                               │     │
                               ▼     ▼
                    ┌────────────┐  ┌─────────────────────┐
                    │ EventStage │  │ EventAttributeValue │
                    └─────┬──────┘  └──────────┬──────────┘
                          │                    │
                          │ roles              │
                          ▼                    ▼
                    ┌────────────┐       ┌───────────┐
                    │ StageRole  │       │ Attribute │
                    └────────────┘       └───────────┘


         CustomUser
             │
             │ participant
             ▼
      ┌──────────────┐
      │ Registration │──────────────► Event
      └──────────────┘

             │
             ├──────────────────────► Feedback
             │
             └──────────────────────► Result
```

---

# 📈 Scalability Considerations

The modular architecture allows future services to evolve independently.

For example:

```text
event
```

could eventually contain more sophisticated lifecycle logic.

```text
relation
```

could evolve into ticketing and payments.

```text
attribute
```

could evolve into a generic typed metadata engine.

```text
user
```

could evolve into organization/team management.

---

# 🧹 Code Organization Principles

The project follows several common software-engineering principles.

---

## Separation of Concerns

Responsibilities are split across applications.

---

## DRY

Common timestamps are implemented through:

```text
TimeStampedModel
```

rather than duplicated.

---

## API First

Business data is exposed through REST APIs.

---

## Database Constraints

Important uniqueness rules are enforced at database level.

---

## Environment-Based Configuration

Sensitive or environment-specific settings can be provided using:

```text
.env
```

---

## Containerization

Runtime configuration is reproducible using Docker.

---

# 📦 Production Checklist

Before using Event Planet in a production environment, consider completing the following:

```text
[ ] DEBUG=False
[ ] Strong SECRET_KEY
[ ] Secure PostgreSQL password
[ ] Restrict ALLOWED_HOSTS
[ ] Restrict CORS origins
[ ] Enable HTTPS
[ ] Configure production server such as Gunicorn
[ ] Configure Nginx or another reverse proxy
[ ] Configure static-file serving
[ ] Configure persistent media storage
[ ] Add complete permission enforcement
[ ] Add API test coverage
[ ] Add database backups
[ ] Add monitoring/logging
[ ] Add rate limiting where required
[ ] Review JWT expiration and refresh strategy
```

---

# 🧾 API Client Example

A client communicating with a JWT-protected endpoint should send:

```http
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json
```

Example conceptual request:

```http
GET /api/v1/relation/registrations/
Authorization: Bearer eyJ...
```

---

# 📄 Example Event Payload

A conceptual Event request could look like:

```json
{
  "title": "Advanced Django Workshop",
  "description": "A practical workshop about advanced Django concepts.",
  "category": "WORKSHOP",
  "capacity": 30,
  "status": "DRAFT",
  "start_time": "2026-10-10T09:00:00+03:30",
  "end_time": "2026-10-10T16:00:00+03:30"
}
```

---

# 📄 Example Stage Concept

```json
{
  "event": 1,
  "title": "Django REST Framework",
  "description": "Building production-ready REST APIs.",
  "order": 2,
  "start_time": "2026-10-10T11:00:00+03:30",
  "end_time": "2026-10-10T13:00:00+03:30",
  "stage_capacity": 30
}
```

---

# 📄 Example Attribute Concept

```json
{
  "name": "Difficulty",
  "slug": "difficulty"
}
```

---

# 📄 Example Registration Concept

```json
{
  "event": 1
}
```

The authenticated user should be associated with the registration by backend logic rather than allowing arbitrary participant impersonation.

---

# 📄 Example Feedback Concept

```json
{
  "event": 1,
  "rating": 5,
  "comment": "Excellent event."
}
```

---

# 📄 Example Result Concept

```json
{
  "event": 1,
  "participant": 12,
  "score": "1st Place",
  "details": "Winner of the final round."
}
```

---

# 💡 Important Backend Principle

User identity should come from authenticated server context whenever possible.

Conceptually:

```python
request.user
```

should determine actions such as:

```text
who created an event
who registered
who submitted feedback
```

rather than trusting arbitrary user IDs supplied by clients.

---

# 🔐 Ownership Principle

For organizer-managed resources:

```text
request.user
        │
        ▼
Is this event's organizer?
        │
     ┌──┴──┐
     │     │
    Yes    No
     │     │
     ▼     ▼
  Allow   Deny
```

---

# 📌 Public vs Protected Data

A clean API architecture can classify endpoints into:

```text
Public
Participant
Organizer
```

---

## Public

Suitable for:

```text
Published event list
Published event detail
Published final results
```

---

## Participant

Suitable for:

```text
Register for event
View own registrations
Submit feedback
```

---

## Organizer

Suitable for:

```text
Create event
Update owned event
Manage stages
Manage attributes
View participants
Manage lifecycle
Publish results
```

---

# 🗂 Recommended API Expansion

As the project evolves, APIs could become more explicitly grouped.

For example:

```text
/api/v1/public/events/
/api/v1/public/events/{id}/results/

/api/v1/participant/registrations/
/api/v1/participant/feedbacks/

/api/v1/organizer/events/
/api/v1/organizer/events/{id}/stages/
/api/v1/organizer/events/{id}/participants/
/api/v1/organizer/events/{id}/results/
```

The current project instead organizes URLs primarily around Django applications.

Both structures are valid depending on the desired architecture.

---

# 📝 API Documentation Philosophy

API documentation should describe:

```text
HTTP method
URL
Authentication
Required role
Request body
Response body
Validation
Possible errors
```

Example:

```text
POST /api/v1/relation/registrations/

Authentication:
Required

Role:
Participant

Purpose:
Register authenticated participant for an event

Validation:
- Event must exist
- Event must accept registration
- Capacity must be available
- Duplicate registration is forbidden
```

---

# 🔬 Database Integrity

Application validation improves user-facing errors, but database constraints provide a second line of defense.

Event Planet uses relational uniqueness rules where appropriate.

This protects the database from invalid duplicate relationships.

---

# 🔄 Cascading Deletes

Foreign keys frequently use:

```text
on_delete=CASCADE
```

This means dependent entities are automatically removed when their owning object is deleted.

For example:

```text
Delete Event
    │
    ├── Delete Stages
    ├── Delete Attribute Values
    ├── Delete Registrations
    ├── Delete Feedback
    └── Delete Results
```

This behavior should always be considered when deleting domain objects.

---

# 🕒 Timestamps

Most domain entities inherit:

```text
created_at
updated_at
```

These fields are useful for:

```text
auditing
sorting
debugging
analytics
history
```

---

# 📊 Future Analytics

Because timestamps and registrations are available, future analytics could measure:

```text
registrations per day
capacity utilization
event popularity
average feedback
organizer activity
category distribution
```

---

# 🎓 Educational Value

Event Planet demonstrates several important backend concepts in one project:

```text
Custom User Models
Role-Based Systems
JWT Authentication
REST APIs
ModelViewSets
Serializers
Object Relationships
State Machines
Database Constraints
EAV Modeling
Docker
PostgreSQL
Environment Variables
Frontend/API Integration
```

It is therefore not only an event-management application but also an example of constructing a modular Django backend around business requirements.

---

# 🔗 Repository

GitHub Repository:

```text
https://github.com/ZahraAghaeii/event_planet_daneshkar
```

Clone:

```bash
git clone https://github.com/ZahraAghaeii/event_planet_daneshkar.git
```

---

# 👩‍💻 Maintainer

**Repository Owner / Maintainer**

```text
ZahraAghaeii
```

GitHub:

```text
https://github.com/ZahraAghaeii
```

---

# 🌟 Final Notes

Event Planet was designed around the idea that an event-management system is much more than a table of events.

Real event-management software requires:

```text
Users
Roles
Ownership
Lifecycle Management
Stages
Capacity
Registrations
Dynamic Metadata
Feedback
Results
Authentication
Authorization
Deployment
```

The project therefore separates these concerns into independent Django applications and represents them using relational domain models.

The final architecture can be summarized as:

```text
                       EVENT PLANET

                            │
                            ▼
                     REST API Layer
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
           User            Event        Relationships
            │               │               │
            │        ┌──────┴──────┐        │
            │        │             │        │
            ▼        ▼             ▼        ▼
          Roles    Stages       Attributes Registration
                             
                                             │
                                      ┌──────┴──────┐
                                      ▼             ▼
                                  Feedback        Results

                            │
                            ▼
                       PostgreSQL

                            │
                            ▼
                          Docker
```

The architecture is intentionally modular so that individual parts of the system can continue to evolve without turning the application into a single tightly coupled codebase.

---

<div align="center">

## 🌍 Event Planet

### Build events. Connect people. Manage experiences.

**Built with Django REST Framework, PostgreSQL and Docker.**

<br>

⭐ If you find this project useful, consider giving the repository a star.

</div>
