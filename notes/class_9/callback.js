/* jshint esversion: 8 */
/* jshint node: true */
<<<<<<< HEAD
<<<<<<< HEAD
'use scrict';

function first(){

    return 1;
}

function second(){
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
'use strict';

function first() {
    return 1;
}

function second() {
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    return 2;
}

// console.log(first());
// console.log(second);

<<<<<<< HEAD
<<<<<<< HEAD
function printWithTimeout(){
    setTimeout(function() {
        console.log(4);
    }, 1000);
}

function printImmediately(){
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
function printWithTimeout() {
    setTimeout(function() {
        console.log(4);
    }, 500);
}

function printImmediately() {
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    console.log(5);
}

// printWithTimeout();
// printImmediately();

<<<<<<< HEAD
<<<<<<< HEAD
function rudeAwakening(){
    console.log("And then I woke up!");
=======
function rudeAwakening() {
    console.log("And then I woke up");
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
function rudeAwakening() {
    console.log("And then I woke up");
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
}

function sleep(duration, f) {
    console.log(`I slept for ${duration} seconds`);
    f();
}

// sleep(5, rudeAwakening);
<<<<<<< HEAD
<<<<<<< HEAD
// sleep(3600, function() {console.log("and forgot to wake up!");});

function doneSleeping(){
=======
// sleep(3600, function() {console.log("And woke up happy");});

function doneSleeping() {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
// sleep(3600, function() {console.log("And woke up happy");});

function doneSleeping() {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    let duration = 7;
    function reallyDone() {
        console.log(`I slept for ${duration} minutes`);
    }
    reallyDone();
}

// doneSleeping();
// reallyDone();

function done(activity) {
    return function() {
        console.log(`Done ${activity}`);
    };
}

<<<<<<< HEAD
<<<<<<< HEAD
// sleep(5, done('sleeping'))

=======
// sleep(5, done("sleeping"));
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
// sleep(5, done("sleeping"));
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862

var doneBound = function(activity) {
    console.log(`Done with ${activity}`);
};

// sleep(5, doneBound.bind(this, "sleeping"));

<<<<<<< HEAD
<<<<<<< HEAD
//**Naive Approach**
// var counter = 0;

// function add1(){
//     counter ++;
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
/** Naive approach */
// var counter = 0;

// function add1() {
//     counter++;
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
// }

// function rogueAdder() {
//     counter += 330;
// }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======

>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
// console.log(counter);
// add1();
// rogueAdder();
// add1();
// console.log(counter);

var add1 = (function() {
    var counter = 0;
<<<<<<< HEAD
<<<<<<< HEAD
    return function() {counter +=1; return counter;};
})();

//prints 1 2 3 because var counter = 0 is only called once and the inner function remembers counter//
=======
    return function() {counter += 1; return counter;};
})();

>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
    return function() {counter += 1; return counter;};
})();

>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
// console.log(add1());
// console.log(add1());
// console.log(add1());

function makeAdder(x) {
    return function (y) {
<<<<<<< HEAD
<<<<<<< HEAD
        console.log(`${x} + ${y} = ${x+y}`);
        return x+y;
=======
        console.log(`${x} + ${y} = ${x + y}`);
        return x + y;
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
        console.log(`${x} + ${y} = ${x + y}`);
        return x + y;
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    };
}

var add4 = makeAdder(4);
var add744 = makeAdder(744);

console.log(add4(330));
console.log(add744(330));

<<<<<<< HEAD
<<<<<<< HEAD
//Example:
// twitter_object.get("search/tweets", parameters, 
// function(err,data,response{
//     if (!err){
//         process(data);
//     }
// }))




=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
// twitter_object.get("search/tweets", params, function(err, data, response) {
//     if (!err) {
//         process(data)
//     }
<<<<<<< HEAD
// })
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
// })
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
