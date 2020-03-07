/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
'use strict';

class PortfolioView {
    
    constructor(model) {
        this.model = model;
        // model.subscribe(this.redrawList.bind(this));
    }
    
    redrawList(listOfStocks){
        // window.alert("redrawList got called");
        let tblBody = document.querySelector("#portfolio > tbody");
        let sEqTotal = 0;
        let cEqTotal = 0;
        let plTotal = 0;
        let perChangeTotal = 0;


        
        tblBody.innerHTML = "";

        for (let stock of listOfStocks){
            let change = stock.pl;
            let tradeType = "neutral";

            if (change > 0){
                tradeType = "good";
            }
            else if (change < 0){
                tradeType = "bad";
            }
            let row = document.createElement("tr");
            row.setAttribute("class", tradeType);
            let tdCheck = document.createElement("td");
            tdCheck.innerHTML = '<input type="checkbox"  id="elimButton">';
            row.appendChild(tdCheck);
            

            let tdCompany = document.createElement("td");
            tdCompany.innerHTML = stock.company;
            row.appendChild(tdCompany);

            let tdIndustry = document.createElement("td");
            tdIndustry.innerHTML = stock.industry;
            row.appendChild(tdIndustry);

            let tdnShares = document.createElement("td");
            tdnShares.innerHTML = stock.nShares;
            row.appendChild(tdnShares);

            let tdpPrice = document.createElement("td");
            tdpPrice.innerHTML = '$'+stock.pPrice;
            row.appendChild(tdpPrice);

            let tdcPrice = document.createElement("td");
            tdcPrice.innerHTML = '$'+stock.cPrice;
            row.appendChild(tdcPrice);

            let tdpEq = document.createElement("td");
            sEqTotal +=stock.startingEquity;
            tdpEq.innerHTML = '$'+stock.startingEquity;
            row.appendChild(tdpEq);

            let tdcEq = document.createElement("td");
            cEqTotal +=stock.currentEquity;
            tdcEq.innerHTML = '$'+stock.currentEquity;
            row.appendChild(tdcEq);

            let tdPL = document.createElement("td");
            plTotal += stock.pl;
            tdPL.innerHTML = '$'+stock.pl;
            row.appendChild(tdPL);

            let tdChange = document.createElement("td");
            tdChange.innerHTML = stock.percentChange+' %';
            row.appendChild(tdChange);

            let tableToAppend = document.querySelector("#portfolioBody");
            tableToAppend.appendChild(row);


            // window.alert("this is the row" +row);



        }
        let SE = document.querySelector("#SE");
        window.alert(sEqTotal);
        SE.innerHTML = "$"+sEqTotal;

        let CE = document.querySelector("#CE");
        window.alert(cEqTotal);

        CE.innerHTML = "$"+cEqTotal;

        let PL = document.querySelector("#PL");
        window.alert(plTotal);
        CE.innerHTML = "$"+plTotal;

        let PER = document.querySelector("#PER");
        perChangeTotal = (100*plTotal/(sEqTotal))+"%";
        window.alert(perChangeTotal);
        CE.innerHTML = perChangeTotal;
    }
}
// this._company = company;
// this._industry = industry;
// this._nShares = nShares;
// this._pPrice = pPrice;
// this._cPrice = cPrice;
// this._pl = cPrice-pPrice;
// this._percentChange = (_pl)/(_pPrice);