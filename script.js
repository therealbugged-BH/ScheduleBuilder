// This is how you get the dom element of this <button id="clicker">Update Counter</button>
const clicker = document.getElementById("clicker");

// You can also access stuff by a class name such as <span class="counter">0</span>
// It returns an array so access the first instance of it with [0]
const counter = document.getElementsByClassName("counter")[0];

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
