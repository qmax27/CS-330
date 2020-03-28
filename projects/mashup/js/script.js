/* jshint esversion: 8 */
/* jshint node: true */
/* jshint jquery: true */
/* jshint browser: true */
'use strict';

var countries = ["United States (S&P 500)", "Great Britain (FTSE 100)", "Germany (DAX)", "Russia (MOEX)", "Japan (Nikkei 225)", "China (SSE Composite Index)"];
var currencies = ["USD","GBP", "EUR", "RUB", "JPY", "CNY"];

async function getData(url) {
    return await fetch(url)
    .then(response => response.text())
    .catch(error => console.log(error));
}

async function analyzeInvestment(){
    if (!document.querySelector("#form").checkValidity()){
        let exists = document.querySelector("#warningMessage");
        if (exists){
            return;
        }
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger alert-dismissible");
        warning.setAttribute("id", "warningMessage");
        warning.innerHTML ="Please correctly enter all of the values before adding analyzing investment";
        let body = document.querySelector("#errorSpace");
        body.appendChild(warning);
        return;
    }
    let warning = document.querySelector("#warningMessage");
    if (warning) {
        warning.remove();
    }
    let country = document.querySelector("#country").selectedOptions[0].value;
    let newCurrency = '';
    let index = '';
    let newSymbol = '';
    if (country == "United States (S&P 500)"){
        index = "%5EGSPC";
        newCurrency = "USD";
        newSymbol = "$";
    }
    else if (country == "Great Britain (FTSE 100)"){
        index = "%5EFTSE";
        newCurrency = "GBP";
        newSymbol = "£";
    }
    else if (country == "Germany (DAX)"){
        index = "%5EGDAXI";
        newCurrency = "EUR";
        newSymbol = "€";
    }
    else if (country == "Russia (MOEX)"){
        index = "IMOEX.ME";
        newCurrency = "RUB";
        newSymbol = "₽";
    }
    else if (country == "Japan (Nikkei 225)"){
        index = "%5EN225";
        newCurrency = "JPY";
        newSymbol = "¥";
    }
    else if (country == "China (SSE Composite Index)"){
        index = "000001.SS";
        newCurrency = "CNY";
        newSymbol = "¥";
    }
    let oldCurrency =  document.querySelector("#currency").selectedOptions[0].value;    
    let iEquity = document.querySelector("#initialEquity").value;
    let pDate = document.querySelector("#purchaseDate").value;
    let sDate = document.querySelector("#saleDate").value;

    if (sDate == ""){
        sDate = new Date();
        sDate.setDate(sDate.getDate() -1);
        console.log(sDate);
        sDate = sDate.getFullYear()+'-'+(sDate.getMonth()+1)+'-'+sDate.getDate();
    }
    let initialExchange = await getRateChange(pDate, oldCurrency, newCurrency);
    initialExchange = initialExchange*iEquity;
    let finalExchange = await getRateChange(sDate, newCurrency, oldCurrency);
    let equityChange = await getIndexChange(pDate, sDate, index);
    let finalToExchange = equityChange*initialExchange;
    let fEquity = finalToExchange*finalExchange;
    console.log("Initial: "+iEquity)
    console.log("Initial Exchanged: "+initialExchange);
    console.log("Final to Exchange: "+finalToExchange);
    console.log("Final: "+ fEquity);

    console.log("EC: "+(fEquity-iEquity));
    console.log("EC%: "+(((fEquity-iEquity)/(iEquity))*100)+"%");
    let beforeEx = (((finalToExchange-initialExchange)/initialExchange)*100).toFixed(2);
    let afterEx = (((fEquity-iEquity)/iEquity)*100).toFixed(2);
    let exImpact = (afterEx-beforeEx).toFixed(2);

    if (beforeEx > 0){
        beforeEx = "+"+beforeEx;
    }
    if (afterEx > 0){
        afterEx = "+"+afterEx;
    }
    if (exImpact > 0){
        exImpact = "+"+exImpact;
    }

   

    let cm = document.getElementById("cm");
    cm.innerHTML = country;
    let pd = document.getElementById("pd");
    pd.innerHTML = pDate;
    let sd = document.getElementById("sd");
    sd.innerHTML = sDate;
    let ie = document.getElementById("ie");
    ie.innerHTML = (parseFloat(iEquity)).toFixed(2)+" "+oldCurrency;
    let iee = document.getElementById("iee");
    iee.innerHTML = (initialExchange).toFixed(2)+" "+newCurrency;
    let eee = document.getElementById("eee");
    eee.innerHTML = (finalToExchange).toFixed(2)+" "+newCurrency;
    let ee = document.getElementById("ee");
    ee.innerHTML = (fEquity).toFixed(2)+" "+oldCurrency;
    let be = document.getElementById("be");
    be.innerHTML = beforeEx+" %";
    let ae = document.getElementById("ae");
    ae.innerHTML = afterEx+" %";
    let ei = document.getElementById("ei");
    ei.innerHTML = exImpact+" %";
    
}

async function getRateChange(date, oldCurrency, newCurrency){
    // https://api.exchangeratesapi.io/2019-03-24?symbols=EUR&base=USD
    let URL = "https://api.exchangeratesapi.io/"+date+"?symbols="+newCurrency+"&base="+oldCurrency;
    let RateData = await getData(URL);
    console.log(RateData);
    RateData = JSON.parse(RateData);
    let rates = RateData["rates"];
    let exchangeMultiplier = rates[newCurrency];
    console.log(exchangeMultiplier);

    // let finalURL = "https://api.exchangeratesapi.io/"+sDate+"?symbols="+newCurrency+"&base="+oldCurrency;
    // RateData = await getData(finalURL);
    // console.log(RateData);
    // RateData = JSON.parse(RateData);
    // rates = RateData["rates"];
    // let final = rates[newCurrency];
    // console.log(final);
    // let rateChange = final/initial;
    // console.log(rateChange);

    return exchangeMultiplier;

}

async function getIndexChange(pDate, sDate, index){
    let URL = "https://financialmodelingprep.com/api/v3/historical-price-full/index/"+index+"?from="+pDate+"&to="+pDate;
    console.log(URL);
    let data = await getData(URL);
    data = JSON.parse(data);
    data = data["historical"];
    data = data[0];
    let initialEquity = data["open"];

    URL = "https://financialmodelingprep.com/api/v3/historical-price-full/index/"+index+"?from="+sDate+"&to="+sDate;
    data = await getData(URL);
    data = JSON.parse(data);
    data = data["historical"];
    data = data[0];
    let endingEquity = data["open"];
    let equityChange = endingEquity/initialEquity;

    console.log("Change: "+ equityChange);
    return equityChange;
}

function saveInvestment(){
    let cm = document.getElementById("cm");
    cm = cm.innerHTML;
    let pd = document.getElementById("pd");
    pd = pd.innerHTML;
    let sd = document.getElementById("sd");
    sd = sd.innerHTML;
    let ie = document.getElementById("ie");
    ie = ie.innerHTML;
    let iee = document.getElementById("iee");
    iee = iee.innerHTML;
    let eee = document.getElementById("eee");
    eee = eee.innerHTML;
    let ee = document.getElementById("ee");
    ee = ee.innerHTML;
    let be = document.getElementById("be");
    be = be.innerHTML;
    let ei = document.getElementById("ei");
    ei = ei.innerHTML;
    let ae = document.getElementById("ae");
    ae = ae.innerHTML;
    


    // localStorage.removeItem("exchange");
    let currentEx = {"cm":cm, "pd":pd, "sd":sd, "ie":ie, "iee":iee, "eee":eee, "ee":ee, "be":be, "ei":ei, "ae":ae};

    setTimeout(function() {

        localStorage.setItem("exchange",JSON.stringify(currentEx));
    },500);
}

function loadInvestment(){
    let investment = JSON.parse(localStorage.getItem("exchange"));
    let cm = document.getElementById("cm");
    cm.innerHTML = investment["cm"];
    let pd = document.getElementById("pd");
    pd.innerHTML = investment["pd"];
    let sd = document.getElementById("sd");
    sd.innerHTML = investment["sd"];
    let ie = document.getElementById("ie");
    ie.innerHTML = investment["ie"];
    let iee = document.getElementById("iee");
    iee.innerHTML = investment["iee"];
    let eee = document.getElementById("eee");
    eee.innerHTML = investment["eee"];
    let ee = document.getElementById("ee");
    ee.innerHTML = investment["ee"];
    let be = document.getElementById("be");
    be.innerHTML = investment["be"];
    let ei = document.getElementById("ei");
    ei.innerHTML = investment["ei"];
    let ae = document.getElementById("ae");
    ae.innerHTML = investment["ae"];
}



function populateSelect(selectID, sList){
    let comp = document.querySelector(selectID);
    for (const optionVal of sList) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", optionVal);
        newOption.innerHTML = optionVal;
        comp.appendChild(newOption);
    }

}

window.onload = function() {
    loadInvestment();
    populateSelect("#country", countries);
    populateSelect("#currency", currencies);

};