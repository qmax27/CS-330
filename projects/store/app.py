import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import records
import sqlite3
import sys


app = Flask(__name__)
conn = sqlite3.connect('INV.db', check_same_thread=False)
c = conn.cursor()

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("base.html")
    pass


@app.route("/add", methods=["GET", "POST"]) 
def add():
    if request.method == "GET":
        return render_template("add.html", message = "")
    
    name = request.form['name']
    category = request.form['category']
    price = request.form['price']
    newItem = [(name, category, price)]
    addItem(newItem)
    return render_template("add.html", message="Item added!")
def addItem(newItem):
    global conn
    global c
    try:
        c.execute('''CREATE TABLE inventory (name text, category text, price real)''')
        c.executemany('INSERT INTO inventory VALUES (?,?,?)', newItem)
        conn.commit()
    except:
        c.executemany('INSERT INTO inventory VALUES (?,?,?)', newItem)
        conn.commit()
        
@app.route("/list")
def show_list():
    global conn
    global c
    inventory = []
    errorMessage = ""
    try:
        for row in c.execute('SELECT * FROM inventory'):
            inventory.append(row)
    except:
        errorMessage = "No items in the inventory"
    return render_template("list.html", inventory=inventory, errorMessage = errorMessage)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
