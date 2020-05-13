/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

const BASE_URL = "http://localhost:5000/api"
// const BASE_URL = "https://maxqu01.pythonanywhere.com/api/"


async function requestData(typeOfData) {
    return await fetch(`${BASE_URL}/${typeOfData}`)
    .then(response => response.json())
    .then(json => printData(json))
    .catch(error => console.log(error))
}

function printData(data) {
    let responseDiv = document.querySelector("#r1");
    responseDiv.innerHTML = "Bid: "+String(data[0]);
    responseDiv = document.querySelector("#r2");
    responseDiv.innerHTML = "Ask: "+String(data[1]);
    responseDiv = document.querySelector("#r3");
    responseDiv.innerHTML = "Volume: "+String(data[2]);
    
}