from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Bookmark
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import json

app = Flask(__name__)

import os
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
db_url = os.environ.get("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
db.init_app(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Create DB
with app.app_context():
    db.create_all()

# Load schemes
with open("data/schemes.json", encoding="utf-8") as f:
    schemes = json.load(f)
    @app.route("/api/profile")
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({
        "email": user.email,
        "role": user.role
    })

# ---------------- REGISTER ----------------
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    user = User(email=data['email'], password=hashed_pw)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"})

# ---------------- LOGIN ----------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token})

    return jsonify({"error": "Invalid credentials"}), 401
    #-------------ADMIN API-----------
@app.route("/api/admin/add-scheme", methods=["POST"])
@admin_required
def add_scheme():
    data = request.json

    new_scheme = {
        "name": data["name"],
        "description": data["description"],
        "category": data["category"],
        "link": data["link"]
    }

    schemes.append(new_scheme)

    return jsonify({"message": "Scheme added"})

# ---------------- GET SCHEMES ----------------
@app.route("/api/schemes")
def get_schemes():
    return jsonify(schemes)

# ---------------- ADD BOOKMARK ----------------
@app.route("/api/bookmark", methods=["POST"])
@jwt_required()
def add_bookmark():
    user_id = get_jwt_identity()
    data = request.json

    bookmark = Bookmark(user_id=user_id, scheme_name=data['name'])
    db.session.add(bookmark)
    db.session.commit()

    return jsonify({"message": "Bookmarked"})

# ---------------- GET BOOKMARKS ----------------
@app.route("/api/bookmarks")
@jwt_required()
def get_bookmarks():
    user_id = get_jwt_identity()
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()

    return jsonify([b.scheme_name for b in bookmarks])

if __name__ == "__main__":
    app.run(debug=True)
