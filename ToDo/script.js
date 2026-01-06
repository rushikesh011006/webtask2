const addBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please write something");
        return;
    }

    // Task container
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    // Left part (checkbox + text)
    const leftPart = document.createElement("div");
    leftPart.style.display = "flex";
    leftPart.style.alignItems = "center";
    leftPart.style.gap = "8px";

    // Checkbox (completed)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Task text
    const text = document.createElement("span");
    text.textContent = taskText;

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            text.classList.add("completed");
        } else {
            text.classList.remove("completed");
        }
        saveTasks();
    });

    leftPart.appendChild(checkbox);
    leftPart.appendChild(text);

    // Pin (priority)
    const pin = document.createElement("span");
    pin.textContent = "📌";
    pin.className = "pin";

    pin.addEventListener("click", () => {
        taskItem.classList.toggle("pinned");
        saveTasks();
    });

    // Delete
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    // Right side actions
    const rightPart = document.createElement("div");
    rightPart.appendChild(pin);
    rightPart.appendChild(deleteBtn);

    taskItem.appendChild(leftPart);
    taskItem.appendChild(rightPart);

    taskList.appendChild(taskItem);
    taskInput.value = "";
});
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    item.addEventListener("click", () => {

        // active highlight
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const filter = item.getAttribute("data-filter");
        const tasks = document.querySelectorAll(".task-item");

        tasks.forEach(task => {
            if (filter === "home") {
                task.style.display = "flex";
            }
            else if (filter === "completed") {
                task.style.display = task.querySelector(".completed")
                    ? "flex" : "none";
            }
            else if (filter === "pending") {
                task.style.display = task.querySelector(".completed")
                    ? "none" : "flex";
            }
            else if (filter === "priority") {
                task.style.display = task.classList.contains("pinned")
                    ? "flex" : "none";
            }
        });
    });
});
function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task-item").forEach(task => {
        const text = task.querySelector("span").textContent;
        const completed = task.querySelector("input[type='checkbox']").checked;
        const pinned = task.classList.contains("pinned");

        tasks.push({
            text: text,
            completed: completed,
            pinned: pinned
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) return;

    const tasks = JSON.parse(savedTasks);

    tasks.forEach(task => {

        // Task container
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        // Left part
        const leftPart = document.createElement("div");
        leftPart.style.display = "flex";
        leftPart.style.alignItems = "center";
        leftPart.style.gap = "8px";

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Text
        const text = document.createElement("span");
        text.textContent = task.text;

        if (task.completed) {
            text.classList.add("completed");
        }

        checkbox.addEventListener("change", () => {
            text.classList.toggle("completed");
            saveTasks();
        });

        leftPart.appendChild(checkbox);
        leftPart.appendChild(text);

        // Pin
        const pin = document.createElement("span");
        pin.textContent = "📌";
        pin.className = "pin";

        if (task.pinned) {
            taskItem.classList.add("pinned");
        }

        pin.addEventListener("click", () => {
            taskItem.classList.toggle("pinned");
            saveTasks();
        });

        // Delete
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "❌";
        deleteBtn.style.cursor = "pointer";

        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        // Right part
        const rightPart = document.createElement("div");
        rightPart.appendChild(pin);
        rightPart.appendChild(deleteBtn);

        taskItem.appendChild(leftPart);
        taskItem.appendChild(rightPart);
        taskList.appendChild(taskItem);
    });
}
loadTasks();

