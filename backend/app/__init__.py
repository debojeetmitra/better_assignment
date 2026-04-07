from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from .models import db, Project, Incident, Tag, Status, Severity
import os

ma = Marshmallow()

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app) # Enable CORS for frontend integration
    
    # Simple SQLite configuration for assessment portability
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nexus.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    if test_config:
        app.config.update(test_config)

    db.init_app(app)
    ma.init_app(app)

    # Register Blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Initial Migration/Initialization script (Correctness)
    with app.app_context():
        db.create_all()
        # Seed initial data if empty and NOT in testing mode
        if not app.config.get('TESTING') and not Project.query.first():
            p1 = Project(name="Default Project", description="Nexus project management system")
            db.session.add(p1)
            t1 = Tag(name="bug", color="#e74c3c")
            t2 = Tag(name="feature", color="#3498db")
            db.session.add_all([t1, t2])
            db.session.commit()

    return app
