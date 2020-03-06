/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
'use strict';

class PortfolioView {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(listOfStocks, msg){
        let tblBody = document.querySelector("#portfolio > tbody");
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
            tdpPrice.innerHTML = stock.pPrice;
            row.appendChild(tdpPrice);

            let tdcPrice = document.createElement("td");
            tdcPrice.innerHTML = stock.cPrice;
            row.appendChild(tdcPrice);

            let tdPL = document.createElement("td");
            tdPL.innerHTML = stock.pl;
            row.appendChild(tdPL);

            let tdChange = document.createElement("td");
            tdChange.innerHTML = stock.percentChange;
            row.appendChild(tdChange);

            window.alert("this is the row" +row);



        }
    }
}
// this._company = company;
// this._industry = industry;
// this._nShares = nShares;
// this._pPrice = pPrice;
// this._cPrice = cPrice;
// this._pl = cPrice-pPrice;
// this._percentChange = (_pl)/(_pPrice);