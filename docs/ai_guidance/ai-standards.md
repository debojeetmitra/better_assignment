# AI Coding Standards for Project Nexus

These standards are designed to ensure that AI-generated code remains understandable, correct, and resilient to change.

## 1. Interface Safety (Strict Schemas)
- All API inputs and outputs **must** pass through a validation layer (Marshmallow or Pydantic).
- Forbidden: Using raw dictionaries (`request.json['key']`) directly in business logic.
- Purpose: Prevent invalid states and provide clear error messages to the frontend.

## 2. Change Resilience (Layered Architecture)
- **Models**: Simple SQLAlchemy definitions (The "Data" layer).
- **Services**: Pure logic that operates on models (The "Logic" layer).
- **Routes**: Handle HTTP concerns, call services, and return schemas (The "Interface" layer).
- Why: Logic changes shouldn't break the database schema, and vice versa.

## 3. Predictable State Transitions
- Use Enums for `Status` fields (e.g., `Status.OPEN`, `Status.RESOLVED`).
- Logic for state changes (e.g., "Cannot resolve an incident without a description") must reside in the Service layer.

## 4. Verification (Test-Driven Logic)
- Every Service method must have a corresponding unit test in `backend/tests`.
- AI should prioritize writing failing tests before implementing complex logic.

## 5. Observability
- Use standard HTTP status codes:
    - `200/201`: Success
    - `400`: Client Error (Validation failed)
    - `404`: Not Found
    - `500`: Server Error (Unexpected failure)
- Logic failures (e.g., business rule violation) should return `422 Unprocessable Entity`.

## 6. Aesthetics & UX
- Frontend must use a curated color palette (no default red/blue).
- All interactive elements must have hover/active states.
- Shimmer loading states or spinners for all async operations.
