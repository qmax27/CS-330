/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

function isPrime(n) {
    if (n === 2 ) {
        return true;
    }
    for (var i=2; i<=(n**0.5); i++)  {
        if (n%i === 0) {
            return false;
        }
    }
    return true;
}

function getNPrimes(n) {
    let NPrimesList = [];
    let valueToTest = 2;
    while (NPrimesList.length < n){
        if (isPrime(valueToTest)) {
            NPrimesList.push(valueToTest);
        }
        valueToTest++;
            }
    return NPrimesList;
}

function printNPrimes(n) {
    let listToPrint = getNPrimes(n);
    var result = "<table>";
    let twidth = parseInt(listToPrint.length**0.5);
       for(var i=0; i<listToPrint.length;) {
        result += "<tr>";
            for(var j=0; j<twidth; j++){
                if (i<listToPrint.length){
                    result += "<td>"+listToPrint[i]+"</td>";
                }
                i++
            }
                result += "</tr>";
    }
    result += "</table>";
    return result;
}

function greetByName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);
    let name = urlParams.get('name');
    if (name === null){
        name = "student";
    }
    let greet = document.querySelector("h1");
    greet.innerHTML = `Hello ${name}`;
}
function UsersPrime(){
    const queryInt = window.location.search;
    const urlParams = new URLSearchParams(queryInt);
    console.log(urlParams);
    let number = urlParams.get("n");
    if (number === null){
        number = 330;
    }
    let primeTest = document.querySelector("p");
    if (isPrime(number)) {
        primeTest.innerHTML = `${number} is a prime number`;
    }
    else {
        primeTest.innerHTML = `${number} is not a prime number`;
    }
    let tableArea = document.querySelector("table");
    let primesTable = printNPrimes(number);
    tableArea.innerHTML = `${primesTable}`;

}

function addParagraph() {
    let c = document.querySelector("#content");
    let p = document.createElement("p");
    c.append(p);
}

function addTable() {
    let c = document.querySelector("#content");
    let t = document.createElement("table");
    c.append(t);
}

window.onload = function() {
    addParagraph();
    this.greetByName();
    addTable();
    this.UsersPrime();
};
