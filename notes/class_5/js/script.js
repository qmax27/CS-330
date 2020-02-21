/*jshint esversion: 8 */
/*jshint node: true */
/*jshint browser: true */
'use strict';

var allCourses = {
    "CS130":[130,2],
    "CS140":[140,2],
    "CS150":[150,4],
    "CS160":[160,4],
    "CS252":[252,4],
    "CS260":[260,4],
    "CS330":[330,4]
};

var allGrades = {
    "A": 4.0,
    "B": 3.0,
    "C": 2.0,
    "D": 1.0,
    "F": 0
};

function populateTitleOption(titleSelect) {
    for (const course in allCourses) {
        let titleOption = document.createElement("option");
        titleOption.setAttribute("value", allCourses[course][0]);
        titleOption.innerHTML = course;
        titleSelect.appendChild(titleOption);
    }
}

function populateGradeOption(gradeSelect) {
    for (const grade in allGrades) {
        let gradeOption = document.createElement("option");
        gradeOption.setAttribute("value", allGrades[grade]);
        gradeOption.innerHTML = grade;
        gradeSelect.appendChild(gradeOption);
    }
}

function calculateGPA() {
    let alert_box = document.querySelector("#theGPA");
    alert_box.innerHTML = "You clicked the button!";
}

function addGrade() {
    let allMyCourses = document.querySelector("#grades");
    let currentCourse = document.querySelectorAll("#grades > [class='row']").length + 1;
    let thisCourseDiv = document.createElement("div");
    thisCourseDiv.setAttribute("class", "row");

    let titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "form-group-col");

    let titleSelect = document.createElement("select");
    titleSelect.setAttribute("class", "form-control select-title");
    titleSelect.setAttribute("id", `title${currentCourse}`);
    titleDiv.appendChild(titleSelect);

    let creditsDiv = document.createElement("div");
    creditsDiv.setAttribute("class", "form-group col-3");

    let creditsInput = document.createElement("input");
    creditsInput.setAttribute("type", "number");
    creditsInput.setAttribute("min", 0);
    creditsInput.setAttribute("max", 4);


    creditsDiv.appendChild(creditsInput);
    

    populateTitleOption(titleSelect);
    thisCourseDiv.appendChild(titleDiv);
    thisCourseDiv.appendChild(creditsDiv);
    allMyCourses.appendChild(thisCourseDiv);

}