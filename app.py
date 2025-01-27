from flask import Flask, request, jsonify, render_template, session, redirect, url_for
import json
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Replace with a strong secret key

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

@app.route("/")
def login_page():
    if "uid" in session:
        return redirect(url_for("client_page"))
    return render_template("client/login.html")

@app.route("/signup")
def signup_page():
    if "uid" in session:
        return redirect(url_for("client_page"))
    return render_template("client/signup.html")

@app.route("/client")
def client_page():
    if "uid" not in session:
        return redirect(url_for("login_page"))
    return render_template("client/client.html")

@app.route("/logout")
def logout():
    session.pop("uid", None)
    return redirect(url_for("login_page"))

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    uid = data.get("uid")
    password = data.get("password")

    if uid in users_db and users_db[uid]["password"] == password:
        session["uid"] = uid
        return jsonify({"points": users_db[uid]["points"]})
    return jsonify({"error": "Invalid UID or password"}), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    uid = data.get("uid")
    password = data.get("password")

    if uid in users_db:
        return jsonify({"error": "UID is already taken."}), 400

    if any(user.get("password") == password for user in users_db.values()):
        return jsonify({"error": "Password is already taken."}), 400

    users_db[uid] = {"password": password, "points": 0}
    save_db()
    return jsonify({"uid": uid, "message": "Signup successful!"})

if __name__ == "__main__":
    app.run(debug=True)
