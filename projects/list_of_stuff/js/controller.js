/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */

'use strict';

var industryList = ["Consumer Goods","Energy","Financials","Health Care", "Industrials", "IT", "Materials", "Real Estate", "Telecom", "Utilities"];

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
};

var myPortfolio = new Portfolio();
var viewMyPortfolio = new PortfolioView();

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

    

    viewMyPortfolio.add(myNewStock);

    window.alert(viewMyPortfolio);

}

