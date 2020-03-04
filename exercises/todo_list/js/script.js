/* jshint esversion: 6 */
/* jshint browser: true */
"use strict;";

var team = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var priority = ["Low", "Normal", "Important", "Critical"];


function addTask() {
    if (!document.querySelector("#newTask").checkValidity()){
        let exists = document.querySelector("#warningMessage");
        if (exists){
            return;
        }
        let warning = document.createElement("p");
        warning.setAttribute("class", "alert alert-danger alert-dismissible");
        warning.setAttribute("id", "warningMessage");
        warning.innerHTML ="Please enter all of the values before adding task";
        let body = document.querySelector("#errorSpace");
        body.appendChild(warning);
        return;
    }
    let task = document.querySelector("#task").value;
    let assigned = document.querySelector("#assignedTo").selectedOptions[0].value;
    let priority = document.querySelector("#priority").selectedOptions[0].value;
    let due = document.querySelector("#dueDate").value;
     
    let newRow = '<div><tr class="'+priority+'"><td><input type="checkbox"  id="btnEliminar" onclick=removeRow()></td><td>'+task+"</td><td>"+assigned+"</td><td>"+priority+"</td><td>"+due+"</td></tr></div>";

    let ToDoTable = document.querySelector("#ToDoTable");
    ToDoTable.innerHTML += newRow;
    let warning = document.querySelector("#warningMessage");
    warning.remove();

}


function removeRow() {
     $("#ToDoTable input[type='checkbox']:checked").closest("tr").remove();
}

function populateSelect(selectID, sList){
    let menu = document.querySelector(selectID);
    for (const optionVal of sList) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", optionVal);
        newOption.innerHTML = optionVal;
        menu.appendChild(newOption);
    }

}

window.onload = function() {

    populateSelect("#assignedTo", team);
    populateSelect("#priority", priority);
};
