// Select elements
const addTaskBtn = document.getElementById("addTaskBtn");
const todoColumn = document.getElementById("todo");

// Event: Click button
addTaskBtn.addEventListener("click", () => {
    const taskText = prompt("Enter your task:");

    if (taskText === null || taskText.trim() === "") {
        return; // ignore empty input
    }

    const task = createTask(taskText);
    todoColumn.appendChild(task);
});

// Function to create task
function createTask(text) {
    const task = document.createElement("div");
    task.className = "task";
    task.innerText = text;

    return task;
}
document.addEventListener("dragenter", (e) => {
    const column = e.target.closest(".column");
    if (column) column.classList.add("drag-over");
});

document.addEventListener("dragleave", (e) => {
    const column = e.target.closest(".column");
    if (column) column.classList.remove("drag-over");
});

document.addEventListener("drop", (e) => {
    const column = e.target.closest(".column");
    if (column && draggedTask) {
        column.appendChild(draggedTask);
        column.classList.remove("drag-over");
    }
});
function saveData() {
    const columns = document.querySelectorAll(".column");

    const data = [];

    columns.forEach(col => {
        const tasks = [...col.querySelectorAll(".task")].map(task => task.innerText);
        data.push(tasks);
    });

    localStorage.setItem("taskData", JSON.stringify(data));
}
function loadData() {
    const data = JSON.parse(localStorage.getItem("taskData"));

    if (!data) return;

    const columns = document.querySelectorAll(".column");

    data.forEach((tasks, index) => {
        tasks.forEach(taskText => {
            const task = createTask(taskText);
            columns[index].appendChild(task);
        });
    });
}

// Call this when page loads
loadData();
addTaskBtn.addEventListener("click", () => {
    const taskText = prompt("Enter your task:");

    if (!taskText || taskText.trim() === "") return;

    const task = createTask(taskText);
    todoColumn.appendChild(task);

    saveData(); // ✅ add this
});
document.addEventListener("drop", (e) => {
    const column = e.target.closest(".column");
    if (column && draggedTask) {
        column.appendChild(draggedTask);
        column.classList.remove("drag-over");

        saveData(); // ✅ IMPORTANT
    }
});