import { wait } from "../utils.js";
import {
  determineDateRangeLeft,
  determineDateRangeRight,
  determinePairing,
  getMappingLeft,
  getMappingRight,
  roundAngle,
  textGenerator,
} from "./zodiac-angles.js";

// Get all necessary document objects
const leftWheel = document.getElementById("left_wheel_img");
const rightWheel = document.getElementById("right_wheel_img");
const button = document.getElementById("find-out");
const how_to = document.getElementById("how_to");
const help = document.getElementById("help");
const popup = document.getElementById("pop-up");

// add the necessary event listeners for the wheels
leftWheel.addEventListener("wheel", rotateLeftWheel);
rightWheel.addEventListener("wheel", rotateRightWheel);
leftWheel.addEventListener("mouseout", stopRotation);
rightWheel.addEventListener("mouseout", stopRotation);
// add all the necessary event listeners for the buttons
button.addEventListener("mouseenter", stopRotation);
button.addEventListener("click", displayResults);

how_to.addEventListener("click", () => {
  help.parentElement.classList.add("open");
});
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup-wrapper") ||
    event.target.closest(".close-button")
  ) {
    const popupWrapper = event.target.closest(".popup-wrapper");
    popupWrapper.classList.remove("open");
    if (popupWrapper === popup.parentElement) {
      document.body.classList.remove("remove-wheels");
    }
  }
});

// Set initial rotation angle of the two zodiac wheels
let leftWheelAngle = 0;
let rightWheelAngle = 0;

/**
 * Rotates the left wheel based on the mouse wheel event.
 * @param {WheelEvent} event - The mouse wheel event.
 */
function rotateLeftWheel(event) {
  const dateInput = document.getElementById("left_birthday");

  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  leftWheelAngle += direction * 2;
  // Apply the rotation transform to the wheel element
  leftWheel.style.transform = `rotate(${leftWheelAngle}deg)`;

  dateInput.value = determineDateRangeLeft(roundAngle(leftWheelAngle));

  // Prevent the default scrolling behavior
  event.preventDefault();
}
/**
 * Rotates the right wheel based on the mouse wheel event.
 * @param {WheelEvent} event - The mouse wheel event.
 */
function rotateRightWheel(event) {
  const dateInput = document.getElementById("right_birthday");
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  rightWheelAngle += direction * 2;
  // Apply the rotation transform to the wheel element
  rightWheel.style.transform = `rotate(${rightWheelAngle}deg)`;

  dateInput.value = determineDateRangeRight(roundAngle(rightWheelAngle));

  // Prevent the default scrolling behavior
  event.preventDefault();
}

/**
 * Stops the rotation of the wheels and applies a smooth transition to the nearest rounded angle.
 */
function stopRotation() {
  // Round the current angle of the wheels to the nearest multiple of 30
  const target1 = roundAngle(leftWheelAngle);
  const target2 = roundAngle(rightWheelAngle);

  // print rounded angles for clarity
  console.log(
    `Left Wheel is rounded to ${target1}: ${getMappingLeft(target1)}`
  );
  console.log(
    `Right Wheel is rounded to ${target2}: ${getMappingRight(target2)}`
  );

  // Apply the rounded rotation transform to the wheel elements smoothly over 500ms
  const interval = setInterval(() => {
    if (leftWheelAngle < target1) {
      leftWheelAngle += 1;
      leftWheel.style.transform = `rotate(${leftWheelAngle}deg)`;
    }
    if (leftWheelAngle > target1) {
      leftWheelAngle -= 1;
      leftWheel.style.transform = `rotate(${leftWheelAngle}deg)`;
    }
    if (rightWheelAngle < target2) {
      rightWheelAngle += 1;
      rightWheel.style.transform = `rotate(${rightWheelAngle}deg)`;
    }
    if (rightWheelAngle > target2) {
      rightWheelAngle -= 1;
      rightWheel.style.transform = `rotate(${rightWheelAngle}deg)`;
    }
    if (leftWheelAngle === target1 && rightWheelAngle === target2) {
      clearInterval(interval);
    }
  }, 15);
}

/**
 * Displays the results of the pairing and animates the UI elements.
 */
async function displayResults() {
  const pair = determinePairing(leftWheelAngle, rightWheelAngle);
  // slide off or fade all of the elements on the page to make room for results popup
  document.body.classList.add("remove-wheels");

  /**
   * Displays the popup with the pairing information after a delay.
   */
  await wait(200);
  popup.parentElement.classList.add("open");
  const pairingHeader = popup.querySelector("#pairing");
  pairingHeader.textContent = pair[0] + " and " + pair[1];
  const pairing_text = popup.querySelector("#pairing_text");
  pairing_text.innerHTML = textGenerator(pair[0], pair[1]);
}

document.addEventListener("DOMContentLoaded", function () {
  const leftWheel = document.getElementById("left_wheel_img");
  const rightWheel = document.getElementById("right_wheel_img");
  leftWheel.style.animation = "slideOnLeft 1.25s forwards";
  rightWheel.style.animation = "slideOnRight 1.25s forwards";

  setTimeout(() => {
    leftWheel.style.animation = "";
    rightWheel.style.animation = "";
    leftWheel.style.opacity = "1";
    rightWheel.style.opacity = "1";
  }, 1250);
  left_bday.style.animation = "appear 1s 1.25s forwards";
  right_bday.style.animation = "appear 1s 1.25s forwards";
  left_arrow.style.animation = "appear 1s 2s forwards";
  right_arrow.style.animation = "appear 1s 2s forwards";
  button.style.animation = "appear 1s 2.5s forwards";
  setTimeout(() => {
    button.style.pointerEvents = "auto";
  }, 3500);
  how_to.style.animation = "appear 1s 3.25s forwards";
  setTimeout(() => {
    how_to.style.pointerEvents = "auto";
  }, 4250);
});
