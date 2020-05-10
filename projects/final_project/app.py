import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import csv, sqlite3
import sys


app = Flask(__name__)
stockList = sqlite3.connect('stockTable.DB', check_same_thread=False)
s = stockList.cursor()
portfolioList = sqlite3.connect('port.DB', check_same_thread=False)
p = portfolioList.cursor()


@app.route("/", methods=["GET"])
def index():
    global stockList
    global s
    stockTable = []
    for row in s.execute('SELECT * FROM stockTable'):
        stockTable.append(row)
    return render_template("index.html", stockTable=stockTable)

@app.route("/portfolio/<symbol>", methods=["GET", "POST"])
def portfolio(symbol):
    global stockList
    global s
    global portfolioList
    global p
    if request.method == "GET":
        if symbol != "VIEWALL":
            exString = "SELECT * FROM stockTable WHERE symbol ='"+symbol+"'"
            for row in s.execute(exString):
                company = row 
            newStock = [company]
            addStock(newStock)
        portfolioTable = []
        emptyMessage = ""
        try:
            for row in p.execute('SELECT * FROM portfolio'):
                portfolioTable.append(row)
        except:
            emptyMessage = "Your portfolio is currently empty!"
        return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)
    try:
        p.execute('''DROP TABLE portfolio''')
    except:
        pass
    portfolioTable = []
    emptyMessage = "Your portfolio is currently empty!"
    return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)

def addStock(newStock):
    global portfolioList
    global p
    try:
        p.execute('''CREATE TABLE portfolio (symbol text, compnay text, sector text)''')
        p.executemany('INSERT INTO portfolio VALUES (?,?,?)', newStock)
        portfolioList.commit()
    except:
        p.executemany('INSERT INTO portfolio VALUES (?,?,?)', newStock)
        portfolioList.commit()

def clearPort():
    p.execute('''DROP TABLE portfolio''')

@app.route("/stock/<symbol>", methods=["GET"])
def getStockInfo(symbol):
    global stockList
    global s
    exString = "SELECT company, sector FROM stockTable WHERE symbol ='"+symbol+"'"
    for row in s.execute(exString):
        company = row 
    
    return render_template("stock.html", company=company[0], symbol=symbol, sector=company[1])
