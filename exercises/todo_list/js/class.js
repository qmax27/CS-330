/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
'use strict';

class Task {

    constructor(taskName, assignedTo, priority, dueDate) {
        this.taskName = taskName;
        this.assignedTo = assignedTo;
        this.priority = priority;
        this.dueDate = dueDate;

    }



}

class TaskList {
    constructor() {
        
        this.taskList = [];
    }
    
    add(task) {
        this.taskList.push(task);
    }
    remove(taskPosition){
        this.taskList.splice(0, taskPosition);   
    }
    
}