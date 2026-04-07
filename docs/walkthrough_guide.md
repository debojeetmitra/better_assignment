# 🎥 Walkthrough Guide - Nexus (Hire Better Task)

Use this script as a guide for your 10–15 minute recording. Focus on **"Why"** rather than just "What."

---

## 1. Introduction (1 min)
- **Goal**: Introduce Nexus as a centralized incident hub.
- **Key point**: Mention the emphasis on **Interface Safety** and **Change Resilience**.

## 2. Architecture & Relational Structure (3 mins)
- **Show Code**: `backend/app/models.py`.
- **Talk about**: One-to-Many (Project-Incident) and Many-to-Many (Incident-Tag).
- **Why**: "Relational Integrity prevents orphaned incidents and allows for robust categorization."

## 3. Interface Safety & Correctness (3 mins)
- **Show Code**: `backend/app/schemas.py`.
- **Talk about**: Strict Marshmallow validation.
- **Show Logic**: `backend/app/routes.py` (the `Status.RESOLVED` check).
- **Demo**: Try resolving a short incident in the UI (it should fail with a 422).
- **Point**: "We enforce business rules at the API boundary to prevent invalid states."

## 4. Change Resilience (2 mins)
- **Talk about**: Layered structure (Models vs. Schemas vs. Routes).
- **Point**: "I can change the database from SQLite to PostgreSQL without touching the API schemas or frontend."

## 5. AI Guidance & Collaboration (2 mins)
- **Show Files**: `docs/ai_guidance/ai-standards.md`.
- **Explain**: "I used AI to accelerate boilerplate but enforced strict standards to protect system integrity."
- **Review process**: "All AI-generated code was critically reviewed against the 'Interface Safety' standard."

## 6. Verification (2 mins)
- **Run Command**: `pytest`.
- **Talk about**: "Automated tests prove that new features don't cause widespread impact."

## 7. Conclusion (1 min)
- **Summary**: "Nexus is a small, well-structured system that prioritizes correctness over feature count."
- **Future extensions**: "Authentication (JWT), Incident audit logs, and more complex M2M relationships (Teams)."
