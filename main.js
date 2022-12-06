const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".plus-icon");
const todoList = document.querySelector(".todo-list");
const selectoption = document.querySelector(".filter-todo");

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
selectoption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", checkLocalTodos);

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === "" || todoInput.value === " ") {
    alert("The field cannot be empty");
  } else {
    const todoLi = document.createElement("li");
    const newTodo = `<p>${todoInput.value}</p>
    <div class="li-icon">
        <i class="fa-solid fa-square-check"></i>
        <i class="fa-solid fa-trash-can"></i>
    </div>`;

    todoLi.innerHTML = newTodo;

    todoList.appendChild(todoLi);
    saveLocalTodo(todoInput.value);
  }
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  if (classList[1] === "fa-square-check") {
    const todos = item.parentElement.parentElement;
    todos.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-can") {
    const todos = item.parentElement.parentElement;
    removeLocalTodos(todos);
    todos.remove();
  }
}

function filterTodo(e) {
  const todos = [...todoList.childNodes];
  todos.forEach((item) => {
    switch (e.target.value) {
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      default:
        item.style.display = "flex";
        break;
    }
  });
}

function saveLocalTodo(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function checkLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoLi = document.createElement("li");
    const newTodo = `<p>${todo}</p>
    <div class="li-icon">
        <i class="fa-solid fa-square-check"></i>
        <i class="fa-solid fa-trash-can"></i>
    </div>`;

    todoLi.innerHTML = newTodo;

    todoList.appendChild(todoLi);
  });
}

function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filtersLocalTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filtersLocalTodos));
}
