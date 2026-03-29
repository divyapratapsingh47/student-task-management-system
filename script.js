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
  deadlineInput.showPicker();
});

/* ADD TASK */
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    priority: priority.value,
    date: deadlineInput.value,
    completed: false
  });

  taskInput.value = "";
  deadlineInput.value = "";

  renderTasks();
});

/* RENDER */
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filter === "completed") {
    filtered = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.priority;

    const text = document.createElement("div");
    text.innerHTML = `
      <strong>${task.text}</strong><br>
      ${task.date ? new Date(task.date).toDateString() : ""}
    `;

    const actions = document.createElement("div");
    actions.className = "actions";

    /* DONE */
    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.innerHTML = "✔";
    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };

    /* EDIT */
    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "<span>✏</span>";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks[index].text = newText;
        renderTasks();
      }
    };

    /* DELETE */
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "🗑";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
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