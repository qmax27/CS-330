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

// function checked() {
//     // $("#ToDoTable input[type='checkbox']:checked").closest("tr").style.textDecoration = "line-through";
//     // window.alert("checked got called");
//     let row = document.getElementById(ID);
//     window.alert(row);
//     let button = document.getElementById(("b"+ID));
//     window.alert(button);
//     if (button.checked) 
//     {
//         row.style.textDecoration = "line-through";
//     } else {
//         row.style.textDecoration = 'none';
//     }
//   }

function savePortfolio() {
    // if(window.confirm("Are you sure you want to save your portfolio?")){
        // if(true){
        //     removeAll();
        // }
        let portfolio = localStorage.getItem("portfolio");
        portfolio = portfolio ? JSON.parse(portfolio) : [];
        for (let stocks of myPortfolio) {
            // window.alert(stocks);
            portfolio.push(stocks);
        }

        localStorage.setItem("portfolio",JSON.stringify(portfolio));

    // }
}


function removeSelected() {
    if(window.confirm("Are you sure you want to remove selected stocks?")){
        let table = document.querySelector("#portfolio");
        // window.alert(table);
        var tbodyRowCount = table.tBodies[0].rows.length;
        // window.alert(tbodyRowCount);

        var checkedRows = [];
        for (var i = 0; i < document.getElementsByClassName("checkbox_check").length; i++){
            if(document.getElementsByClassName("checkbox_check")[i].checked) {
                checkedRows.push(i);
            }
        }
        window.alert(checkedRows);
        let count = 0;
        for (let s of checkedRows){
            s = s - count;
            count +=1;
            myPortfolio.remove(s);
        }
        var viewMyPortfolio = new PortfolioView(myPortfolio);
        viewMyPortfolio.redrawList(myPortfolio);

        
        // for (var i = 0; i < tbodyRowCount; i++){
            
        //     // window.alert("row:"+i);

        //     if (($('input.checkbox_check').is(':checked'))) {
        //         $("#portfolio input[type='checkbox']:checked").closest("tr").remove();
        //         let item = $('.checkbox_check').index(this);
        //         window.alert(item);
        //         myPortfolio.remove(item);
        //     }
        // }
    }
}



function removeAll() {
    // if(window.confirm("Are you sure you want to remove all?")){
        localStorage.removeItem("portfolio");
        myPortfolio = new Portfolio();
        let viewMyPortfolio = new PortfolioView(myPortfolio);
        viewMyPortfolio.redrawList(myPortfolio);
    // }
}


function loadPortfolio() {
    if (!localStorage){
        return;
    }

    var myPortfolio = new Portfolio();

    for (var i = 0; i < localStorage.length; i++){
        // window.alert(i);
        let stock = localStorage.getItem(localStorage.key(i));
        // window.alert(stock);
        myPortfolio.add((localStorage.getItem(localStorage.key(i))));
    }
    // window.alert(myPortfolio);

    // for (var stock of stocks) {
    //     stock = JSON.parse(stock);
    //     window.alert(stock);
    //     myPortfolio.add(stock);
    // }
    let viewMyPortfolio = new PortfolioView(myPortfolio);
    viewMyPortfolio.redrawList(myPortfolio);
}
window.onload = function() {

    populateSelectOption("#industry", this.industryList);
    loadPortfolio();
    
};