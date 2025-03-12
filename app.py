from flask import Flask, request, jsonify, render_template, session, redirect, url_for
import json
import os

app = Flask(__name__)

@app.route("/")
def getstarted_page():
    return render_template("client/getstarted.html")

@app.route("/about")
def about_page():
    return render_template("client/about.html")

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Load user database
    with open('db.json', 'r') as f:
        users = json.load(f)
    
    # Check if user exists and password is correct
    if username in users and users[username]['password'] == password:
        session['user'] = username
        return jsonify({
            'success': True,
            'points': users[username]['points']
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid username or password'
        }), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Load user database
    with open('db.json', 'r') as f:
        users = json.load(f)
    
    # Check if username already exists
    if username in users:
        return jsonify({
            'success': False,
            'message': 'Username already exists'
        }), 400
    
    # Add new user
    users[username] = {
        'password': password,
        'points': 100  # Starting points for new users
    }
    
    # Save updated user database
    with open('db.json', 'w') as f:
        json.dump(users, f, indent=4)
    
    session['user'] = username
    return jsonify({
        'success': True,
        'message': 'Account created successfully',
        'points': 100
    })

if __name__ == "__main__":
    app.run(debug=True)
