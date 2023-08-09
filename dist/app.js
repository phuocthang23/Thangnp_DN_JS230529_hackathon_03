"use strict";
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
// * get data from localStorage
let todo = JSON.parse(localStorage.getItem("tasks") || "[]");
//* save data to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(todo));
}
function renderTodo(key) {
    let xhtml = "";
    key.forEach((item, id) => {
        xhtml += ` 
    <li>
    <span> ${item.task} </span>
    <button onclick="deleteTask(${id})"><i class='bx bx-trash'></i></button>
    </li>`;
    });
    taskList.innerHTML = xhtml;
    saveTasksToLocalStorage();
}
renderTodo(todo);
//* thêm task
addTaskButton.addEventListener("click", () => {
    let taskData = {
        id: todo.length > 0 ? todo[todo.length - 1].id + 1 : todo.length,
        task: taskInput.value.trim(),
        status: false,
    };
    if (taskData.task !== "") {
        todo.push(taskData);
        taskInput.value = "";
    }
    else {
        alert(` mời nhập công việc cần làm `);
    }
    renderTodo(todo);
});
//* xóa task
function deleteTask(id) {
    todo.splice(id, 1);
    renderTodo(todo);
}
