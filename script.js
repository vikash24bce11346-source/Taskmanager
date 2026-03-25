// Select elements
const addTaskBtn = document.getElementById("addTaskBtn");
const todoColumn = document.getElementById("todo");

let draggedTask = null;

// Add task button
addTaskBtn.addEventListener("click", () => {
    const taskText = prompt("Enter your task:");
    if (!taskText || taskText.trim() === "") return;

    const task = createTask(taskText);
    todoColumn.appendChild(task);

    saveData();
});

// Create task
function createTask(text) {
    const task = document.createElement("div");
    task.className = "task";
    task.innerText = text;

    task.draggable = true;

    // Drag start
    task.addEventListener("dragstart", () => {
        draggedTask = task;
        setTimeout(() => task.style.display = "none", 0);
    });

    // Drag end
    task.addEventListener("dragend", () => {
        draggedTask = null;
        task.style.display = "block";
        saveData();
    });

    return task;
}

// Drag over (IMPORTANT)
document.addEventListener("dragover", (e) => {
    e.preventDefault();
});

// Highlight column
document.addEventListener("dragenter", (e) => {
    const column = e.target.closest(".column");
    if (column) column.classList.add("drag-over");
});

document.addEventListener("dragleave", (e) => {
    const column = e.target.closest(".column");
    if (column) column.classList.remove("drag-over");
});

// Drop
document.addEventListener("drop", (e) => {
    const column = e.target.closest(".column");

    if (column && draggedTask) {
        column.appendChild(draggedTask);
        column.classList.remove("drag-over");

        saveData();
    }
});

// Save data
function saveData() {
    const columns = document.querySelectorAll(".column");
    const data = [];

    columns.forEach(col => {
        const tasks = [...col.querySelectorAll(".task")]
            .map(task => task.innerText);
        data.push(tasks);
    });

    localStorage.setItem("taskData", JSON.stringify(data));
}

// Load data
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

// Load on start
loadData();
