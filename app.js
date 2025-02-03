// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskPriorityInput = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

// Array to hold tasks
let tasks = [];

// Event listener for adding a new task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the task input values
    const taskName = taskNameInput.value;
    const taskPriority = taskPriorityInput.value;
    const taskDueDate = taskDueDateInput.value;

    // Create a new task object
    const newTask = {
        id: Date.now(),
        name: taskName,
        priority: taskPriority,
        dueDate: taskDueDate,
        completed: false
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Update the UI
    displayTasks();

    // Clear the form inputs
    taskNameInput.value = '';
    taskPriorityInput.value = '';
    taskDueDateInput.value = '';
});

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.name} - ${task.priority} - ${task.dueDate}
            </span>
            <div>
                <button class="btn btn-success btn-sm" onclick="markCompleted(${task.id})">Completed</button>
                <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Mark task as completed
function markCompleted(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;  // Toggle completion status
    displayTasks();  // Update UI
}

// Edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    taskNameInput.value = task.name;
    taskPriorityInput.value = task.priority;
    taskDueDateInput.value = task.dueDate;

    // Delete the task after editing so it can be re-added with new values
    deleteTask(taskId);
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    displayTasks();  // Update UI
}

// Search & Filter tasks
function filterTasks() {
    const searchText = searchInput.value.toLowerCase();

    // Filter tasks based on name or priority
    const filteredTasks = tasks.filter(task => {
        return task.name.toLowerCase().includes(searchText) || task.priority.toLowerCase().includes(searchText);
    });

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.name} - ${task.priority} - ${task.dueDate}
            </span>
            <div>
                <button class="btn btn-success btn-sm" onclick="markCompleted(${task.id})">Completed</button>
                <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Initialize app by displaying tasks
displayTasks();
