const taskInput = document.getElementById("task") as HTMLInputElement;
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLDListElement;

interface Task {
  id: number;
  task: string;
  status: boolean;
}

// * get data from localStorage
let todo: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

//* save data to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(todo));
}

function renderTodo(key: any[]) {
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
  let taskData: Task = {
    id: todo.length > 0 ? todo[todo.length - 1].id + 1 : todo.length,
    task: taskInput.value.trim(),
    status: false,
  };

  if (taskData.task !== "") {
    todo.push(taskData);
    taskInput.value = "";
  } else {
    alert(` mời nhập công việc cần làm `);
  }

  renderTodo(todo);
});

//* xóa task
function deleteTask(id: number) {
  todo.splice(id, 1);
  renderTodo(todo);
}
