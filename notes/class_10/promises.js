<<<<<<< HEAD
/*jshint esversion: 8 */
/*jshint node: true */
'use strict';


function resolve_with_wait() {
    return new Promise(resolve => {
        setTimeout(() => {resolve("resolve");
=======
/* jshint esversion: 8 */
/* jshint node: true */
'use strict';

function resolve_with_wait() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    }, 1000);
    });
}

function func() {
<<<<<<< HEAD
    console.log("calling resolve_with_timeout");
=======
    console.log("Calling resolve_with_timeout");
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    let result = resolve_with_wait();
    console.log(result);
}

// func();

async function async_func() {
    console.log("Calling resolve_with_wait");
    let result = await resolve_with_wait();
    console.log(result);
<<<<<<< HEAD
    console.log("Done!");
}

// async_func();

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
=======
    console.log("Done")
}

async_func();
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
