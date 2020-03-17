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
'use strict';

class ComputerMouse {
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    constructor(nButtons, cType, color) {
        this._buttons = nButtons;
        this._connection = cType;
        this._color = color;
    }

    get buttons() {
        return this._buttons;
    }

    get connectionType() {
        return this._connection;
    }

<<<<<<< HEAD
<<<<<<< HEAD
    set connectionType(newValue){
=======
    set connectionType(newValue) {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
    set connectionType(newValue) {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
        this._connection = newValue;
    }

    get color() {
        return this._color;
    }

<<<<<<< HEAD
<<<<<<< HEAD
    set color(newColor) {
        this._color = newColor;
    }

    paint(newColor){
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    set color(newValue) {
        this._color = newValue;
    }

    paint(newColor) {
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
        this._color = newColor;
    }

    toString() {
        return `A ${this._color} ${this._connection} mouse with ${this._buttons} buttons`;
<<<<<<< HEAD
<<<<<<< HEAD
   }
}

class Subject{
=======
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    }
}

class Subject {
<<<<<<< HEAD
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    constructor() {
        this.handlers = [];
    }

    subscribe(func) {
        this.handlers.push(func);
    }

    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item != func);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    publish(msg, obj){
=======
    publish(msg, obj) {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
    publish(msg, obj) {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
        let scope = obj || window;
        for (let f of this.handlers) {
            f(scope, msg);
        }
    }
}

<<<<<<< HEAD
<<<<<<< HEAD

class Lab extends Subject{

=======
class Lab extends Subject {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
class Lab extends Subject {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    constructor(theSize) {
        super();
        this._size = theSize;
        this._lab = [];
    }

    add(mouse) {
<<<<<<< HEAD
<<<<<<< HEAD
        if (this._lab.lenth < this._size) {

=======
        if (this._lab.length < this._size) {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
        if (this._lab.length < this._size) {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
            this._lab.push(mouse);
            this.publish("New mouse added", this);
        }
    }

    [Symbol.iterator]() {
        let idx = -1;
<<<<<<< HEAD
<<<<<<< HEAD
        return{
=======
        return {
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
        return {
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
            next: () => ({value: this._lab[++idx], done: !(idx in this._lab)})
        };
    }
}
<<<<<<< HEAD
<<<<<<< HEAD

// let olin202 = new Lab(2);
// let m1 = new ComputerMouse(1,"wired","black");
// let m2 = new ComputerMouse(3, "wireless", "green");

// olin202.add(m1);
// olin202.add(m2);
// // console.log(olin202);

// for (let m of olin202) {
//     console.log(m.toString());
//  }

// console.log("empty lab");
// let olin112 = new Lab(0);
// for (let m of olin112) {
//     console.log(m.toString());
// }



=======
>>>>>>> 75dee29cdddd062c0752fb4386b9cd183ca26fd9
=======
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
