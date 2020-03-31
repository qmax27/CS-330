/* jshint esversion: 8 */
/* jshint node: true */
/*jshint jquery: true */
/* jshint browser: true */

'use strict';

var industryList = ["Consumer Goods","Energy","Financials","Health Care", "Industrials", "IT", "Materials", "Real Estate", "Telecom", "Utilities", "Other"];

function populateSelectOption(selectId, optionArray) {
    let menu = document.querySelector(selectId);
    for (const optionVal of optionArray) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", optionVal);
        newOption.innerHTML = optionVal;
        menu.appendChild(newOption);
    }
}

//Global variable declared when the window loads, based on what is inside local storage when the page loads.
var myPortfolio = loadPortfolio();

function addStock(){
    if(!document.querySelector("#newStock").checkValidity()){
        let exists = document.querySelector("#warningMessage");
        if (exists){
            return;
        }
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger alert-dismissible");
        warning.setAttribute("id", "warningMessage");
        warning.innerHTML ="Please enter all of the values before adding stock";
        let body = document.querySelector("#errorSpace");
        body.appendChild(warning);
        return;
    }
    let company = document.querySelector("#company").value;
    let industry = document.querySelector("#industry").selectedOptions[0].value;
    let nShares = document.querySelector("#shares").value;
    let pPrice = document.querySelector("#purchase").value;
    let cPrice = document.querySelector("#current").value;
    
    var myNewStock = new Stock(company, industry, nShares, pPrice, cPrice);

    myPortfolio.add(myNewStock);

    var viewMyPortfolio = new PortfolioView(myPortfolio);

    viewMyPortfolio.redrawList(myPortfolio);
    let exists = document.querySelector("#warningMessage");
    exists.remove();
}

function getUniqueID() {
    let ID = 0;
    let exists = document.getElementById(ID);
    while (exists) {
        ID +=1;
        exists = document.getElementById(ID);
    }
    return ID;    
}



function savePortfolio() {
    if(window.confirm("Are you sure you want to save your portfolio?")){
        //localStorage.setItem was appending instead of overwriting, so I had to remove the existing data before adding new data
        localStorage.removeItem("portfolio");
        //I had to use the setTimeout to delay when it tries to put in the new data. If I didn't use setTimeout, the data wouldn't save at all.
        setTimeout(function() {
            let portfolio = localStorage.getItem("portfolio");
            portfolio = portfolio ? JSON.parse(portfolio) : [];
            for (let stocks of myPortfolio) {
                portfolio.push(stocks);
            }
            localStorage.setItem("portfolio",JSON.stringify(portfolio));
        },500);
    }
}

function removeSelected() {
    if(window.confirm("Are you sure you want to remove selected stocks? This will not change your saved portfolio, but will change your active portfolio.")){
        let table = document.querySelector("#portfolio");
        var checkedRows = [];
        for (var i = 0; i < document.getElementsByClassName("checkbox_check").length; i++){
            if(document.getElementsByClassName("checkbox_check")[i].checked) {
                checkedRows.push(i);
            }
        }
        let count = 0;
        for (let s of checkedRows){
            s = s - count;
            count +=1;
            myPortfolio.remove(s);
        }
        var viewMyPortfolio = new PortfolioView(myPortfolio);
        viewMyPortfolio.redrawList(myPortfolio);
    }
}

function removeAll() {
    if(window.confirm("Are you sure you want to remove all? This will also clear your saved portfolio.")){
        localStorage.removeItem("portfolio");
        myPortfolio = new Portfolio();
        let viewMyPortfolio = new PortfolioView(myPortfolio);
        viewMyPortfolio.redrawList(myPortfolio);
    }
}

function loadPortfolio() {
    let portfolio = JSON.parse(localStorage.getItem("portfolio"));
    var myPortfolio = new Portfolio();
    if (!portfolio){
        return myPortfolio;
    }

    //When I tried to get individual stocks out of the loaded portfolio, it would come back undefined. 
    //Manually splitting the stringified data was the only way I could get it extracted and put into a new portfolio
    for (let stock of portfolio) {
        let stockString = JSON.stringify(stock);
        let company = stockString.split('"_company":"')[1].split('",')[0];
        let industry = stockString.split('"_industry":"')[1].split('",')[0];
        let nShares = stockString.split('"_nShares":"')[1].split('",')[0];
        let pPrice = stockString.split('"_pPrice":"')[1].split('",')[0];
        let cPrice = stockString.split('"_cPrice":"')[1].split('",')[0];
        var myNewStock = new Stock(company, industry, nShares, pPrice, cPrice);
        
        myPortfolio.add(myNewStock);
    }

    var viewMyPortfolio = new PortfolioView(myPortfolio);
    viewMyPortfolio.redrawList(myPortfolio);
    return myPortfolio;
}

window.onload = function() {

    populateSelectOption("#industry", this.industryList);
    //I wanted to declare myPortfolio as a global variable, so it loads outside of the onload function.
    
};
