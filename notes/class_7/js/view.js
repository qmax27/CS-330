<<<<<<< HEAD
/* jshint esversion: 6 */
=======
/* jshint esversion: 8 */
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
/* jshint node: true */
/* jshint browser: true */
'use strict';

<<<<<<< HEAD
class LabView{

    constructor(model){
=======
class LabView {
    constructor(model) {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(listOfMice, msg) {
        let tblBody = document.querySelector("#tblAllMice > tbody");
        tblBody.innerHTML = "";
        for (let mouse of listOfMice) {
            let row = document.createElement("tr");
            let tdButtons = document.createElement("td");
            tdButtons.innerHTML = mouse.buttons;
<<<<<<< HEAD
            row.appendChild(tdButtons)
            let tdConnectivity = document.createElement("td");
            tdConnectivity.innerHTML = mouse.connectionType;
            row.appendChild(tdConnectivity);
=======
            row.appendChild(tdButtons);
            let tdConn = document.createElement("td");
            tdConn.innerHTML = mouse.connectionType;
            row.appendChild(tdConn);
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
            let tdColor = document.createElement("td");
            tdColor.innerHTML = mouse.color;
            row.appendChild(tdColor);
            tblBody.appendChild(row);
        }
    }
<<<<<<< HEAD






}
=======
}


>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
