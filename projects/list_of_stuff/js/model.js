/* jshint esversion: 8 */
/* jshint node: true */
'use strict';

class Stock {
    constructor(company, industry, nShares, pPrice, cPrice){
        this._company = company;
        this._industry = industry;
        this._nShares = nShares;
        this._pPrice = pPrice;
        this._cPrice = cPrice;
        this._pl = cPrice-pPrice;
        this._percentChange = ((cPrice-pPrice)/(pPrice))*100;
    }

    get company(){
        return this._company;
    }

    get industry(){
        return this._industry;
    }

    get nShares(){
        return this._nShares;
    }
    get pPrice(){
        return this._pPrice;
    }
    get cPrice(){
        return this._cPrice;
    }
    get pl(){
        return this._pl;
    }
    get percentChange(){
        return this._percentChange;
    }

} 

class Portfolio extends Stock {
    constructor(){
        super();
        this._portfolio = [];
    }
    add(stock) {
        this._portfolio.push(stock);
        this.publish("New stock added", this);
    }
    [Symbol.iterator]() {
        let idx = -1;
        return {
            next: () => ({value: this._portfolio[++idx], done: !(idx in this._portfolio)})
        };

    }
}