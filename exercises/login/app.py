from flask import Flask, session, redirect, url_for, escape, request, render_template
import os


app = Flask(__name__)

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    SECRET_KEY = os.urandom(24)
app.secret_key = SECRET_KEY


@app.route("/")
def index():
    if "username" in session:
        message = escape(session["username"])
        
        return render_template("index.html", user=message)
    return render_template("login.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session["username"] = request.form["username"]
        return redirect(url_for("index"))
    return render_template("login.html")


@app.route("/logout", methods=["GET", "POST"])
def logout():
    if request.method == "POST":
        session.pop("username", None)
        return redirect(url_for("index"))
    return render_template("logout.html")
