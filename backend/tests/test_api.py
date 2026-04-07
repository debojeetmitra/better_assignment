import pytest
from app import create_app, db
from app.models import Project, Status

@pytest.fixture
def client():
    # Use in-memory SQLite for tests (Isolation)
    app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Seed test data
            p = Project(name="Test Project", description="Tests")
            db.session.add(p)
            db.session.commit()
        yield client

def test_get_projects(client):
    response = client.get('/api/projects')
    assert response.status_code == 200
    assert len(response.json) == 1

def test_create_incident_success(client):
    payload = {
        "title": "A new bug",
        "description": "This is a detailed description of the bug for testing.",
        "project_id": 1,
        "severity": "HIGH",
        "tags": [{"name": "urgent"}]
    }
    response = client.post('/api/incidents', json=payload)
    assert response.status_code == 201
    assert response.json['title'] == "A new bug"

def test_create_incident_invalid_data(client):
    # Description too short
    payload = {
        "title": "Bug",
        "description": "short",
        "project_id": 1
    }
    response = client.post('/api/incidents', json=payload)
    assert response.status_code == 400
    assert 'description' in response.json

def test_business_rule_resolve_constraint(client):
    # 1. Create a short incident
    payload = {
        "title": "Simple issue",
        "description": "very short desc",
        "project_id": 1
    }
    create_resp = client.post('/api/incidents', json=payload)
    incident_id = create_resp.json['id']
    
    # 2. Try to resolve (should fail business rule)
    res_resp = client.patch(f'/api/incidents/{incident_id}/status', json={"status": "RESOLVED"})
    assert res_resp.status_code == 422
    assert "description must be at least 20 characters" in res_resp.json['error']

def test_update_status_success(client):
    # 1. Create a long incident
    payload = {
        "title": "Complex problem that needs resolving",
        "description": "This is a long description that meets the requirements.",
        "project_id": 1
    }
    create_resp = client.post('/api/incidents', json=payload)
    incident_id = create_resp.json['id']
    
    # 2. Resolve it
    res_resp = client.patch(f'/api/incidents/{incident_id}/status', json={"status": "RESOLVED"})
    assert res_resp.status_code == 200
    assert res_resp.json['status'] == "RESOLVED"
