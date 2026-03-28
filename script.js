const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
    updateTaskCount();
};

function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText, false);
    saveTask(taskText, false);

    taskInput.value = "";
}

// Create task element
function createTaskElement(text, completed) {
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">${text}</span>
        <div>
            <button onclick="toggleTask(this)">✔</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    updateTaskCount();
}

// Toggle complete
function toggleTask(button) {
    let span = button.parentElement.previousElementSibling;
    span.classList.toggle("completed");
    updateStorage();
}

// Delete task
function deleteTask(button) {
    button.parentElement.parentElement.remove();
    updateTaskCount();
    updateStorage();
}

// Save task to local storage
function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update storage after changes
function updateStorage() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").innerText;
        let completed = li.querySelector("span").classList.contains("completed");

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Enter key support
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
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
        } else if (type === "pending") {
            task.style.display = !isCompleted ? "flex" : "none";
        }
    });
}
function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        localStorage.removeItem("tasks");
        document.getElementById("taskList").innerHTML = "";
        updateTaskCount();
    }
}