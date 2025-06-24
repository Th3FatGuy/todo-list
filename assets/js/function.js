// const STORAGE_KEY = "taskList";

// let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let taskList = [];
let taskListSearch = [];
let url = mockapi.baseURL; 

const taskTableBody = document.querySelector(".taskTable__body");

// Add event listener to the add button
document.getElementsByClassName("table__btn__addTask")[0].addEventListener("click", () => {
  const name = prompt("Enter task name:");
  newTask = {
    name: name,
    status: "todo"
  }
  if (!name) {
    alert("Task name cannot be empty.");
    return;
  } else if (name in taskList.map(task => task.name)) {
    alert("Task name already exists.");
    return;
  } else{
    fetch(url, {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(newTask)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
    }).then(task => {
      taskList.push(task);
      renderTasks(taskList);
    }).catch(error => {
      console.log("Error adding task:", error);
    })
  }
});

function renderTasks(taskListToRender) {
  taskTableBody.innerHTML = "";
  taskListToRender.forEach(task => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td class="taskTable__body__id">${task.id}</td> 
      <td class="taskTable__body__name">${task.name}</td>
      <td class="taskTable__body__status">
        <select onchange="updateStatus(${task.id}, this.value)">
          <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
          <option value="inprocess" ${task.status === 'inprocess' ? 'selected' : ''}>In Process</option>
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
    taskListSearch = tasks;
    renderTasks(taskListSearch);
  }).catch(error => {
    console.log("Error fetching tasks:", error);
  })    
});


function updateStatus(id, newStatus) {
  let editURL = `${url}/${id}`;
  fetch(editURL, {
    method: 'PUT',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({status: newStatus})
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
  }).catch(error => {
    console.log("Error updating task status:", error);
  })
}

function editTask(index) {
  let taskNameToEdit = taskList[index].name;
  const newName = prompt("Enter new task name:", taskNameToEdit);
  let editURL = `${url}/${index}`;

  fetch(editURL, {
    method: 'PUT',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({name: newName})
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
  }).then(updatedTask => {
    taskList = taskList.map(task => task.id === updatedTask.id ? updatedTask :task);
    renderTasks(taskList);
  }).catch(error => {
    console.log("Error updating task status:", error);
  })
}

function removeTask(index) {
  let deleteURL = `${url}/${index}`;
  fetch(deleteURL, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
  }).then(task => {
    taskList = taskList.filter(t => t.id !== task.id);
    renderTasks(taskList);
  }).catch(error => {
    console.log("Error deleting task:", error);
  })
}

function clearSearch() {
  document.querySelector(".table__search__input").value = "";
  renderTasks(taskList);
}

window.onload = fetch(url, {
    method: 'GET',
    headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(tasks => {
      taskList = tasks;
      renderTasks(taskList);
  });