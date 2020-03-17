<<<<<<< HEAD
<<<<<<< HEAD
/* jshint esversion: 6 */
=======
/* jshint esversion: 8 */
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
/* jshint esversion: 8 */
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
/* jshint node: true */
/* jshint browser: true */
'use strict';

<<<<<<< HEAD
<<<<<<< HEAD
class LabView{

    constructor(model){
=======
class LabView {
    constructor(model) {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
class LabView {
    constructor(model) {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
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
<<<<<<< HEAD
            row.appendChild(tdButtons)
            let tdConnectivity = document.createElement("td");
            tdConnectivity.innerHTML = mouse.connectionType;
            row.appendChild(tdConnectivity);
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
            row.appendChild(tdButtons);
            let tdConn = document.createElement("td");
            tdConn.innerHTML = mouse.connectionType;
            row.appendChild(tdConn);
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
            let tdColor = document.createElement("td");
            tdColor.innerHTML = mouse.color;
            row.appendChild(tdColor);
            tblBody.appendChild(row);
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD






}
=======
}


>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
}


>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
