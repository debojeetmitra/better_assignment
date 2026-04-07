# Nexus - Minimal Incident & Feedback Tracker

Nexus is a professional-grade full-stack application built for the Better Associate Software Engineer assessment. It serves as a centralized hub for teams to log, track, and categorize product incidents and feedback.

## 🚀 Key Features
- **Relational Data Modeling**: Structured Project-Incident-Tag hierarchy.
- **Interface Safety**: Strict schema validation on the API layer using Marshmallow.
- **Business Rule Integrity**: Conditional state transitions (e.g., resolving incidents requires minimal documentation).
- **Premium UI/UX**: Modern dark-mode dashboard with glassmorphism and real-time filtering.
- **Change Resilience**: Layered architecture separating Models, Schemas, and Routes.

---

## 🛠️ Tech Stack
- **Backend**: Python 3.11+, Flask, SQLAlchemy (ORM), Marshmallow (Validation).
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons.
- **Database**: SQLite (Relational, chosen for portability).
- **Testing**: Pytest.

---

## 📂 Project Structure
```text
.
├── backend/
│   ├── app/                # Core Flask application
│   │   ├── models.py       # SQLAlchemy database models
│   │   ├── schemas.py      # Marshmallow API schemas
│   │   └── routes.py       # API endpoints & business logic
│   ├── tests/              # Pytest suite
│   ├── run.py              # Application entry point
│   └── requirements.txt    # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── api/            # Centralized API client
│   │   ├── components/     # Reusable UI components
│   │   └── App.jsx         # Main dashboard logic
│   └── tailwind.config.js  # Premium design tokens
└── docs/
    └── ai_guidance/        # AI Standards Used (Assessment Requirement)
```

---

## 🏁 Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python run.py
```
The API will be available at `http://localhost:5000/api`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

### 3. Running Tests
```bash
cd backend
pytest
```

---

## 🤖 AI Usage & Guidance
This project was developed with significant AI collaboration. The following guidance files were used to ensure system integrity and code quality:
- [AI Coding Standards](docs/ai_guidance/ai-standards.md)
- [Architectural Principles](docs/ai_guidance/architectural-principles.md)

---

## 📝 Technical Decisions
1. **SQLite for Portability**: Chosen to ensure the reviewer can run the project instantly without setting up a heavy DB server.
2. **Marshmallow for Interface Safety**: Provides a clear contract between Frontend and Backend, catching errors at the boundary.
3. **Glassmorphism Design**: Implemented to provide a high-end, premium feel that stands out in assessments.
4. **Mock Ownership**: Due to the "Small System" requirement, authentication is mocked to focus on the core relational logic.
