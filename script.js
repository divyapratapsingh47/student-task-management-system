const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");
const deadlineInput = document.getElementById("deadline");
const calendarBtn = document.getElementById("calendarBtn");

let tasks = [];

/* 🌙 DARK MODE */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    const btn = document.getElementById("modeToggle");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

/* 📅 CALENDAR FIX (POSITIONED CORRECTLY) */
calendarBtn.addEventListener("click", (e) => {
    const rect = calendarBtn.getBoundingClientRect();

    deadlineInput.style.left = rect.left + "px";
    deadlineInput.style.top = rect.bottom + "px";

    deadlineInput.showPicker();
});

/* ADD TASK */
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        text,
        priority: priority.value,
        deadline: deadlineInput.value,
        completed: false
    });

    renderTasks();

    taskInput.value = "";
    deadlineInput.value = "";
}

/* RENDER */
function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filtered = tasks.filter(t => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.priority;

        const date = task.deadline
            ? `<small>${new Date(task.deadline).toDateString()}</small>`
            : "";

        li.innerHTML = `
            <div>
                ${task.text}<br>${date}
            </div>

            <div class="actions">
                <button class="done" onclick="toggleComplete(${index})">✔</button>
                <button class="edit" onclick="editTask(${index})"><span>✏</span></button>
                <button class="delete" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    count.innerText = tasks.length;
}

/* DONE FIX */
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}

function clearAll() {
    tasks = [];
    renderTasks();
}