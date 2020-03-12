/*jshint esversion: 8 */
/*jshint node: true */
'use strict';


function resolve_with_wait() {
    return new Promise(resolve => {
        setTimeout(() => {resolve("resolve");
    }, 1000);
    });
}

function func() {
    console.log("calling resolve_with_timeout");
    let result = resolve_with_wait();
    console.log(result);
}

// func();

async function async_func() {
    console.log("Calling resolve_with_wait");
    let result = await resolve_with_wait();
    console.log(result);
    console.log("Done!");
}

// async_func();

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))