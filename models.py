role = db.Column(db.String(20), default="user")
from flask_jwt_extended import jwt_required, get_jwt_identity

def admin_required(fn):
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if user.role != "admin":
            return jsonify({"error": "Admin only"}), 403

        return fn(*args, **kwargs)
    return wrapper
    @app.route("/api/admin/add-scheme", methods=["POST"])
@admin_required
def add_scheme():
    data = request.json

    schemes.append(data)

    return jsonify({"message": "Scheme added"})
    user = User.query.filter_by(email="your@email.com").first()
user.role = "admin"
db.session.commit()
<a href="https://your-app.onrender.com/login/google">
  <button class="btn">Login with Google</button>
</a>
