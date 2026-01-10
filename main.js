const buttonCreate = document.querySelector(".btn-create");
const modal = document.querySelector(".create");
const closeButton = document.querySelector(".close");
const newData = document.querySelector("#newData");
const tableToday = document.querySelector("#tableToday");

// Tampilkan modal create
buttonCreate.addEventListener("click", () => {
  modal.classList.toggle("active");
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = new Date();
let day = today.getDate();
let month = months[today.getMonth()];
let thisDay = days[today.getDay()];
let year = today.getFullYear();
let thisToday = thisDay + "," + " " + day + " " + month + " " + year;
document.getElementById("date").innerHTML = thisToday;

// inisialisasi form
newData.addEventListener("submit", (e) => {
  e.preventDefault();
  let newTask = document.getElementById("newTask").value;
  console.log(newTask);
  let category = document.getElementById("category").value;
  let dateToday = document.getElementById("dateToday").value;
  // console.log(dateToday);
  // if (!dateToday.value) {
  //   dateToday.value = thisToday();
  // }
  // let myTask = document.querySelector(".task").value;
  // console.log(myTask);
  // let level = document.getElementsByName("level");
  // let valueLevel = "";
  // for (const radio of level) {
  //   if (radio.checked) {
  //     valueLevel = radio.value;
  //     break;
  //   }
  // }
  // console.log(valueLevel);

  const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
  tableData.push({
    newTask: newTask,
    category: category,
    dateToday: dateToday,
  });
  console.log(newTask);
  localStorage.setItem("tableData", JSON.stringify(tableData));

  window.location.href = "index.html";
  dataForm.reset();
});

// buat element baru
// let iniToday = document.querySelector(".ini-today");
// let listToday = document.querySelector(".list-today");
// let input = document.createElement("input");
// input.type = "checkbox";
// input.id = "today1";

// let div = document.createElement("div");
// div.className = "kolom";

// let buttonCheck = document.createElement("button");
// buttonCheck.className = "btnCheck";
// buttonCheck.width = 4;
// buttonCheck.height = 4;

// let linkList = document.createElement("a");
// linkList.href = "#";
// linkList.className = "list";
// let img = document.createElement("img");
// img.src = "icon/list-icon.png";
// img.alt = "icon-list";
// img.width = 3;
// img.height = 4;
// linkList.appendChild(img);

const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
const tbody = tableToday.getElementsByTagName("tbody")[0];
tableData.forEach((item) => {
  const newRow = tbody.insertRow(0);
  // console.log(newRow);
  let cellBtn = newRow.insertCell();
  let buttonCheck = document.createElement("button");
  buttonCheck.className = "btnCheck";
  buttonCheck.style.width = "10px";
  buttonCheck.style.height = "10px";
  buttonCheck.style.borderRadius = "5px";
  buttonCheck.style.border = "1px solid gray";
  buttonCheck.style.backgroundColor = "none";
  buttonCheck.style.cursor = "pointer";
  cellBtn.appendChild(buttonCheck);
  // console.log(buttonCheck);
  newRow.insertCell().textContent = item.newTask;
  // console.log(newTask);
  let cellList = newRow.insertCell();
  let linkList = document.createElement("a");
  linkList.href = "#";
  linkList.className = "list";
  let img = document.createElement("img");
  img.src = "icon/list-icon.png";
  img.alt = "icon-list";
  img.width = 20;
  img.height = 20;
  linkList.appendChild(img);
  cellList.appendChild(linkList);
  // console.log(linkList);
});

// tableData.forEach((item, index) => {
//   const newRow = tbody.insertRow(0);
//   console.log(newRow);
//   newRow.insertCell(0).textContent = item.buttonCheck;
//   console.log(buttonCheck);
//   newRow.insertCell(1).textContent = item.newTask;
//   console.log(newTask);
//   newRow.insertCell(2).textContent = item.linkList;
//   console.log(linkList);
// });

// let teksInput = "";
// let data = [myTask, valueLevel];

// for (let i = 0; i < data.length; i++) {
//   teksInput += data[i];
// }
// div.innerHTML = teksInput;

// const editButton = document.createElement("button");
// editButton.textContent = "Edit";
// editButton.target = "_blank";
// editButton.setAttribute("type", "button");
// editButton.setAttribute("id", "buttonEdit");
// const deleteButton = document.createElement("button");
// deleteButton.textContent = "Delete";

// let span = document.createElement("span");
// span.className = "tombol";
// span.appendChild(editButton);
// span.appendChild(deleteButton);

// iniToday.appendChild(listToday);

// const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
// var tbody = tableToday.getElementsByTagName("tbody")[0];
// tableData.forEach((item, index) => {
//   const newRow = tbody.insertRow(0);

//   // Buat elemen Checkbox
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.id = "myCheckbox";
//   checkbox.name = "ceklist";
//   // checkbox.value = "done";
//   // checkbox.style.rowSpan = "2";

//   // let selectedValue = document.querySelector(
//   //   'input[name="status"]:checked'
//   // ).value;
//   // console.log(selectedValue); // Akan menampilkan nilai radio yang terpilih

//   newRow.appendChild(checkbox);
//   newRow.insertCell(0).textContent = item.task;
//   newRow.insertCell(1).textContent = item.levels;
//   // Buat elemen Input Teks
//   // const inputTask = document.createElement("input");
//   // inputTask.type = "text";
//   // inputTask.id = "myInput";
//   // inputTask.classList = "input";
//   // inputTask.textContent = "task";
//   // inputTask.setAttribute("colspan", "2");
//   // inputTask.setAttribute("scope", "col");

//   // Buat elemen Span
//   // const spanLevel = document.createElement("span");
//   // spanLevel.id = "level";
//   // spanLevel.textContent = "";
//   // spanLevel.style.color = "blue";
//   // spanLevel.setAttribute("scope", "col");

//   // event listener (checkbox)
//   // checkbox.addEventListener("change", function () {
//   //   if (this.checked) {
//   //     checkbox.style.textDecoration = "line-through";
//   //     checkbox.style.color = "#888";
//   //   }
//   // });

//   // const actionsCell = newRow.insertCell(2);
//   const editButton = document.createElement("button");
//   editButton.textContent = "Edit";
//   editButton.target = "_blank";
//   editButton.setAttribute("type", "button");
//   editButton.setAttribute("id", "buttonEdit");
//   editButton.className = "btn btn-primary btn-sm me-2";
//   // editButton.addEventListener("click", (event) => {
//   //   event.preventDefault();
//   //   const row = editButton.closest("tr");

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.className = "btn btn-danger btn-sm";
//   deleteButton.addEventListener("click", () => {
//     // Aksi hapus
//     tableData.splice(index, 1);
//     localStorage.setItem("tableData", JSON.stringify(tableData));
//     newRow.remove();
//   });

//   // newRow.appendChild(inputTask);
//   // newRow.appendChild(spanLevel);
//   newRow.appendChild(editButton);
//   newRow.appendChild(deleteButton);
// });
