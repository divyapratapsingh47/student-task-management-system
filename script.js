function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value;

    if (task === "") return;

    const li = document.createElement("li");
    li.textContent = task;

    // Delete button
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = function () {
        li.remove();
    };

    li.appendChild(btn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}