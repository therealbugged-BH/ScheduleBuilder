// This is how you get the dom element of this <button id="clicker">Update Counter</button>
const clicker = document.getElementById("clicker");
// It returns an array so access the first instance of it with [0]
const counter = document.getElementsByClassName("counter")[0];
//for input
const input = document.getElementById('taskInput')


//arrays to store the tasks
const taskDescriptions = [];
const taskValues = [];
const taskArray = [];

// Add click event
function handleAddTask() {
  const inputValue = input.value.trim(); // Get and clean input
  // Split by comma
  const parts = inputValue.split(',');


  if (parts.length === 2) {
    const task = parts[0].trim();      // e.g. "doing chemistry homework"
    const value = parseFloat(parts[1]); // e.g. 80

    // Validate the number
    if (!isNaN(value)) {
      taskDescriptions.push(task);
      taskValues.push(value);
      taskArray.push([task, value]);

      console.log("Task added!");
      console.log("Descriptions:", taskDescriptions);
      console.log("Values:", taskValues);

      document.getElementById('displayArea').innerText = taskArray
      .map(([task, val], index) => `${index + 1}. ${task} (${val})`)
      .join('\n');

    } else {
      alert("Please enter a valid number after the comma.");
    }

  } else {
    alert("Please enter the task in this format: description, number");
  }

 
  // Clear input
  input.value = '';
};

// Add task on button click
clicker.addEventListener("click", handleAddTask);

// Add task on Enter key press inside input
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    handleAddTask();
    const newVal = Number(counter.innerText) + 1;
    counter.innerText = newVal;
  }
});






