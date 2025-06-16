const STORAGE_KEY = "taskList";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskTableBody = document.querySelector(".taskTable__body");

document.getElementsByClassName("table__btn__addTask")[0].addEventListener("click", () => {
  const name = prompt("Enter task name:");
  if (!name) return;
  
  tasks.push({
    "name": name,
    "status": "toDo"
  });

  saveTasks();
  renderTasks();
});

function renderTasks() {
  taskTableBody.innerHTML = "";
  
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    const id = index + 1;

    row.innerHTML = `
      <td class="taskTable__body__id">${id}</td> 
      <td class="taskTable__body__name">${task.name}</td>
      <td class="taskTable__body__status">
        <select onchange="updateStatus(${index}, this.value)">
          <option value="toDo" ${task.status === 'toDo' ? 'selected' : ''}>To Do</option>
          <option value="inProcess" ${task.status === 'inProcess' ? 'selected' : ''}>In Process</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td class="taskTable__body__edit">
        <button class="taskTable__body__edit__editBtn" onclick="editTask(${index})"><i class="ti-pencil"></i></button>
      </td>
      <td class="taskTable__body__delete">
        <button class="taskTable__body__delete__deleteBtn" onclick="removeTask(${index})"><i class="ti-trash"></i></button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

document.getElementsByClassName("table__search__btn")[0].addEventListener("click", () => {
  const keyword = document.querySelector(".table__search__input").value.trim().toLowerCase();
  taskTableBody.innerHTML = "";
  
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(keyword));

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");
    const id = index + 1;

    row.innerHTML = `
      <td class="taskTable__body__id">${id}</td> 
      <td class="taskTable__body__name">${task.name}</td>
      <td class="taskTable__body__status">
        <select onchange="updateStatus(${index}, this.value)">
          <option value="toDo" ${task.status === 'toDo' ? 'selected' : ''}>To Do</option>
          <option value="inProcess" ${task.status === 'inProcess' ? 'selected' : ''}>In Process</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td class="taskTable__body__edit">
        <button class="taskTable__body__edit__editBtn" onclick="editTask(${index})"><i class="ti-pencil"></i></button>
      </td>
      <td class="taskTable__body__delete">
        <button class="taskTable__body__delete__deleteBtn" onclick="removeTask(${index})"><i class="ti-trash"></i></button>
      </td>
    `;

    taskTableBody.appendChild(row);
    });
});

function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  saveTasks();
}

function editTask(index) {
  const taskNames = Object.keys(tasks);
  const taskNameToEdit = taskNames[index];
  const newName = prompt("Enter new task name:", taskNameToEdit);

  if (newName) {
    tasks[index].name = newName;
    saveTasks();
    renderTasks();
  }
}

function removeTask(index) {
  tasks.pop(index);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function searchTask(value){
  // filter tasks based on the search value
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()));
  // render the filtered tasks
  renderNewTasks(filteredTasks);
}

function clearSearch() {
  document.querySelector(".table__search__input").value = "";
  renderTasks();
}

window.onload = renderTasks;