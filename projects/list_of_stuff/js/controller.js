/* jshint esversion: 8 */
/* jshint node: true */
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

window.onload = function() {

    populateSelectOption("#industry", this.industryList);
    // loadPortfolio();
};

// let portfolio = (localStorage.getItem("portfolio"));


var myPortfolio = new Portfolio();

// let viewMyPortfolio = new PortfolioView(portfolio);
// viewMyPortfolio.redrawList(myPortfolio);

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

function checked() {
    window.alert("checked got called");
    let ID = 0;
    let row = document.getElementById(ID);
    window.alert(row);
    let button = document.getElementById(("b"+ID));
    if (button.checked) 
    {
        row.style.textDecoration = "line-through";
    } else {
        row.style.textDecoration = 'none';
    }
  }

function savePortfolio() {
    if(window.confirm("Are you sure you want to save your portfolio?")){

        localStorage.setItem("portfolio", myPortfolio);

    }
}
   


function removeSelected() {
    if(window.confirm("Are you sure you want to remove selected stocks?")){

    }
  
}

function removeAll() {
    if(window.confirm("Are you sure you want to remove all?")){
        localStorage.removeItem("portfolio");
        myPortfolio = new Portfolio();
        let viewMyPortfolio = new PortfolioView(myPortfolio);
        viewMyPortfolio.redrawList(myPortfolio);
    }
}

function loadPortfolio() {

}