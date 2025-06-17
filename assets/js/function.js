// const STORAGE_KEY = "taskList";

// let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let taskList = [];
let url = mockapi.baseURL; 

getTasks = fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
}).then(tasks => {
  taskList = tasks;
  renderTasks();
});

const taskTableBody = document.querySelector(".taskTable__body");

// // Add event listener to the add button
// document.getElementsByClassName("table__btn__addTask")[0].addEventListener("click", () => {
//   const name = prompt("Enter task name:");
//   if (!name) return;
  
//   tasks.push({
//     "name": name,
//     "status": "toDo"
//   });

//   saveTasks();
//   renderTasks();
// });

function renderTasks() {
  taskTableBody.innerHTML = "";
  console.log(taskList);
  taskList.forEach((task) => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td class="taskTable__body__id">${task.id}</td> 
      <td class="taskTable__body__name">${task.name}</td>
      <td class="taskTable__body__status">
        <select onchange="updateStatus(${task.id}, this.value)">
          <option value="toDo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
          <option value="inProcess" ${task.status === 'inprocess' ? 'selected' : ''}>In Process</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td class="taskTable__body__edit">
        <button class="taskTable__body__edit__editBtn" onclick="editTask(${task.id})"><i class="ti-pencil"></i></button>
      </td>
      <td class="taskTable__body__delete">
        <button class="taskTable__body__delete__deleteBtn" onclick="removeTask(${task.id})"><i class="ti-trash"></i></button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

document.getElementsByClassName("table__search__btn")[0].addEventListener("click", () => {
  const keyword = document.querySelector(".table__search__input").value.trim().toLowerCase();
  const search_url = `${url}?name=${keyword}`;
  fetch(search_url, {
    method: 'GET',
    headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
  }).then(tasks => {
    taskList = tasks;
    renderTasks();
  }).catch(error => {
    console.log("Error fetching tasks:", error);
  })    
});


// function updateStatus(id, newStatus) {
//   taskList[index].status = newStatus;
//   saveTasks();
// }

// function editTask(index) {
//   const taskNames = Object.keys(tasks);
//   const taskNameToEdit = taskNames[index];
//   const newName = prompt("Enter new task name:", taskNameToEdit);

//   if (newName) {
//     tasks[index].name = newName;
//     saveTasks();
//     renderTasks();
//   }
// }

// function removeTask(index) {
//   tasks.pop(index);
//   saveTasks();
//   renderTasks();
// }

function saveTasks() {
  
}

// function searchTask(value){
//   // filter tasks based on the search value
//   const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()));
//   // render the filtered tasks
//   renderNewTasks(filteredTasks);
// }

// function clearSearch() {
//   document.querySelector(".table__search__input").value = "";
//   renderTasks();
// }

window.onload = renderTasks;
