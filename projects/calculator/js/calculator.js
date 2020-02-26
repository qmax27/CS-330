/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

function addNewValue(val) 
{ 
    if (val == "clear") {
        document.getElementById("screen").value= "Clearing..." ;
        setTimeout(function() { document.getElementById("screen").value= " ";},1000);

    }
    else {
        document.getElementById("screen").value+=val ;
    }
}

function solve() 
{ 
    let x = document.getElementById("screen").value ;
    try{
        let y = eval(x);
        document.getElementById("screen").value = y;
    }
    catch{
        document.getElementById("screen").value = "Invalid Calculation. Clearing...";
        setTimeout(function() { document.getElementById("screen").value= " ";},1000);
    }
    
}
  