/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

function isPrime(n) {
    if (n === 2 ) {
        return true;
    }
    var i;
    var s;
    for (i=2, s = n**0.5; i<=s; i++)  {
        if (n%i === 0) {
            return false;
        }
    return true;
    }
}

function getNPrimes(n) {
    let NPrimesList = [];
    let valueToTest = 2;
    while (NPrimesList.length < n){
        if (isPrime(valueToTest)) {
            NPrimesList.append(valueToTest);
        }
        valueToTest++;
    }
    return NPrimesList;
}

function printNPrimes(n){
    let listToPrint = getNPrimes(n);
    let tableToPrint = '';
    while (listToPrint.length > 0){
        for (let x = 0; x < 5; x++){
            tableToPrint += tableToPrint.pop(0);
            tableToPrint += " ";
        }
        tableToPrint += "\n";
    }
    return tableToPrint;
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
    // let primesTable = printNPrimes(number);
    // primeTest.innerHTML = `${primesTable}`;

}
function addParagraph() {
    let c = document.querySelector("#content");
    let p = document.createElement("p");
    c.append(p);
}
// function addTable(){
//     let c = document.querySelector("#content");
//     let t = document.createElement("table");
//     c.append(t);
// }
window.onload = function() {
    addParagraph();
    this.greetByName();
    this.UsersPrime();
};
