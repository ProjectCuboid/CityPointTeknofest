from flask import Flask, request, jsonify, render_template
import json
import os
import random
import string
import uuid


#----PATHWAY-----
print("http://192.168.0.197:5000/login")
print("http://192.168.0.197:5000/server")
print("==========================")
#================
app = Flask(__name__)

# Database file
DB_FILE = "db.json"

# Load database
if os.path.exists(DB_FILE):
    with open(DB_FILE, "r") as file:
        users_db = json.load(file)
else:
    users_db = {}

# Save database
def save_db():
    with open(DB_FILE, "w") as file:
        json.dump(users_db, file, indent=4)

# Generate a unique UID

ADMIN_PASSWORD = "200mlkompleks"  # Replace with a strong password

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json
    password = data.get("password")

    if password == ADMIN_PASSWORD:
        return jsonify({"message": "Login successful", "token": "admin_token"})
    return jsonify({"error": "Invalid password"}), 403

@app.route("/api/admin/protected", methods=["POST"])
def protected_admin_route():
    data = request.json
    token = data.get("token")

    if token == "admin_token":
        # Perform the admin-specific operation here
        return jsonify({"message": "Authorized access"})
    return jsonify({"error": "Unauthorized access"}), 403

# Routes
@app.route("/signup")
def signup_page():
    return render_template("client/signup.html")

@app.route("/")
def login_page():
    return render_template("client/login.html")

@app.route("/client")
def client_page():
    return render_template("client/client.html")
@app.route("/server")
def admin():
    return render_template("server.html")

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    uid = data.get("uid")  # Get the UID from the request
    password = data.get("password")

    # Check if the UID already exists
    if uid in users_db:
        return jsonify({"error": "UID is already taken."}), 400

    # Check if the password is already taken
    if any(user.get("password") == password for user in users_db.values()):
        return jsonify({"error": "Password is already taken."}), 400

    # Save the new user
    users_db[uid] = {"password": password, "points": 0}
    save_db()
    return jsonify({"uid": uid, "message": "Signup successful!"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    uid = data.get("uid")
    password = data.get("password")

    if uid in users_db and users_db[uid]["password"] == password:
        return jsonify({"points": users_db[uid]["points"]})
    return jsonify({"error": "Invalid UID or password"}), 401

@app.route("/api/exercise", methods=["POST"])
def exercise():
    data = request.json
    uid = data.get("uid")
    points_needed = data.get("points")

    if uid in users_db:
        if users_db[uid]["points"] >= points_needed:
            users_db[uid]["points"] -= points_needed
            save_db()
            return jsonify({"message": "Exercise completed!", "points": users_db[uid]["points"]})
        else:
            return jsonify({"error": "Not enough points"}), 400
    return jsonify({"error": "User not found"}), 404

@app.route("/api/admin/update_points", methods=["POST"])
def update_points():
    data = request.json
    uid = data.get("uid")
    new_points = data.get("points")

    if uid in users_db:
        users_db[uid]["points"] = new_points
        save_db()
        return jsonify({"message": f"Updated points for {uid} to {new_points}."})
    return jsonify({"error": "User not found"}), 404

@app.route("/api/admin/users", methods=["GET"])
def get_users():
    return jsonify(users_db)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
