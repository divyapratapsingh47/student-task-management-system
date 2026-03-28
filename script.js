const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");

function addTask() {
    let text = taskInput.value.trim();
    let priority = prioritySelect.value;

    if (text === "") return;

    createTask(text, false, priority);
    taskInput.value = "";
    updateTaskCount();
}

function createTask(text, completed, priority) {
    let li = document.createElement("li");
    li.className = priority;

    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">${text}</span>
        <div>
            <button onclick="toggleTask(this)" class="complete-btn">✔</button>
            <button onclick="editTask(this)" class="edit-btn"><span>✏</span></button>
            <button onclick="deleteTask(this)" class="delete-btn">🗑</button>
        </div>
    `;

    taskList.appendChild(li);
}

function toggleTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    span.classList.toggle("completed");
    updateTaskCount();
}

function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    updateTaskCount();
}

function editTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    let newText = prompt("Edit task:", span.innerText);

    if (newText) {
        span.innerText = newText;
    }
}

function updateTaskCount() {
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText = "Total Tasks: " + count;
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let isCompleted = task.querySelector("span").classList.contains("completed");

        if (type === "all") task.style.display = "flex";
        else if (type === "completed") task.style.display = isCompleted ? "flex" : "none";
        else if (type === "pending") task.style.display = !isCompleted ? "flex" : "none";
    });
}

function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        taskList.innerHTML = "";
        updateTaskCount();
    }
}

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}