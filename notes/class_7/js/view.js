/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
'use strict';

class LabView{

    constructor(model){
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(listOfMice, msg) {
        let tblBody = document.querySelector("#tblAllMice > tbody");
        tblBody.innerHTML = "";
        for (let mouse of listOfMice) {
            let row = document.createElement("tr");
            let tdButtons = document.createElement("td");
            tdButtons.innerHTML = mouse.buttons;
            row.appendChild(tdButtons)
            let tdConnectivity = document.createElement("td");
            tdConnectivity.innerHTML = mouse.connectionType;
            row.appendChild(tdConnectivity);
            let tdColor = document.createElement("td");
            tdColor.innerHTML = mouse.color;
            row.appendChild(tdColor);
            tblBody.appendChild(row);
        }
    }






}