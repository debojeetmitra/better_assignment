# Architectural Principles - Nexus

This document outlines the core technical decisions aimed at maintaining understandability and correctness as the system evolves.

## 1. Domain Driven Design (DDD) Lite
- Each module (Incidents, Projects, Users) has its own clear boundaries.
- Models reflect the domain, not just the database table.

## 2. Immutability & Auditability
- Feedback and Incident history should be append-only where possible.
- Soft deletes instead of hard deletes to maintain relational integrity.

## 3. Schema Consistency
- Frontend and Backend use a shared JSON contract.
- Any change to the API response must be reflected in the Marshmallow schemas.

## 4. Error Handling
- Global error handler in Flask for standard JSON error responses.
- Explicit `BaseException` classes for custom logic errors (e.g., `ValidationError`, `BusinessRuleException`).
