let task = [
    { id: 24, name: "Buy Grocery", status: "Todo" }
];

document.getElementByID("askTaskBtn").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Vui lòng nhập tên công việc.");
    return;
  }

  const tableBody = document.getElementById("taskTableBody");

  // Tạo dòng mới
  const newRow = document.createElement("tr");
  newRow.classList.add("todo"); // Mặc định trạng thái là To Do

  // Cột tên
  const nameCell = document.createElement("td");
  nameCell.textContent = taskName;

  // Cột dropdown trạng thái
  const processCell = document.createElement("td");
  const select = document.createElement("select");
  select.innerHTML = `
    <option value="todo">To Do</option>
    <option value="inprocess">In Process</option>
    <option value="complete">Complete</option>
  `;

  // Bắt sự kiện đổi trạng thái
  select.addEventListener("change", function () {
    newRow.classList.remove("todo", "inprocess", "complete");
    newRow.classList.add(select.value);
  });

  processCell.appendChild(select);

  newRow.appendChild(nameCell);
  newRow.appendChild(processCell);

  tableBody.appendChild(newRow);

  taskInput.value = "";
});



function renderTasks(){
    
}

function addTask(){
}