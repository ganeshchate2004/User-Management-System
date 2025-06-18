
# CRUD Operation API such as get, create ,update,delete


from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from bson import ObjectId
from db import auth_collection, users_collection
from authmodels import AuthUser
from models import serialize_user

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['JWT_SECRET_KEY'] = 'gdc'


app.config["JWT_TOKEN_LOCATION"] = ["headers"]
# app.config['JWT_ACCESS_COOKIE_NAME'] = 'token'
# app.config['JWT_COOKIE_SECURE'] = False  # Set to True only in HTTPS
# app.config['JWT_COOKIE_CSRF_PROTECT'] = False


jwt = JWTManager(app)

# ------------------ Signup ------------------
@app.route("/users/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if auth_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 409

    hashed_password = AuthUser.hash_password(password)
    auth_result = auth_collection.insert_one({
        "email": email,
        "password": hashed_password
    })

    # Insert profile with reference to auth_id
    users_collection.insert_one({
        "auth_id": auth_result.inserted_id,
        "email": email,
        "fullName": "",
        "phone": "",
        "dob": "",
        "gender": "",
        "department": "",
        "position": "",
        "skills": [],
        "bio": "",
        "salary": 0,
        "country": "",
        "address": "",
        "zipCode": "",
        "status": "",
        "startDate": ""
    })

    return jsonify({"message": "User created successfully"}), 201

# ------------------ Login ------------------
# @app.route("/users/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     user = auth_collection.find_one({"email": email})
#     if user and AuthUser.check_password(password, user["password"]):
#         access_token = create_access_token(identity=str(user["_id"]))
#         response = jsonify({"message": "Login successful"})
#         response.set_cookie('token', access_token, httponly=True)
#         return response, 200

#     return jsonify({"message": "Invalid credentials"}), 401

@app.route("/users/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = auth_collection.find_one({"email": email})
    if user and AuthUser.check_password(password, user["password"]):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({"message": "Login successful", "token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401


# ------------------ Get Logged-in User Profile ------------------
@app.route("/users", methods=["GET"])
@jwt_required()
def get_logged_in_user():
    auth_id = get_jwt_identity()
    user = users_collection.find_one({"auth_id": ObjectId(auth_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(serialize_user(user)), 200



@app.route("/users/all", methods=["GET"])
@jwt_required()
def get_all_users():
    users_cursor = users_collection.find()
    users = [serialize_user(user) for user in users_cursor]
    return jsonify(users), 200

# ------------------ CRUD APIs ------------------

# Create user
@app.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    data = request.json
    result = users_collection.insert_one(data)
    new_user = users_collection.find_one({"_id": result.inserted_id})
    return jsonify(serialize_user(new_user)), 201


@app.route("/users/<id>", methods=["GET"])
@jwt_required()
def get_user(id):
    user = users_collection.find_one({"_id": ObjectId(id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(serialize_user(user)), 200

@app.route("/users/<id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    data = request.json
    result = users_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    user = users_collection.find_one({"_id": ObjectId(id)})
    return jsonify(serialize_user(user)), 200

@app.route("/users/<id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    result = users_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)
