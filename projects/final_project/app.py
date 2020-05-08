import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import sqlite3
import sys


app = Flask(__name__)
stockList = sqlite3.connect('stockTable.csv', check_same_thread=False)

@app.route("/", methods=["GET"])
def index():
    stockTable = []
    for stocks in stockList:
        stockTable.append(stocks)
    return render_template("index.html", stockTable=stockTable)

@app.route("/portfolio", methods=["GET", "POST"])
def portfolio():
    if request.method == "GET":
        portfolioTable = []
        emptyMessage = ""
        return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)

    #deletePortfolio table
    portfolioTable = []
    emptyMessage = "Your portfolio is currently empty!"
    return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)

@app.route("/stock", methods=["GET"])
def stock():
    
    pass
    return render_template("stock.html")