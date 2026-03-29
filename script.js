const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const deadlineInput = document.getElementById("deadline");

function addTask() {
    const text = taskInput.value.trim();
    const priority = document.getElementById("priority").value;
    const deadline = deadlineInput.value;

    if (text === "") {
        alert("Enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add(priority);

    let dateText = "";
    if (deadline) {
        const date = new Date(deadline);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        dateText = `<br><small>${deadline} (${day})</small>`;
    }

    li.innerHTML = `
        <span>${text}${dateText}</span>
        <div class="actions">
            <button onclick="toggleComplete(this)">✔</button>
            <button onclick="editTask(this)">✏</button>
            <button onclick="deleteTask(this)">🗑</button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
    deadlineInput.value = "";
    updateCount();
}

function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    updateCount();
}

function toggleComplete(btn) {
    btn.parentElement.parentElement.classList.toggle("completed");
}

function editTask(btn) {
    const span = btn.parentElement.parentElement.querySelector("span");
    const newText = prompt("Edit task:", span.innerText);
    if (newText !== null) {
        span.innerHTML = newText;
    }
}

function updateCount() {
    const count = document.querySelectorAll("#taskList li").length;
    taskCount.innerText = "Total Tasks: " + count;
}

function clearAllTasks() {
    taskList.innerHTML = "";
    updateCount();
}

function filterTasks(type) {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        } else {
            task.style.display = !task.classList.contains("completed") ? "flex" : "none";
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function openCalendar() {
    deadlineInput.click();
}

/* ENTER KEY SUPPORT */
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});