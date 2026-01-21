from flask import current_app as app,jsonify,request
from flask_security import auth_required,roles_required,current_user,login_user
from .models import User,Role,Transaction
from .database import db
from werkzeug.security import generate_password_hash,check_password_hash


@app.route("/",methods = ["GET"])
def home():
    return jsonify({
        "message": "Hello World:Home Page!"
    })

@app.route("/api/admin")
@auth_required("token") #authentication
@roles_required("admin") #authorization/rbac
def admin_home():
    return jsonify({
        "message": "Admin Home"
    })

@app.route("/api/home")
@auth_required("token")
@roles_required("user")
def user_home():
    user = current_user
    return jsonify({
        "username": user.username,
        "email": user.email,
        "password": user.password
    })

@app.route("/api/login",methods = ["POST"])
def user_login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    if not email:
        return jsonify({
            "message": "Email is required!"
        }),400
    user = app.security.datastore.find_user(email = email)
    if user:
        if check_password_hash(user.password,password):
            # if current_user is None:
            #     return jsonify({
            #         "message": "User already logged in!"
            #     }),400
            login_user(user)
            return jsonify({
                "id": user.id,
                "username": user.username,
                "auth_token": user.get_auth_token()
            })
        else:
            return jsonify({
                "message": "Invalid password!"
            }),400
    else:
        return jsonify({
            "message": "User does not exist!"
        }),404






@app.route("/api/register",methods = ["POST"])
def create_user():
    credentials = request.get_json()
    if not app.security.datastore.find_user(email = credentials["email"]):
        app.security.datastore.create_user(
            email = credentials["email"],
            username =credentials["username"],
            password = generate_password_hash(credentials["password"]),
            roles = ["user"]
        )
        db.session.commit()
        return jsonify({
            "message": "User created successfully!"
        }),201
    
    return jsonify({
        "message": "User already exists!"
    }),400

@app.route("/api/pay/<int:trans_id>")
@auth_required("token")
@roles_required("user")
def payment(trans_id):
    trans = Transaction.query.get(trans_id)
    trans.internal_status = "paid"
    db.session.commit()
    return jsonify({
        "message": "Transaction paid successfully!"
    })

@app.route("/api/deliver/<int:trans_id>",methods = ["POST"])
@auth_required("token")
@roles_required("admin")
def deliver(trans_id):
    body = request.get_json()
    trans = Transaction.query.get(trans_id)
    trans.delivery_status = body["status"]
    db.session.commit()
    return jsonify({
        "message": "delivered successfully!"
    })
    

@app.route("/api/review/<int:trans_id>",methods = ["POST"])
@auth_required("token")
@roles_required("admin")
def review(trans_id):
    body = request.get_json()
    trans = Transaction.query.get(trans_id)
    trans.delivery_status = body["delivery"]
    trans.amount = body["amount"]
    trans.internal_status = "pending"
    db.session.commit()
    return jsonify({
        "message": "transaction reviewed successfully!"
    })