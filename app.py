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

# Add these routes to your app.py file

@app.route("/dashboard")
def dashboard():
    if 'user' not in session:
        return redirect("/login")
    return render_template("client/dashboard.html")

@app.route("/api/user/data")
def user_data():
    if 'user' not in session:
        return jsonify({
            'success': False,
            'message': 'Not authenticated'
        }), 401
    
    username = session['user']
    
    # Load user database
    with open('db.json', 'r') as f:
        users = json.load(f)
    
    if username not in users:
        return jsonify({
            'success': False,
            'message': 'User not found'
        }), 404
    
    # Initialize history if it doesn't exist
    if 'history' not in users[username]:
        users[username]['history'] = []
    
    return jsonify({
        'success': True,
        'username': username,
        'points': users[username]['points'],
        'history': users[username].get('history', [])
    })

@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop('user', None)
    return jsonify({
        'success': True
    })

@app.route("/api/redeem", methods=["POST"])
def redeem_points():
    if 'user' not in session:
        return jsonify({
            'success': False,
            'message': 'Not authenticated'
        }), 401
    
    username = session['user']
    data = request.json
    amount = data.get('amount', 0)
    item = data.get('item', 'Unknown')
    
    # Load user database
    with open('db.json', 'r') as f:
        users = json.load(f)
    
    if username not in users:
        return jsonify({
            'success': False,
            'message': 'User not found'
        }), 404
    
    # Check if user has enough points
    if users[username]['points'] < amount:
        return jsonify({
            'success': False,
            'message': 'Not enough points'
        }), 400
    
    # Deduct points
    users[username]['points'] -= amount
    
    # Add to history
    if 'history' not in users[username]:
        users[username]['history'] = []
    
    users[username]['history'].append({
        'date': datetime.datetime.now().isoformat(),
        'activity': f'Redeemed {item}',
        'points': -amount
    })
    
    # Save updated user database
    with open('db.json', 'w') as f:
        json.dump(users, f, indent=4)
    
    return jsonify({
        'success': True,
        'points': users[username]['points']
    })

# Add an endpoint for activity completion
@app.route("/api/activity/complete", methods=["POST"])
def complete_activity():
    if 'user' not in session:
        return jsonify({
            'success': False,
            'message': 'Not authenticated'
        }), 401
    
    username = session['user']
    data = request.json
    activity = data.get('activity', 'Unknown activity')
    points = data.get('points', 0)
    
    # Load user database
    with open('db.json', 'r') as f:
        users = json.load(f)
    
    if username not in users:
        return jsonify({
            'success': False,
            'message': 'User not found'
        }), 404
    
    # Add points
    users[username]['points'] += points
    
    # Add to history
    if 'history' not in users[username]:
        users[username]['history'] = []
    
    users[username]['history'].append({
        'date': datetime.datetime.now().isoformat(),
        'activity': activity,
        'points': points
    })
    
    # Save updated user database
    with open('db.json', 'w') as f:
        json.dump(users, f, indent=4)
    
    return jsonify({
        'success': True,
        'points': users[username]['points']
    })
    
if __name__ == "__main__":
    app.run(debug=True)
