import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import csv, sqlite3
import sys
import yfinance as yf


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
    yourStock = yf.Ticker(symbol)
    try:
        stockData = yourStock.info
        # return stockData
        
        logoURL = stockData.get("logo_url")

        address3 = stockData.get("country")
        if address3 == "United States":
                address1 = stockData.get("address1")
                address2 = stockData.get("city")+", "+stockData.get("state")+", "+stockData.get("zip")
        else:
            address1=stockData.get("address1")
            address2=stockData.get("city")+", "+stockData.get("zip")
        website = stockData.get("website")
        phone = stockData.get("phone")
        summ = stockData.get("longBusinessSummary")
        try:
            summ = summ.split('.')
            summ = summ[0]+'.'+summ[1]+'.'+summ[2]+'.'+summ[3]+'.'+summ[4]+'.'+summ[5]+'.'
        except:
            pass

        lastPrice = 'Current Price: $'+str(round(((float(stockData.get("bid"))+float(stockData.get("ask")))/2),2))
        try:
            div = 'Dividend Yield: '+str(round((stockData.get("dividendYield")*100),2))+'%'
        except:
            div = "Dividend Yield: 0.00%"
        h52 = "52 week high: "+str(stockData.get("fiftyTwoWeekHigh"))
        l52 = "52 week low: "+str(stockData.get("fiftyTwoWeekLow"))
        vol = "Today's Volume: "+str(place_value(int(stockData.get("volume"))))
        avol = "Average Volume: "+str(place_value(int(stockData.get("averageVolume"))))
        c52 = '52 week change: '+str(round((stockData.get("52WeekChange")*100),2))+'%'
        s52 = 'S&P 500 52 week change: '+str(round((stockData.get("SandP52WeekChange")*100),2))+'%'
        mcap = "Market Cap: $"+str(place_value(int(stockData.get("marketCap"))))




        



        error = ""
        return render_template("stock.html", company=company[0], symbol=symbol, sector=company[1], logoURL=logoURL, address1=address1, \
            address2=address2, address3=address3, website=website, phone=phone, lastPrice=lastPrice, div=div, summ=summ, error=error, \
                h52=h52, l52=l52, vol=vol, avol=avol, c52=c52, s52=s52, mcap=mcap)
    except:
        error="No data available for this company."
        logoURL=""
        address1=""
        address2=""
        address3=""
        website=""
        phone=""
        lastPrice=""
        div=""
        summ=""
        h52 = ""
        l52 = ""
        vol = ""
        avol ="" 
        c52 = ""
        s52 = ""
        mcap ="" 

        return render_template("stock.html", company=company[0], symbol=symbol, sector=company[1], logoURL=logoURL, address1=address1, \
            address2=address2, address3=address3, website=website, phone=phone, lastPrice=lastPrice, div=div, summ=summ, error=error, \
                h52=h52, l52=l52, vol=vol, avol=avol, c52=c52, s52=s52, mcap=mcap)
def place_value(number): 
    return ("{:,}".format(number)) 

