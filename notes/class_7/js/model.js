/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

class ComputerMouse {

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

    set connectionType(newValue){
        this._connection = newValue;
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
    }

    paint(newColor){
        this._color = newColor;
    }

    toString() {
        return `A ${this._color} ${this._connection} mouse with ${this._buttons} buttons`;
   }
}

class Subject{
    constructor() {
        this.handlers = [];
    }

    subscribe(func) {
        this.handlers.push(func);
    }

    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item != func);
    }

    publish(msg, obj){
        let scope = obj || window;
        for (let f of this.handlers) {
            f(scope, msg);
        }
    }
}


class Lab extends Subject{

    constructor(theSize) {
        super();
        this._size = theSize;
        this._lab = [];
    }

    add(mouse) {
        if (this._lab.lenth < this._size) {

            this._lab.push(mouse);
            this.publish("New mouse added", this);
        }
    }

    [Symbol.iterator]() {
        let idx = -1;
        return{
            next: () => ({value: this._lab[++idx], done: !(idx in this._lab)})
        };
    }
}

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



