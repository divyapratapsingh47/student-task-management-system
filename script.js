const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed, task.priority));
    updateTaskCount();
};

function addTask() {
    let taskText = taskInput.value.trim();
    let priority = document.getElementById("priority").value;

    if (taskText === "") return;

    createTaskElement(taskText, false, priority);
    saveTask(taskText, false, priority);

    taskInput.value = "";
}

function createTaskElement(text, completed, priority) {
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="${completed ? "completed" : ""} ${priority}">${text}</span>
        <div>
            <button onclick="toggleTask(this)">✔</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    updateTaskCount();
}

function toggleTask(button) {
    let span = button.parentElement.previousElementSibling;
    span.classList.toggle("completed");
    updateStorage();
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    updateTaskCount();
    updateStorage();
}

function saveTask(text, completed, priority) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        let span = li.querySelector("span");

        tasks.push({
            text: span.innerText,
            completed: span.classList.contains("completed"),
            priority: span.classList.contains("high")
                ? "high"
                : span.classList.contains("medium")
                ? "medium"
                : "low"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText = "Total Tasks: " + count;
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let isCompleted = task.querySelector("span").classList.contains("completed");

        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "completed") {
            task.style.display = isCompleted ? "flex" : "none";
        } else {
            task.style.display = !isCompleted ? "flex" : "none";
        }
    });
}

function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
        updateTaskCount();
    }
}