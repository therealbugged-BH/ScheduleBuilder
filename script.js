// This is how you get the dom element of this <button id="clicker">Update Counter</button>
const clicker = document.getElementById("clicker");

//arrays to store the tasks
const taskDescriptions = [];
const taskValues = [];

// It returns an array so access the first instance of it with [0]
const counter = document.getElementsByClassName("counter")[0];

//for input
const input = document.getElementById('taskInput');

// You can see all of these values in your browser's inspector
console.log(clicker, counter);

// .innerText returns the text associated with it
console.log(clicker.innerText); //Prints "Update Counter"

//Now, lets update the counter on button click!

// whenever the clicker elemnt is clicked (via the "click"), it will run this function
clicker.addEventListener("click", (e) => {
  const newVal = Number(counter.innerText) + 1;
  counter.innerText = newVal;
});

// Add click event
clicker.addEventListener('click', function() {
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

      console.log("Task added!");
      console.log("Descriptions:", taskDescriptions);
      console.log("Values:", taskValues);
    } else {
      alert("Please enter a valid number after the comma.");
    }

  } else {
    alert("Please enter the task in this format: description, number");
  }


  // Clear input
  input.value = '';
});

function displayText() {
  const input = document.getElementById('taskInput').value; // Get the input value
  document.getElementById('displayArea').innerText = input; // Display it in the div
}

document.getElementById('clicker').addEventListener('click', displayText);


