let tasks = [];

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("modeBtn");

    // ⭐ CHANGE: icon switch
    if (document.body.classList.contains("dark")) {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
}

function openDate() {
    const input = document.getElementById("dateInput");

    if (input.showPicker) {
        input.showPicker();
    } else {
        input.focus();
        input.click();
    }
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("dateInput").value;

    if (text === "") return;

    tasks.push({ text, priority, date, completed: false });
    renderTasks();

    document.getElementById("taskInput").value = "";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");
        li.classList.add(task.priority);

        if (task.completed) li.classList.add("completed");

        let dateText = "";
        if (task.date) {
            let d = new Date(task.date);
            let day = d.toLocaleDateString('en-US', { weekday: 'short' });
            dateText = `<br><small>${task.date} (${day})</small>`;
        }

        li.innerHTML = `
            <span>${task.text}${dateText}</span>

            <div class="actions">

                <div class="tooltip">
                    <button class="icon-btn done" onclick="toggleTask(${index})">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <span class="tooltip-text">Done</span>
                </div>

                <div class="tooltip">
                    <button class="icon-btn edit" onclick="editTask(${index})">
                        <i class="fa-solid fa-pen pencil"></i>
                    </button>
                    <span class="tooltip-text">Edit</span>
                </div>

                <div class="tooltip">
                    <button class="icon-btn delete" onclick="deleteTask(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <span class="tooltip-text">Delete</span>
                </div>

            </div>
        `;

        list.appendChild(li);
    });

    updateCount();
}

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    renderTasks();
}

function editTask(i) {
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText) {
        tasks[i].text = newText;
        renderTasks();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    renderTasks();
}

function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
}

function filterTasks(type) {
    const items = document.querySelectorAll("#taskList li");

    items.forEach((item, index) => {
        let task = tasks[index];

        if (type === "all") {
            item.style.display = "flex";
        } else if (type === "completed") {
            item.style.display = task.completed ? "flex" : "none";
        } else {
            item.style.display = !task.completed ? "flex" : "none";
        }
    });
}

function updateCount() {
    document.getElementById("taskCount").innerText =
        "Total Tasks: " + tasks.length;
}