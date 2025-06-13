const STORAGE_KEY = "taskList";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

const taskTableBody = document.querySelector(".taskTable__body");

document.getElementsByClassName("table__btn__addTask")[0].addEventListener("click", () => {
  const name = prompt("Enter task name:");
  if (!name) return;

  tasks[name] = "toDo";
  saveTasks(); // Lưu vào localStorage
  renderTasks();
});

function renderTasks() {
  taskTableBody.innerHTML = "";

  const entries = Object.entries(tasks);

  entries.forEach(([taskName, status], index) => {
    const row = document.createElement("tr");
    const id = index + 1;

    row.innerHTML = `
      <td class="taskTable__body__id">${id}</td> 
      <td class="taskTable__body__name">${taskName}</td>
      <td class="taskTable__body__status">
        <select onchange="updateStatus(${index}, this.value)">
          <option value="toDo" ${status === 'toDo' ? 'selected' : ''}>To Do</option>
          <option value="inProcess" ${status === 'inProcess' ? 'selected' : ''}>In Process</option>
          <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
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
function updateStatus(index, newStatus) {
  const taskNames = Object.keys(tasks);
  const taskName = taskNames[index];
  tasks[taskName] = newStatus;
  saveTasks();
}

function editTask(index) {
  const taskNames = Object.keys(tasks);
  const oldName = taskNames[index];
  const newName = prompt("Enter the renamed task:", oldName);

  if (!newName || newName === oldName) return;

  const status = tasks[oldName];

  tasks[newName] = status;

  saveTasks();
  renderTasks();
}

function removeTask(index) {
  const taskNames = Object.keys(tasks);
  const taskNameToDelete = taskNames[index];

  delete tasks[taskNameToDelete];
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

window.onload = renderTasks;

function searchTaskt(){
   
}