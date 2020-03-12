<<<<<<< HEAD
/* jshint esversion: 6 */
=======
/* jshint esversion: 8 */
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
/* jshint node: true */
/* jshint browser: true */
'use strict';

var connections = ["wired", "bluetooth", "infrared"];
var colors = ["red", "green", "blue", "black", "white", "multicolor"];

<<<<<<< HEAD

function populateSelectOption(selectID, optionArray){
    let menu = document.querySelector(selectID);
=======
function populateSelectOption(selectId, optionArray) {
    let menu = document.querySelector(selectId);
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
    for (const optionVal of optionArray) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", optionVal);
        newOption.innerHTML = optionVal;
        menu.appendChild(newOption);
    }

}

var myLabModel = new Lab(50);
var myLabView = new LabView(myLabModel);

<<<<<<< HEAD
function addMouse(){
    if (!document.querySelector("#newMouse").checkValidity()){
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger dismissable");
        warning.innerHTML ="ENTER ALL THE VALUES";
=======
function addMouse() {
    if (!document.querySelector("#newMouse").checkValidity()) {
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger");
        warning.innerHTML = "ENTER ALL THE VALUES!!!";
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
        let body = document.querySelector("body");
        body.appendChild(warning);
        return;
    }

    let buttons = document.querySelector("#mouseButtons").value;
    let connectivity = document.querySelector("#mouseConnection").selectedOptions[0].value;
    let color = document.querySelector("#mouseColor").selectedOptions[0].value;
    let newMouse = new ComputerMouse(buttons, connectivity, color);
    myLabModel.add(newMouse);
    // console.log(newMouse.toString());
<<<<<<< HEAD
    // for (let m of myLabModel) {
    //     console.log(m.toString());
    // }
=======
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9

}

window.onload = function() {
    populateSelectOption("#mouseConnection", this.connections);
    populateSelectOption("#mouseColor", this.colors);
}