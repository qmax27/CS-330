/* jshint esversion: 6 */
/* jshint browser: true */
"use strict;";

var team = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var priority = ["Low", "Normal", "Important", "Critical"];

var tasksToDo = new TaskList();

function addTask() {
    if (!document.querySelector("#newTask").checkValidity()){
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
    //Error on this line
    var tabletocount = document.querySelector("#ToDoTable");
    var IDNumber = tabletocount.rows.length + 1;
    
    let newRow = '<tr id="'+IDNumber+'" class="'+priority+'"><td><input type="checkbox" onclick=removeRow('+IDNumber+')></td><td>'+task+"</td><td>"+assigned+"</td><td>"+priority+"</td><td>"+due+"</td></tr>";
    //The rest should work
    let newTask = new Task(task, assigned, priority, due);
    tasksToDo.add(newTask);

    let ToDoTable = document.querySelector("#ToDoTable");
    ToDoTable.innerHTML += newRow;

    
}

function addRow(valueList, parent) {
}

function removeRow(number) {

    let table = document.querySelector("#ToDoTable");
    ID = "#"+number;
    table.remove(ID);    
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
