import datetime
import requests
import calendar, time
import json
from iexfinance.stocks import Stock, get_historical_data
import pandas as pd
import yfinance as yf

def get_details(stock):
    now = datetime.datetime.now()
    today_day = calendar.day_name[now.weekday()]
    today_date = today_day + now.strftime(" %B %d %H:%M:%S ") + time.tzname[1] + now.strftime(" %Y")  
    a = Stock(stock, token="pk_6d6e19d4b5c041f18dc2f5c19e792729")
    stock_details = a.get_quote()
    details = {}
    # get today's date
    details["Today_Date"] = today_date
    
    # get stock info
    stock_name = stock_details['companyName'] + "(" + stock  +")"
    details["Stock"] = stock_name
    present_price = stock_details['latestPrice']
    past_price = stock_details['previousClose']
    if past_price == None:
        past_price = present_price
    if present_price  >= past_price:
        profit = present_price - past_price
        profit_percentage = ((100.0 * present_price) / past_price) - 100.0
        price = str(round(present_price,2)) + " +" + str(round(profit,2)) + " (" + "+" + str(round(profit_percentage,2)) + "%)"
        details["Price"] = price
    else:
        loss = past_price - present_price
        loss_percentage = 100.0 - ((100.0 * present_price) / past_price) 
        price = str(round(present_price,2)) + " -" + str(round(loss,2)) + " (" + "-" + str(round(loss_percentage,2)) + "%)"
        details["Price"] = price

    return details

def getHistoricalPrices(stock):
    end = datetime.datetime.now().date()
    start = end -  datetime.timedelta(days=7)
    yf_history = yf.download(stock,start.strftime("%Y-%m-%d"),end.strftime("%Y-%m-%d"))['Adj Close']
    single_stock_history = pd.DataFrame(yf_history) .reset_index() 
    single_stock_history.columns = ['Date','price_' + stock]
    return single_stock_history

def get_graphs_data(stocks,amount):
        get_ethical_stocks = {}
        stocks_bought = {}
        send_data = {}
        for i in stocks:
            get_ethical_stocks[i] = float(get_details(i)['Price'].split(" ")[0])
        
        initial_sum = sum(get_ethical_stocks.values())

        while amount > min(get_ethical_stocks.values()):
            for j in get_ethical_stocks.items():
                if amount > j[1]:
                    amount = amount - j[1]
                    stocks_bought[j[0]] = stocks_bought.get(j[0],0) + 1
        
        
        
        df_stocks_0 = getHistoricalPrices(stocks[0]) 
        df_stocks_0['price_'+stocks[0]] = df_stocks_0['price_'+stocks[0]] * stocks_bought[stocks[0]]
        df_stocks_1 = getHistoricalPrices(stocks[1])
        df_stocks_1['price_'+stocks[1]] = df_stocks_1['price_'+stocks[1]] * stocks_bought[stocks[1]]
        df_stocks_2 = getHistoricalPrices(stocks[2])
        df_stocks_2['price_'+stocks[2]] = df_stocks_2['price_'+stocks[2]] * stocks_bought[stocks[2]]
        
        get_old_data_all = pd.merge(pd.merge(df_stocks_0,df_stocks_1,on='Date'),df_stocks_2,on='Date')
        get_old_data_all['Total_price'] = get_old_data_all['price_'+stocks[0]] + get_old_data_all['price_'+stocks[1]] + get_old_data_all['price_'+stocks[2]]
        get_total_price = get_old_data_all[['Date','Total_price']]
        
        stck_array = []
        for i in stocks_bought.items():
            stck = {}
            stck['Price'] = i[0]
            stck['LatestPrice'] = get_ethical_stocks[i[0]]
            stck['purchase'] = i[1]
            stck_array.append(stck)

        last_5_days = []
        for i in range(len(get_total_price.index)):
            ttl_price = {}
            ttl_price['Date'] =  get_total_price.iloc[i]['Date'].strftime("%Y-%m-%d")
            ttl_price['Amount'] = get_total_price.iloc[i]['Total_price']
            last_5_days.append(ttl_price)
            
        send_data['Stock'] = stck_array
        send_data['Lastfive'] = last_5_days

        return send_data

def invested_amount(amount,investment_type):
    if investment_type == "ethical":
        ethical_stocks = ['AAPL', 'MSFT', 'ADBE'] 
        return get_graphs_data(ethical_stocks,amount) 

    elif investment_type == "value":
        value_stocks = ['FB', 'TWTR', 'GOOG']
        return get_graphs_data(value_stocks,amount)
    
    elif investment_type == "index":
        index_stocks = ['TSLA', 'F', 'HMC']
        return get_graphs_data(index_stocks,amount)
    
    elif investment_type == "quality":
        quality_stocks = ['COST', 'WMT', 'BBY']
        return get_graphs_data(quality_stocks,amount)
    
    elif investment_type == "growth":
        growth_stocks = ['V', 'MA', 'AXP']
        return get_graphs_data(growth_stocks,amount)
        


# print(getHistoricalPrices("AAPL"))
# print(invested_amount(5000,"growth"))  
