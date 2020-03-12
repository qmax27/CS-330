/* jshint esversion: 6 */
/* jshint browser: true */
/* jshint node: true */
/* jshint jquery: true */
"use strict;";


function populateSelect(selectID, selectItems) {
    let sel = document.querySelector(selectID);
/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
/* jshint jquery: true */
'use strict';

function populateSelect(selectId, selectItems) {
    let sel = document.querySelector(selectId);
    for (let item of selectItems) {
        let opt = document.createElement("option");
        opt.value = item;
        opt.innerHTML = item;
        sel.appendChild(opt);

    }
}

function addCar() {
    let garage = localStorage.getItem("garage");
    garage = garage ? JSON.parse(garage) : [];
    // ^ is the same as:
    // if (garage) {
    //     garage = JSON.parse(garage);
    // } else {
    //     garage = [];
    // }
    let selectNames = ["make", "model", "year"];
    let newCar = {};
    for (let i of selectNames) {
        newCar[i] = document.getElementById("select_"+i).value;
    }
    garage.push(newCar);
    localStorage.setItem("garage", JSON.stringify(garage));
    $("#garage").html("");
    loadCars();

}

function clearAll() {
    localStorage.clear();
    $("#garage").html("");
}

function loadCars(){
    let garage = JSON.parse(localStorage.getItem("garage"));
    let allCars = document.querySelector("#garage");
    }
}


function addCar() {
    let garage = localStorage.getItem("garage");
    garage = garage ? JSON.parse(garage) : [];
    let selNames = ["make", "model", "year"];
    let newCar = {};
    for (let i of selNames) {
        newCar[i] = document.getElementById("sel_"+i).value;
    }
    console.log(newCar);
    garage.push(newCar);
    localStorage.setItem("garage",JSON.stringify(garage));
    loadCars();
}

function clearAll() {
    localStorage.removeItem("garage");
}

function loadCars() {
    let garage = JSON.parse(localStorage.getItem("garage"));
    let allCars = document.querySelector("#garage");
    allCars.innerHTML = "";

    if (!garage) {
        return;
    }
    for (let car of garage) {
        let aCar = document.createElement("div");
        aCar.classList = "alert alert-primary";
<<<<<<< HEAD
        aCar.innerHTML = `${car.make} ${car.model} ${car.year}`;
        allCars.appendChild(aCar);
    }


}

$(document).ready(function(){
    populateSelect("#select_make", ["Ford", "Chevy", "Toyota"]);
    populateSelect("#select_model", ["Tacoma", "Taurus", "Cobalt"]);
    populateSelect("#select_year", [2020, 2019, 2018, 2017]);
    loadCars();
});


=======
        aCar.innerHTML = `${car.make} ${car.model} (${car.year})`;
        allCars.appendChild(aCar);
    }
}


$(document).ready(function(){
    populateSelect("#sel_make", ["Ford", "Chevy", "Toyota"]);
    populateSelect("#sel_model", ["Tacoma", "Taurus", "Cobalt"]);
    populateSelect("#sel_year", [2021, 2020, 2019, 2018]);
    loadCars();
});
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
