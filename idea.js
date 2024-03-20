//бургер
document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".header-menu").classList.toggle("open");
});

//найти элемент на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  //формируем css класс
  const cssClass = task.done
    ? "btn-action done btn-action--done"
    : "btn-action done";
  //добавить задачу в хранилище браузера
  saveToLocalStorage();

  //сформировать разметку для новой задачи
  const taskHTML = `
    <li id = "${task.id}" class="list-group-item  task-item">
    <span class="task-title">${task.text}</span>
    <div class="task-item__buttons">
    <button type="button " data-action="done" class="${cssClass}">
    🤍 0
  </button>
        <button type="button" data-action="delete" class="btn-action">
        ❌
        </button>
    </div>
  </li>`;

  //добавить разметку на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
});

//отправить
form.addEventListener("submit", addTask);

//удалить
tasksList.addEventListener("click", deleteTask);

//лайк
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  //отменяет отправку форму (не перезагружает страницу)
  event.preventDefault();

  //достать текст из поля ввода
  const taskText = taskInput.value;

  //если в поле ничего нет, то не выводить
  if (taskInput.value.length === 0) {
    return;
  }
  //задача в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //добавить объект в массив с задачами
  tasks.push(newTask);
  console.log(tasks);

  //формируем css класс
  const cssClass = newTask.done
    ? "btn-action done btn-action--done"
    : "btn-action done";
  //добавить задачу в хранилище браузера
  saveToLocalStorage();

  //сформировать разметку для новой задачи
  const taskHTML = `
    <li id = "${newTask.id}" class="list-group-item  task-item">
    <span class="task-title">${newTask.text}</span>
    <div class="task-item__buttons">
    <button type="button " data-action="done" class="${cssClass}">
    🤍 0
  </button>
        <button type="button" data-action="delete" class="btn-action">
        ❌
        </button>
    </div>
  </li>`;

  //добавить разметку на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  //очистить поле ввода и возвратить на него фокус
  taskInput.value = "";

  taskInput.focus();

  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parenNode = event.target.closest(".list-group-item");

    //определяем айди задачи
    const id = Number(parenNode.id);
    //найти индекс задачи в массиве
    const index = tasks.findIndex(function (task) {
      if (task.id === id) {
        return true;
      }
      //   return task.id === id;
    });

    if (window.confirm("Вы уверены что хотите удалить запись?")) {
      //удалить задачу из массива
      tasks.splice(index, 1);

      //добавить задачу в хранилище браузера
      saveToLocalStorage();

      //удалить задачу из разметки
      parenNode.remove();
    }
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//лайк
function doneTask(event) {
  //проверить что клик выполенен по кнопке лайк

  if (event.target.dataset.action === "done") {
    const parenNode = event.target.closest(".list-group-item");

    //определить айди задачи
    const id = Number(parenNode.id);

    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    });
    task.done = !task.done;
    saveToLocalStorage();

    const btnDone = parenNode.querySelector(".done");

    btnDone.classList.toggle("btn-action--done");
  }
}
