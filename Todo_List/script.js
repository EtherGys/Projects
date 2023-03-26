"use strict";

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const Btnadd = document.querySelector('#add_Btn')
const Btndelete = document.querySelector('#delete_Btn')
var el_checkbox = document.querySelectorAll('.task_checkbox');


function todoHtml(todoValue) {
    return(`
     <li class="todo_list_item">
     <input type="checkbox" class="task_checkbox">
     <span class="todo_list_item-text">${todoValue}</span>
     </li>
     `);
};

function insertTodoEl() {
    todoList.insertAdjacentHTML('afterend', todoHtml(todoInput.value)); //Add new task at the end of Todo List
    todoInput.value = '';//Remove the task in the form after function done
    el_checkbox = document.querySelectorAll('.task_checkbox');
};

function deleteChecked() {
    el_checkbox = document.querySelectorAll('.task_checkbox');
    el_checkbox.forEach(node => {
        if (node.checked) {
            let parent = node.parentNode;
            parent.remove();
        }
    })
};

 
Btnadd.onclick = insertTodoEl;
Btndelete.onclick = deleteChecked;


 