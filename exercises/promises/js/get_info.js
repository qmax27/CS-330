
/* jshint esversion: 8 */
/* jshint node: true */
/* jshint jquery: true */
/* jshint browser: true */
'use strict';

async function getData(url) {
    return await fetch(url)
    .then(response => response.text())
    .catch(error => console.log(error));
}

function getInfo() {
    if(!document.querySelector("#numberInput").checkValidity()){
        let exists = document.querySelector("#warningMessage");
        if (exists){
            return;
        }
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger alert-dismissible");
        warning.setAttribute("id", "warningMessage");
        warning.innerHTML ="Please enter a valid number between 1-9999";
        let body = document.querySelector("#errorSpace");
        body.appendChild(warning);
        return;
    }
    let number = parseInt(document.querySelector("#numberInput").value);
    let allAtOnce = document.querySelector("#allAtOnce");
    if(!allAtOnce.checked) {
        getInfoSeparately(number);
    }
    else{
        getAllAtOnce(number);
    }
    let warning = document.querySelector("#errorSpace");
    warning.innerHTML = "";
}

async function getInfoSeparately(number){

    let tableBody = document.querySelector("#tbody");
    tableBody.innerHTML = "";

    let higher = eval(number + 1);
    let lower = eval(number - 1); 

    let lowerInfo = await getData("http://numbersapi.com/"+lower);
    displayFact(lower,lowerInfo);

    let numberInfo = await getData("http://numbersapi.com/"+number);
    displayFact(number,numberInfo);

    let higherInfo = await getData("http://numbersapi.com/"+higher);
    displayFact(higher,higherInfo);
}

async function getAllAtOnce(number) {

    let tableBody = document.querySelector("#tbody");
    tableBody.innerHTML = "";
    let higher = number + 1;
    let lower = number - 1;
    let completeInfo = await getData("http://numbersapi.com/"+lower+".."+higher+"/");
    completeInfo = JSON.parse(completeInfo);
    
    let lowerInfo = completeInfo[lower];
    let numberInfo = completeInfo[number];
    let higherInfo = completeInfo[higher];
    displayFact(lower, lowerInfo);
    displayFact(number, numberInfo);
    displayFact(higher, higherInfo); 
}

function displayFact(number,numberInfo) {
    let tableBody = document.querySelector("#tbody");
    let row = document.createElement("tr");
    let factNumber = document.createElement("td");
    factNumber.innerHTML = "<h1>"+number+"</h1>";
    row.appendChild(factNumber);
    let fact = document.createElement("td");
    fact.innerHTML = "<h2>"+numberInfo+"</h2>";
    fact.setAttribute("class", "bg-success rounded");
    row.appendChild(fact);
    tableBody.appendChild(row);
}
