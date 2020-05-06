from flask import Flask
from flask import request
from flask import render_template
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.error import URLError
import json

app = Flask(__name__)

indexSymbols = ["SPLG", "IEFA", "VWO"]
allocatedFunds = {
    "SPLG" : 0.0,
    "IEFA" : 0.0,
    "VWO" : 0.0,
}

def get_quote(symbol):
    if(symbol.strip() != ""):
        keyIndex = 0
        firstKey = ""
        API_KEY = 'NZAIC3TI9L4DM09C'
        url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + API_KEY
        try:
            conn = urlopen(url)
        except HTTPError as e:
            return "http error"
        except URLError as e:
            return "url error"
        else:
            jsonContent = conn.read()
            content = json.loads(jsonContent)
            print(content)
            return content
    else:
        return ""

def getCurrentStockPrices():
    stockPrices = {
        "SPLG" : 0.0,
        "IEFA" : 0.0,
        "VWO" : 0.0,
    }
    for symbol in indexSymbols:
        currentQuote = get_quote(symbol)
        if(currentQuote is "" or currentQuote is "http error" or currentQuote is "url error"):
            return {}
        else:
            currentPrice = float(currentQuote["Global Quote"]["05. price"])
            stockPrices[symbol] = currentPrice
    return stockPrices

def allocateShares(stockPrices):
    if(len(stockPrices.keys()) is 0):
        return {}
    else:
        sharesToBuy = {
            "SPLG" : 0,
            "IEFA" : 0,
            "VWO" : 0,
        }
        for symbol in indexSymbols:
            shareQuotient = allocatedFunds[symbol]/stockPrices[symbol]
            sharesToBuy[symbol] = int(shareQuotient)
        return sharesToBuy

@app.route('/')
def get_index():
    return render_template("index.html", stocks = indexSymbols, stockShares = "") 

@app.route('/showStockAmounts', methods=['POST'])
def getStockInputs():
    allValidFields = True
    for symbol in indexSymbols:
        if(request.form[symbol].strip() is "" or request.form[symbol].strip().isdigit is False):
            allValidFields = False
    if(allValidFields is True):
        for symbol in indexSymbols:
            allocatedFunds[symbol] = float(request.form[symbol].strip())
        shares = []
        sharesToBuy = allocateShares(getCurrentStockPrices())
        for symbol in indexSymbols:
            shares.append(symbol + " : " + str(sharesToBuy[symbol]) + " shares")
        return render_template("index.html", stocks = indexSymbols, stockShares = shares)
        
                
if __name__ == '__main__':
    app.run()