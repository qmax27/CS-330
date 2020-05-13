import requests
from flask import Flask, request, render_template, send_from_directory, Markup
from flask import redirect, url_for
from flask import Flask, Response, jsonify
from flask_cors import CORS, cross_origin
import csv, sqlite3
import sys, json
import yfinance as yf
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
import base64
from io import BytesIO


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
        if symbol == "CLEARALL":
            try:
                p.execute('''DROP TABLE portfolio''')
            except:
                pass
            portfolioTable = []
            emptyMessage = "Your portfolio is currently empty!"
            return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)
        portfolioTable = []
        emptyMessage = ""
        try:
            for row in p.execute('SELECT * FROM portfolio'):
                portfolioTable.append(row)
        except:
            emptyMessage = "Your portfolio is currently empty!"
        return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)



    
    if symbol != "VIEWALL":
        exString = "SELECT * FROM stockTable WHERE symbol ='"+symbol+"'"
        for row in s.execute(exString):
            company = row 
        # shares = 
        newStock = (company[0], company[1], company[2], request.form["shares"])
        newStock = [newStock]
        addStock(newStock)
    portfolioTable = []
    emptyMessage = ""
    try:
        for row in p.execute('SELECT * FROM portfolio'):
            portfolioTable.append(row)
    except:
        emptyMessage = "Your portfolio is currently empty!"
    return render_template("portfolio.html", portfolioTable=portfolioTable, emptyMessage=emptyMessage)


def addStock(newStock):
    global portfolioList
    global p
    try:
        p.execute('''CREATE TABLE portfolio (symbol text, compnay text, sector text, shares integer)''')
        p.executemany('INSERT INTO portfolio VALUES (?,?,?,?)', newStock)
        portfolioList.commit()
    except:
        p.executemany('INSERT INTO portfolio VALUES (?,?,?,?)', newStock)
        portfolioList.commit()

def clearPort():
    p.execute('''DROP TABLE portfolio''')

@app.route("/stock/<symbol>", methods=["GET", "POST"])
def getStockInfo(symbol):
    global stockList
    global s
    URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+symbol+"&apikey=UG7FF5GH6WHAI2QB"
    data = requests.get(URL)
    data = data.json()
    data =  data["Monthly Time Series"]
    orderedP = []
    dates = []
    for date in data:
        dates.insert(0, int(date[0:4]))
        date = data[date]
        price = date["1. open"]
        orderedP.insert(0, float(price))
    color = "limegreen"
    if orderedP[0]>orderedP[len(orderedP)-1]:
        color = "orangered"
    min = str(dates[0])
    max = str(dates.pop())
    # return max
    # return str(labels)
    plt.style.use('dark_background')
    plt.rc('font', size=13)   


    fig = Figure()
    ax = fig.subplots()
    ax.plot(orderedP, color=color, linewidth=2)
    ax.set_ylabel("Stock Price ($)")
    ax.set_xlabel("Years "+min+" - "+max)

    ax.set_xticklabels([])
    buf = BytesIO()
    fig.savefig(buf, format="png")
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    Gimage = f"<img src='data:image/png;base64,{data}'/>"
    Gimage = Markup(Gimage)
   
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
            # summ = summ.split('.')
            # summ = summ[0]+'.'+summ[1]+'.'+summ[2]+'.'+summ[3]+'.'+summ[4]+'.'+summ[5]+'.'
            pass
        except:
            pass

        lastPrice = 'Current Price: $'+str(round(((float(stockData.get("bid"))+float(stockData.get("ask")))/2),2))
        try:
            div = 'Dividend Yield: '+str(round((stockData.get("dividendYield")*100),2))+'%'
        except:
            div = "Dividend Yield: 0.00%"
        h52 = "52 week high: $"+str(round(stockData.get("fiftyTwoWeekHigh"),2))
        l52 = "52 week low: $"+str(round(stockData.get("fiftyTwoWeekLow"),2))
        vol = "Today's Volume: "+str(place_value(int(stockData.get("volume"))))
        avol = "Average Volume: "+str(place_value(int(stockData.get("averageVolume"))))
        c52 = '52 week change: '+str(round((stockData.get("52WeekChange")*100),2))+'%'
        s52 = 'S&P 500 52 week change: '+str(round((stockData.get("SandP52WeekChange")*100),2))+'%'
        mcap = "Market Cap: $"+str(place_value(int(stockData.get("marketCap"))))
        error = ""
        return render_template("stock.html", company=company[0], symbol=symbol, sector=company[1], logoURL=logoURL, address1=address1, \
            address2=address2, address3=address3, website=website, phone=phone, lastPrice=lastPrice, div=div, summ=summ, error=error, \
                h52=h52, l52=l52, vol=vol, avol=avol, c52=c52, s52=s52, mcap=mcap, Gimage=Gimage)
    except:
        error=Markup('''<h1 class="text-center m-4 p-4 text-danger"><b><u>There is no information available for this company</u></b></h1>''')

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
        Gimage = ""

        return render_template("stock.html", company=company[0], symbol=symbol, sector=company[1], logoURL=logoURL, address1=address1, \
            address2=address2, address3=address3, website=website, phone=phone, lastPrice=lastPrice, div=div, summ=summ, error=error, \
                h52=h52, l52=l52, vol=vol, avol=avol, c52=c52, s52=s52, mcap=mcap, Gimage=Gimage)
def place_value(number): 
    return ("{:,}".format(number)) 

@app.route("/api/<symbol>")
def getInfo(symbol):
   
    yourStock = yf.Ticker(symbol)
    try:
        info = yourStock.info
    
        info = [info.get("bid"), info.get("ask"), info.get("volume")]
       
        res = Response(json.dumps(info))
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Content-Type"] = "application/json"
    except:
        info = "Sorry! We couldn't find information for a stock with the ticker symbol "+str(symbol)
        res = Response(json.dumps({symbol: info}))
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Content-Type"] = "application/json"

    return res

if __name__ == "__main__":
    app.run("0.0.0.0")

