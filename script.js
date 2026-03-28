let selectedDate = "";

/* CALENDAR FIX */
function openDate() {
    const input = document.getElementById("dateInput");
    input.style.display = "block";
    input.focus();
    input.click();

    setTimeout(() => {
        input.style.display = "none";
    }, 200);
}

document.getElementById("dateInput").addEventListener("change", function () {
    selectedDate = this.value;
});

/* ADD TASK */
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    let priority = document.getElementById("priority").value;

    if (text === "") return;

    let li = document.createElement("li");
    li.className = priority;

    let today = new Date().toISOString().split("T")[0];

    let dateText = "";
    if (selectedDate) {
        let d = new Date(selectedDate);
        let day = d.toLocaleDateString("en-US", { weekday: "short" });
        dateText = `<br><small>${d.toDateString()} (${day})</small>`;

        if (selectedDate < today) {
            li.classList.add("overdue");
        }
    }

    let span = document.createElement("span");
    span.innerHTML = text + dateText;

    /* BUTTONS */
    let done = document.createElement("button");
    done.innerText = "✔";
    done.className = "done-btn";
    done.onclick = () => span.classList.toggle("completed");

    let edit = document.createElement("button");
    edit.innerText = "✏";
    edit.className = "edit-btn";
    edit.onclick = () => {
        let newText = prompt("Edit task:", text);
        if (newText) span.innerHTML = newText;
    };

    let del = document.createElement("button");
    del.innerText = "🗑";
    del.className = "delete-btn";
    del.onclick = () => li.remove();

    let actions = document.createElement("div");
    actions.className = "task-actions";

    actions.append(done, edit, del);

    li.append(span, actions);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
    selectedDate = "";

    updateCount();
}

/* COUNT */
function updateCount() {
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText = "Total Tasks: " + count;
}

/* FILTER */
function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let done = task.querySelector("span").classList.contains("completed");

        if (type === "all") task.style.display = "flex";
        else if (type === "completed") task.style.display = done ? "flex" : "none";
        else task.style.display = !done ? "flex" : "none";
    });
}

/* CLEAR */
function clearAllTasks() {
    if (confirm("Delete all tasks?")) {
        document.getElementById("taskList").innerHTML = "";
        updateCount();
    }
}

/* DARK MODE FIX */
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("modeBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀️ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}