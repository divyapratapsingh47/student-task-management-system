const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");

window.onload = loadTasks;

function addTask() {
    let text = taskInput.value.trim();
    let priority = prioritySelect.value;

    if (text === "") return;

    createTask(text, false, priority);
    saveTask(text, false, priority);

    taskInput.value = "";
}

function createTask(text, completed, priority) {
    let li = document.createElement("li");
    li.classList.add(priority);

    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">${text}</span>
        <div>
            <button onclick="toggleTask(this)">✔</button>
            <button onclick="editTask(this)">✏</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    updateCount();
}

function toggleTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    span.classList.toggle("completed");
    updateStorage();
}

function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    updateStorage();
    updateCount();
}

function editTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    let newText = prompt("Edit task:", span.innerText);
    if (newText) span.innerText = newText;
    updateStorage();
}

function updateCount() {
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText = "Total Tasks: " + count;
}

function saveTask(text, completed, priority) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTask(t.text, t.completed, t.priority));
}

function updateStorage() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").innerText;
        let completed = li.querySelector("span").classList.contains("completed");
        let priority = li.classList[0];

        tasks.push({ text, completed, priority });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(type) {
    document.querySelectorAll("#taskList li").forEach(li => {
        let completed = li.querySelector("span").classList.contains("completed");

        if (type === "all") li.style.display = "flex";
        else if (type === "completed") li.style.display = completed ? "flex" : "none";
        else li.style.display = !completed ? "flex" : "none";
    });
}

function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
        updateCount();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}