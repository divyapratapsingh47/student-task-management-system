const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed, task.priority, task.dueDate);
    });

    updateTaskCount();
};

// Open calendar
function openCalendar() {
    const dateInput = document.getElementById("dueDate");

    if (dateInput.showPicker) {
        dateInput.showPicker();
    } else {
        dateInput.click();
    }
}

// Format date like 01-Aug-2025 (Fri)
function formatDate(dateStr) {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    return `${date.toLocaleDateString('en-GB', options)} (${dayName})`;
}

// Add task
function addTask() {
    let text = taskInput.value.trim();
    let priority = document.getElementById("priority").value;
    let dueDate = document.getElementById("dueDate").value;

    if (text === "") return;

    createTaskElement(text, false, priority, dueDate);
    saveTask(text, false, priority, dueDate);

    taskInput.value = "";
    document.getElementById("dueDate").value = "";
}

// Create task
function createTaskElement(text, completed, priority, dueDate) {
    let li = document.createElement("li");
    li.className = priority;

    if (isOverdue(dueDate)) {
        li.classList.add("overdue");
    }

    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">
            ${text}
            <div class="date-text">${formatDate(dueDate)}</div>
        </span>

        <div>
            <button class="complete-btn" title="Done" onclick="toggleTask(this)">✔</button>
            <button class="edit-btn" title="Edit" onclick="editTask(this)">✏</button>
            <button class="delete-btn" title="Delete" onclick="deleteTask(this)">🗑</button>
        </div>
    `;

    taskList.appendChild(li);
    updateTaskCount();
}

// Toggle
function toggleTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    span.classList.toggle("completed");
    updateStorage();
}

// Edit
function editTask(btn) {
    let span = btn.parentElement.previousElementSibling;
    let newText = prompt("Edit task:", span.innerText);

    if (newText) span.childNodes[0].nodeValue = newText;
    updateStorage();
}

// Delete
function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    updateTaskCount();
    updateStorage();
}

// Save
function saveTask(text, completed, priority, dueDate) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed, priority, dueDate });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update storage
function updateStorage() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").childNodes[0].nodeValue.trim();
        let completed = li.querySelector("span").classList.contains("completed");
        let priority = li.classList[0];

        tasks.push({ text, completed, priority });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Count
function updateTaskCount() {
    document.getElementById("taskCount").innerText =
        "Total Tasks: " + document.querySelectorAll("#taskList li").length;
}

// Filter
function filterTasks(type) {
    document.querySelectorAll("#taskList li").forEach(li => {
        let completed = li.querySelector("span").classList.contains("completed");

        if (type === "all") li.style.display = "flex";
        else if (type === "completed") li.style.display = completed ? "flex" : "none";
        else li.style.display = !completed ? "flex" : "none";
    });
}

// Clear all
function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
        updateTaskCount();
    }
}

// Dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let btn = document.querySelector(".dark-btn");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

// Overdue
function isOverdue(date) {
    if (!date) return false;

    let today = new Date().toISOString().split("T")[0];
    return date < today;
}