const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const priority = document.getElementById("priority");
const clearAll = document.getElementById("clearAll");
const themeToggle = document.getElementById("themeToggle");
const calendarBtn = document.getElementById("calendarBtn");
const deadlineInput = document.getElementById("deadline");

let tasks = [];

/* ✅ FINAL CALENDAR FIX */
calendarBtn.addEventListener("click", () => {
  if (deadlineInput.showPicker) {
    deadlineInput.showPicker(); // modern browsers
  } else {
    deadlineInput.focus(); // fallback
  }
});

/* ADD TASK */
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    priority: priority.value,
    date: deadlineInput.value,
    completed: false
  });

  taskInput.value = "";
  deadlineInput.value = "";

  renderTasks();
});

/* DATE FORMAT */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);

  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const date = d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${date} (${day})`;
}

/* RENDER */
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filter === "completed") {
    filtered = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = task.priority;

    const text = document.createElement("div");
    text.innerHTML = `<strong>${task.text}</strong><br>${formatDate(task.date)}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.innerHTML = "✔";
    doneBtn.setAttribute("data-tooltip", "Done");
    doneBtn.onclick = () => {
      tasks = tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      renderTasks(filter);
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "✏";
    editBtn.setAttribute("data-tooltip", "Edit");
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks = tasks.map(t =>
          t.id === task.id ? { ...t, text: newText } : t
        );
        renderTasks(filter);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "🗑";
    deleteBtn.setAttribute("data-tooltip", "Delete");
    deleteBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(filter);
    };

    actions.append(doneBtn, editBtn, deleteBtn);
    li.append(text, actions);
    taskList.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
}

/* FILTER */
function filterTasks(type) {
  renderTasks(type);
}

/* CLEAR */
clearAll.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

/* THEME */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeToggle.innerText = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});