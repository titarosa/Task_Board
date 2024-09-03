// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
    const card = $(`
        <div class="card mb-3" data-id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small class="text-muted">Due: ${task.deadline}</small></p>
                <button class="btn btn-danger delete-btn">Delete</button>
            </div>
        </div>
    `);

    const deadlineDate = dayjs(task.deadline);
    const now = dayjs();

    // Color code based on deadline
    if (now.isAfter(deadlineDate)) {
        card.addClass("border-danger");
    } else if (now.add(3, 'day').isAfter(deadlineDate)) {
        card.addClass("border-warning");
    } else {
        card.addClass("border-light");
    }

    // Attach delete event
    card.find('.delete-btn').on('click', handleDeleteTask);

    return card;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    // Clear all lanes before re-rendering
    $("#todo-cards, #in-progress-cards, #done-cards").empty();

    // Loop through tasks and append them to the correct lane
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
    });

    // Reapply draggable to all task cards
    makeTasksDraggable();
}

// Function to make tasks draggable
function makeTasksDraggable() {
    $(".card").draggable({
        revert: "invalid", // Task card returns to original position if not dropped in a valid lane
        helper: "clone", // Clones the task card while dragging
        start: function(event, ui) {
            $(this).css("opacity", 0.5);
        },
        stop: function(event, ui) {
            $(this).css("opacity", 1);
        }
    });
}

// Function to make lanes droppable
function makeLanesDroppable() {
    $(".lane").droppable({
        accept: ".card", // Accept only elements with class 'card'
        drop: handleDrop
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = $("#taskTitle").val().trim();
    const description = $("#taskDescription").val().trim();
    const deadline = $("#taskDeadline").val().trim();

    if (title && description && deadline) {
        const newTask = {
            id: generateTaskId(),
            title: title,
            description: description,
            deadline: deadline,
            status: "todo" // Default status
        };

        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("nextId", JSON.stringify(nextId));

        renderTaskList();
        $("#formModal").modal('hide'); // Close modal
        $("#taskForm")[0].reset(); // Reset form fields
    }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).closest('.card').data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle drop event when a task card is dropped in a lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(this).attr("id").replace("-cards", "");

    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}

$(document).ready(function () {
    renderTaskList();
    makeLanesDroppable();
    $("#taskForm").on("submit", handleAddTask);
});

