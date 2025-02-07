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

@app.route("/login")
def login_page():
    return render_template("client/login.html")

@app.route("/signup")
def signup_page():
    return render_template("client/signup.html")

@app.route("/api/login", methods=["POST"])
def login():
    pass

@app.route("/api/signup", methods=["POST"])
def signup():
    pass

if __name__ == "__main__":
    app.run(debug=True)
