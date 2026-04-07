# 🎙️ Video Walkthrough Script - English

This script is designed to cover all the evaluation criteria of the Better Associate Software Engineer assessment.

---

## Part 1: Introduction (0:00 - 1:00)
**Action**: Show the live Nexus Dashboard (http://localhost:5173).
**Script**:
"Hi, I'm **[Your Name]**, and this is my submission for the Associate Software Engineer assessment at Better. I've built **Nexus**, a minimal but robust Incident Tracking System. My goal was to create a system that prioritizes **Correctness**, **Interface Safety**, and **Change Resilience**."

---

## Part 2: Architecture & Data Modeling (1:00 - 3:00)
**Action**: Open `backend/app/models.py` in your code editor.
**Script**:
"The project uses a **Flask backend** and a **React frontend**. For the database, I chose **SQLite** which is relational and portable. 

Looking at the models, you can see a structured relational schema. We have **Projects** which own multiple **Incidents**, and incidents can have multiple **Tags** via a junction table. I used **Enums** for Status and Severity to ensure we prevent invalid states at the database level."

---

## Part 3: Interface Safety & Business Rules (3:00 - 7:00)
**Action**: Open `backend/app/schemas.py`.
**Script**:
"To demonstrate **Interface Safety**, I implemented strict validation using **Marshmallow**. Every request coming into the API is validated against these schemas. For example, a Title must be at least 5 characters and a Description at least 20. This prevents 'vague' or empty data from entering our system."

**Action**: Switch to the Browser and open the "Log Incident" form.
**Script**:
"In the UI, users get real-time feedback. If I enter a short title, the system warns me. This shows our commitment to **Observability** and **User Interface safety**."

**Action**: Try to click "Resolve" on an incident with a short description (< 20 chars).
**Script**:
"Here is a key **Correctness** rule: I've implemented a business constraint that prevents resolving an incident if the description is too short. This ensures our team maintains a high standard of documentation for every resolved issue."

---

## Part 4: Change Resilience & AI Guidance (7:00 - 10:00)
**Action**: Show the `docs/ai_guidance/` folder.
**Script**:
"A unique part of my workflow was **AI Guidance**. As per the assessment instructions, I used AI tools but constrained them with my own **AI Coding Standards**. You can see them here in the `docs` folder. This ensured that the generated code remained modular and followed established patterns like the separation of Schemas and Routes."

**Action**: Mention the structure.
**Script**:
"The system is designed for **Change Resilience**. Because of our layered architecture, we could easily move from SQLite to a production database like PostgreSQL with almost zero changes to our business logic."

---

## Part 5: Verification & Closing (10:00 - 12:00)
**Action**: Open a terminal and run `pytest`.
**Script**:
"Finally, for **Verification**, I've included an automated test suite. These tests prove that our core logic and business rules remain correct even as the system evolves. 

Thank you for reviewing my submission. I focused on making **Nexus** a simple, predictable, and well-structured application that is ready for real-world team collaboration."

---

## 🎬 Recording Tips:
1. **Resolution**: Keep your screen resolution to 1080p if possible.
2. **Audio**: Use a quiet room.
3. **Pace**: Don't rush; explain the "Why" behind the code.
