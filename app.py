# app.py
from flask import Flask, render_template, redirect, url_for, request, flash
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
