const addTaskButton = document.getElementById("addTaskButton");
const input = document.getElementById("taskInput");
const displayArea = document.getElementById("displayArea");
const rightBox = document.querySelector(".right-box");

let taskArray = [];

// Add a task
function handleAddTask() {
  const inputValue = input.value.trim();
  const parts = inputValue.split(",");

  if (parts.length === 2) {
    const task = parts[0].trim();
    const minutes = parseFloat(parts[1]);

    if (!isNaN(minutes)) {
      taskArray.push({ task, minutes });
      updateMiddleDisplay();
      updateScheduleDisplay();
    } else {
      alert("Please enter a valid number after the comma.");
    }
  } else {
    alert("Please enter in the format: task, minutes");
  }

  input.value = "";
}

// Display tasks as draggable list
function updateMiddleDisplay() {
  displayArea.innerHTML = "";

  taskArray.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.task} (${item.minutes} mins)`;
    li.setAttribute("draggable", "true");
    li.dataset.index = index;

    // Drag events
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    li.addEventListener("dragend", handleDragEnd);

    displayArea.appendChild(li);
  });
  updateScheduleDisplay();
}

let draggedIndex = null;

function handleDragStart(e) {
  draggedIndex = parseInt(e.target.dataset.index);
  e.target.classList.add("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const targetIndex = parseInt(e.target.dataset.index);

  if (draggedIndex !== null && draggedIndex !== targetIndex) {
    const draggedItem = taskArray[draggedIndex];
    taskArray.splice(draggedIndex, 1);
    taskArray.splice(targetIndex, 0, draggedItem);
    updateMiddleDisplay();
  }
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  draggedIndex = null;
}

// Display scheduled tasks in the right box (based on current order)
function updateScheduleDisplay() {
  const ordered = [...taskArray]; // use current order
  let currentTime = new Date();
  currentTime.setHours(7, 0, 0, 0);

  let scheduleHTML = "<h3>Task Schedule</h3>";

  for (let i = 0; i < ordered.length; i++) {
    const task = ordered[i];
    const taskStart = formatTime(currentTime);
    currentTime.setMinutes(currentTime.getMinutes() + task.minutes);
    const taskEnd = formatTime(currentTime);

    scheduleHTML += `<div><strong>${task.task}</strong> - ${taskStart} to ${taskEnd} (${task.minutes} mins)</div>`;

    if (i < ordered.length - 1) {
      const restTime = Math.ceil(task.minutes * 0.2);
      const restStart = formatTime(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + restTime);
      const restEnd = formatTime(currentTime);
      scheduleHTML += `<div style="color: gray;">Rest - ${restStart} to ${restEnd} (${restTime} mins)</div>`;
    }
  }

  rightBox.innerHTML = scheduleHTML;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

// Events
addTaskButton.addEventListener("click", handleAddTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddTask();
});
