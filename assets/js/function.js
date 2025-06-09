let tasks = [];

taskTableBody = document.querySelector(".taskTable__body");

document.getElementsByClassName("table__btn__addTask")[0].addEventListener("click", () => {
  const name = prompt("Enter task name:");
  if (!name) return;

  tasks.push(name);
  renderTasks();
});

function renderTasks(){
  taskTableBody.innerHTML = "";

    tasks.forEach((task, index) => {
      const row = document.createElement("tr");
      id = index+1;
      row.innerHTML = `
        <td class="taskTable__body__id">${id}</td>
        <td class="taskTable__body__name">${task}</td>
        <td class="taskTable__body__status">
          <select name="StatusDropdown" id="statusDropdown">
            <option class="taskTable__body__status--todo" value="toDo">To Do</option>
            <option class="taskTable__body__status--inprocess" value="inProcess">In Process</option>
            <option class="taskTable__body__status--completed" value="completed">Completed</option>
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

function editTask(index){
  let newVal = prompt("Enter the renamed task:");
  if (!newVal) return;
  else{
    tasks[index] = newVal;
    renderTasks();
  } 
}

function removeTask(index){
  delete tasks[index];
  renderTasks();
}