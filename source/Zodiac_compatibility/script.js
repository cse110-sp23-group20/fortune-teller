import {
  determineDateRangeLeft,
  determineDateRangeRight,
  determinePairing,
  roundAngle,
  textGenerator,
} from "./zodiac-angles.js";

// Get the wheel element
//const wheel = document.querySelector('.wheel');
var wheel1 = document.getElementById("left_wheel_img");
var wheel2 = document.getElementById("right_wheel_img");
// Set initial rotation angle
let w1angle = 0;
let w2angle = 0;

// Function to handle the mouse wheel event
function rotateWheel1(event) {
  const dateInput = document.getElementById("left_birthday");

  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w1angle += direction * 2;
  console.log(w1angle);
  // Apply the rotation transform to the wheel element
  wheel1.style.transform = `rotate(${w1angle}deg)`;
  dateInput.type = "text";
  dateInput.value = determineDateRangeLeft(roundAngle(w1angle));
  dateInput.style.textAlign = "center";
  dateInput.style.background = "transparent";
  // Prevent the default scrolling behavior
  event.preventDefault();
}
// Function to handle the mouse wheel event
function rotateWheel2(event) {
  const dateInput = document.getElementById("right_birthday");
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w2angle += direction * 2;
  // Apply the rotation transform to the wheel element
  wheel2.style.transform = `rotate(${w2angle}deg)`;

  dateInput.type = "text";
  dateInput.value = determineDateRangeRight(roundAngle(w2angle));
  dateInput.style.textAlign = "center";
  dateInput.style.background = "transparent";
  // Prevent the default scrolling behavior
  event.preventDefault();
}

// Function to handle the mouseout event
function stopRotation() {
  // Round the current angle of the wheels to the nearest multiple of 30
  const target1 = roundAngle(w1angle);
  const target2 = roundAngle(w2angle);
  // print rounded angles for clarity
  console.log(`wheel 1 is rounded to ${target1}`);
  console.log(`wheel 2 is rounded to ${target2}`);

  // Apply the rounded rotation transform to the wheel elements smoothly over 500ms
  const interval = setInterval(() => {
    if (w1angle < target1) {
      w1angle += 1;
      wheel1.style.transform = `rotate(${w1angle}deg)`;
    }
    if (w1angle > target1) {
      w1angle -= 1;
      wheel1.style.transform = `rotate(${w1angle}deg)`;
    }
    if (w2angle < target2) {
      w2angle += 1;
      wheel2.style.transform = `rotate(${w2angle}deg)`;
    }
    if (w2angle > target2) {
      w2angle -= 1;
      wheel2.style.transform = `rotate(${w2angle}deg)`;
    }
    if (w1angle === target1 && w2angle === target2) {
      clearInterval(interval);
    }
  }, 15);
}

// Add the event listeners for the mouse wheel and mouseout events
wheel1.addEventListener("wheel", rotateWheel1);
wheel2.addEventListener("wheel", rotateWheel2);
wheel1.addEventListener("mouseout", stopRotation);
wheel2.addEventListener("mouseout", stopRotation);

var button = document.getElementById("find-out");
const popup = document.getElementById("pop-up");
const left_arrow = document.getElementById("left_arrow");
const right_arrow = document.getElementById("right_arrow");
const left_bday = document.getElementById("left_bday_input");
const right_bday = document.getElementById("right_bday_input");
var relationship_selector = document.querySelector(".relationship");

button.addEventListener("mouseenter", () => {
  stopRotation();
});
button.addEventListener("click", () => {
  const pair = determinePairing(w1angle, w2angle);
  //console.log(pair);

  wheel1.style.animation = "slideOffLeft 1s forwards";
  wheel2.style.animation = "slideOffRight 1s forwards";
  left_arrow.style.animation = "slideOffLeft 0.1s forwards";
  right_arrow.style.animation = "slideOffRight 0.1s forwards";
  left_bday.style.animation = "slideOffLeft 0.4s forwards";
  right_bday.style.animation = "slideOffRight 0.4s forwards";
  relationship_selector.style.animation = "fadeOut 0.5s forwards";
  button.style.animation = "fadeOut 0.5s forwards";

  setTimeout(() => {
    popup.style.display = "block";
    popup.style.animation = "fadeIn 2s forwards";
    const pairingHeader = popup.querySelector("#pairing");
    pairingHeader.textContent = pair[0] + " and " + pair[1];
    const pairing_text = popup.querySelector("#pairing_text");
    pairing_text.innerHTML = textGenerator(pair[0], pair[1]);
  }, 2);
});
