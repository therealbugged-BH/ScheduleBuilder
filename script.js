const addTaskButton = document.getElementById("addTaskButton");
const input = document.getElementById("taskInput");
const displayArea = document.getElementById("displayArea");
const rightBox = document.querySelector(".right-box");

const taskArray = [];

// Add Task
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

// Display in Middle Column
function updateMiddleDisplay() {
  displayArea.innerText = taskArray
    .map((item, index) => `${index + 1}. ${item.task} (${item.minutes} mins)`)
    .join("\n");
}

// Display Sorted in Right Column
function updateScheduleDisplay() {
  const sorted = [...taskArray].sort((a, b) => a.minutes - b.minutes);
  let currentTime = new Date();
  currentTime.setHours(7, 0, 0, 0); // Start at 7:00 AM

  let scheduleHTML = "<h3>Task Schedule</h3>";

  for (let i = 0; i < sorted.length; i++) {
    const task = sorted[i];
    const taskStart = formatTime(currentTime);
    currentTime.setMinutes(currentTime.getMinutes() + task.minutes);
    const taskEnd = formatTime(currentTime);

    scheduleHTML += `<div><strong>${task.task}</strong> - ${taskStart} to ${taskEnd} (${task.minutes} mins)</div>`;

    // Add 20% rest time
    const restTime = Math.ceil(task.minutes * 0.2);
    if (i < sorted.length - 1) {
      const restStart = formatTime(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + restTime);
      const restEnd = formatTime(currentTime);
      scheduleHTML += `<div style="color: gray;">Rest - ${restStart} to ${restEnd} (${restTime} mins)</div>`;
    }
  }

  rightBox.innerHTML = scheduleHTML;
}

// Format time as h:mm AM/PM
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

addTaskButton.addEventListener("click", handleAddTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddTask();
});
