from marshmallow import Schema, fields, validate, post_load
from marshmallow_enum import EnumField
from .models import Severity, Status, Project, Incident, Tag

class TagSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    color = fields.Str(validate=validate.Length(equal=7)) # Hex code e.g. #FFFFFF

class ProjectSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=3, max=100))
    description = fields.Str(allow_none=True)
    created_at = fields.DateTime(dump_only=True)

class IncidentSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=5, max=200))
    description = fields.Str(required=True, validate=validate.Length(min=10))
    severity = EnumField(Severity, by_value=True)
    status = EnumField(Status, by_value=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    project_id = fields.Int(required=True)
    
    # Nested field for tags
    tags = fields.List(fields.Nested(TagSchema))

# Schema instances for convenience
project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
incident_schema = IncidentSchema()
incidents_schema = IncidentSchema(many=True)
tag_schema = TagSchema()
tags_schema = TagSchema(many=True)
