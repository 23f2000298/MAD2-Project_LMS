from flask import current_app as app,jsonify
from flask_security import auth_required,roles_required,current_user

@app.route("/admin")
@auth_required("token")
@roles_required("admin")
def admin_home():
    return jsonify({
        "message": "Admin Home"
    })

@app.route("/user")
@auth_required("token")
@roles_required("user")
def user_home():
    user = current_user
    return jsonify({
        "username": user.username,
        "email": user.email,
        "password": user.password
    })