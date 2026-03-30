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

/* CALENDAR */
calendarBtn.addEventListener("click", () => {
  if (deadlineInput.showPicker) {
    deadlineInput.showPicker();
  } else {
    deadlineInput.focus();
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

    if (task.completed) {
      text.innerHTML = `
        <strong style="text-decoration: line-through; opacity: 0.6;">
          ${task.text}
        </strong><br>
        ${formatDate(task.date)}
      `;
    } else {
      text.innerHTML = `
        <strong>${task.text}</strong><br>
        ${formatDate(task.date)}
      `;
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    /* ✅ DONE BUTTON (MODERN CHECK ICON) */
    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.setAttribute("data-tooltip", "Done");
    doneBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    `;
    doneBtn.onclick = () => {
      tasks = tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      renderTasks(filter);
    };

    /* ✏ EDIT BUTTON (MODERN PENCIL ICON) */
    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.setAttribute("data-tooltip", "Edit");
    editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    `;
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks = tasks.map(t =>
          t.id === task.id ? { ...t, text: newText } : t
        );
        renderTasks(filter);
      }
    };

    /* 🗑 DELETE BUTTON (MODERN DUSTBIN ICON) */
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.setAttribute("data-tooltip", "Delete");
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M3 6h18M9 6V4h6v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/>
      </svg>
    `;
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