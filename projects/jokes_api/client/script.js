/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

const BASE_URL = "http://maxqu01.pythonanywhere.com/api/v1"

async function requestData(typeOfData) {
    return fetch(`${BASE_URL}/${typeOfData}`)
    .then(response => response.json())
    .then(json => printData(json[typeOfData]))
    .catch(error => console.log(error))
}

function printData(data) {
    let responseDiv = document.querySelector("#response");
    responseDiv.innerHTML = data;
}
