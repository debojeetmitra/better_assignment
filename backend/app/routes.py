from flask import Blueprint, request, jsonify
from .models import db, Project, Incident, Tag, Status, Severity
from .schemas import project_schema, projects_schema, incident_schema, incidents_schema, tag_schema, tags_schema
from marshmallow import ValidationError

api_bp = Blueprint('api', __name__)

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify(projects_schema.dump(projects)), 200

@api_bp.route('/projects', methods=['POST'])
def create_project():
    try:
        data = project_schema.load(request.json)
        new_project = Project(**data)
        db.session.add(new_project)
        db.session.commit()
        return jsonify(project_schema.dump(new_project)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

@api_bp.route('/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    return jsonify(incidents_schema.dump(incidents)), 200

@api_bp.route('/incidents', methods=['POST'])
def create_incident():
    try:
        # Load and validate first (Interface Safety)
        data = incident_schema.load(request.json)
        
        # Tags are handled separately
        tags_data = data.pop('tags', [])
        
        new_incident = Incident(**data)
        
        # Link tags by name or create new ones
        for tag_data in tags_data:
            tag = Tag.query.filter_by(name=tag_data['name']).first()
            if not tag:
                tag = Tag(name=tag_data['name'], color=tag_data.get('color', '#888888'))
            new_incident.tags.append(tag)

        db.session.add(new_incident)
        db.session.commit()
        return jsonify(incident_schema.dump(new_incident)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

@api_bp.route('/incidents/<int:id>/status', methods=['PATCH'])
def update_incident_status(id):
    incident = Incident.query.get_or_404(id)
    new_status_str = request.json.get('status')
    
    if not new_status_str:
        return jsonify({"error": "Status is required"}), 400
        
    try:
        new_status = Status[new_status_str]
        
        # Business Rule Violation (Correctness):
        # Cannot move to "RESOLVED" if description is less than 50 chars (example logic)
        if new_status == Status.RESOLVED and len(incident.description) < 20:
             return jsonify({"error": "Incident description must be at least 20 characters to be resolved."}), 422
             
        incident.status = new_status
        db.session.commit()
        return jsonify(incident_schema.dump(incident)), 200
        
    except KeyError:
        return jsonify({"error": f"Invalid status: {new_status_str}"}), 400

@api_bp.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify(tags_schema.dump(tags)), 200
