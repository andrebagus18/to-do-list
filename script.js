const buttonCreate = document.querySelector(".btn-create");
const modal = document.querySelector(".create");
const closeButton = document.querySelector(".close");
const newData = document.querySelector("#newData");
const btnSubmit = document.querySelector(".btn-submit");
const tableToday = document.querySelector("#tableToday");
const dones = document.querySelector(".dones");
const todos = document.querySelector(".todos");
const overdues = document.querySelector(".overdues");
const input = document.querySelector(".task");
const count = document.querySelector("#count1");

buttonCreate.addEventListener("click", () => {
  modal.classList.toggle("active");
  input.focus();
  btnSubmit.innerHTML = "Submit";
  newData.reset();
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

let todoData = JSON.parse(localStorage.getItem("todoData")) || [];
let isEdit;
let isEdited = false;
newData.addEventListener("submit", () => {
  let newTask = document.getElementById("newTask").value;
  let category = document.getElementById("category").value;
  let dateToday = document.getElementById("dateToday").value;

  let taskInfo = {
    task: newTask,
    level: category,
    date: dateToday,
    status: "pending",
  };

  if (!isEdited) {
    todoData.push(taskInfo);
  } else {
    isEdited = true;
    todoData[isEdit] = taskInfo;
  }
  saveToLocalStorage();
  newData.reset();
  showData();
});

function showData() {
  let todosHTML = "";
  let donesHTML = "";
  let overduesHTML = "";

  if (todoData) {
    todoData.forEach((item, index) => {
      let isDone = item.status == "completed" ? "checked" : "";
      let overdue = isOverdue(item);
      let innerTodo = `
            <div class="todo ${overdue ? "overdue" : ""}" data-index="${index}">
              <div class="checkbox">
                <input type="checkbox" onclick="update(${index}, this)" data-index="${index}" class="todo-checkbox" ${isDone}/>
              </div>
              <div class="todo-map">
                <p class="content ${isDone}">${item.task}</p>
                <span class="dateline">Dateline: ${item.date}</span>
                <span class="priority">Category: 
                <span class="level-text" data-level="${item.level}">${item.level}</span>
                </span>
              </div>
              <div class="action">
                <div class="edit-btn" onclick="editTask(${index}, '${item.task}', '${item.date}', '${item.level}')">
                  <img src="icon/edit.png" alt="edit-icon" />
                </div>
                <div class="del-btn" onclick="deleteTask(${index})">
                  <img src="icon/trash.png" alt="trash-icon" />
                </div>
              </div>
            </div>
          
      `;
      if (item.status == "completed") {
        donesHTML = innerTodo + donesHTML;
      } else if (overdue) {
        overduesHTML = innerTodo + overduesHTML;
      } else {
        todosHTML = innerTodo + todosHTML;
      }
    });
    todos.innerHTML = todosHTML;
    dones.innerHTML = donesHTML;
    overdues.innerHTML = overduesHTML;
  }
  updateCounter();
}
showData();

function updateCounter() {
  let todoCount = 0;
  let doneCount = 0;
  let overdueCount = 0;

  todoData.forEach((item) => {
    const completed = item.status === "completed";
    const overdue = isOverdue(item);

    if (completed) {
      doneCount++;
    } else if (overdue) {
      overdueCount++;
    } else {
      todoCount++;
    }
  });

  document.getElementById("count-todo").textContent = todoCount + " ";
  document.getElementById("count-done").textContent = doneCount + " ";
  document.getElementById("count-overdue").textContent = overdueCount + " ";
}

function editTask(editId, editTask, editDate, editLevel) {
  console.log(editId, editTask, editDate, editLevel);
  modal.classList.add("active");
  isEdit = editId;
  isEdited = true;
  newTask.value = editTask;
  category.value = editLevel;
  dateToday.value = editDate;
  btnSubmit.innerHTML = "Update";
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  saveToLocalStorage();
}

function deleteTask(deleteId) {
  todoData.splice(deleteId, 1);
  console.log(deleteId);
  saveToLocalStorage();
  showData();
}

function update(index, check) {
  const checkTask = document.querySelectorAll(".content")[index];
  if (check.checked) {
    checkTask.classList.add("checked");
    todoData[index].status = "completed";
  } else {
    checkTask.classList.remove("checked");
    todoData[index].status = "pending";
  }
  console.log(check);
  saveToLocalStorage();
  showData();
}

function isOverdue(item) {
  const today = new Date().setHours(0, 0, 0, 0);
  const taskDate = new Date(item.date).setHours(0, 0, 0, 0);

  return item.status !== "completed" && taskDate < today;
}

document.addEventListener("click", function (e) {
  const btnDel = e.target.closest(".delete-all");
  if (!btnDel) return;

  const tabName = btnDel.dataset.tab; // "todo" or "done"
  if (tabName === "todo") {
    // delete all pending
    todoData = todoData.filter((item) => item.status !== "pending");
  }
  if (tabName === "done") {
    // delete all completed
    todoData = todoData.filter((item) => item.status !== "completed");
  }
  if (tabName === "overdue") {
    // delete all completed
    todoData = todoData.filter((item) => !isOverdue(item));
  }
  saveToLocalStorage();
  showData();
});

function saveToLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}
