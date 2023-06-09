import {
  romantic,
  zodiacDateRangesLeft,
  zodiacDateRangesRight,
  mappingLeft,
  mappingRight,
} from "./data/dataArray.js";

// Get the wheel element
//const wheel = document.querySelector('.wheel');
var leftWheel = document.getElementById("left_wheel_img");
var rightWheel = document.getElementById("right_wheel_img");
// Set initial rotation angle
let leftWheelAngle = 0;
let rightWheelAngle = 0;

// Function to handle the mouse wheel event
function rotateleftWheel(event) {
  const dateInput = document.getElementById("left_birthday");

  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  leftWheelAngle += direction * 2;
  //console.log(leftWheelAngle);
  // Apply the rotation transform to the wheel element
  leftWheel.style.transform = `rotate(${leftWheelAngle}deg)`;
  dateInput.type = "text";
  dateInput.value = determineDateRangeLeft(roundAngle(leftWheelAngle));
  dateInput.style.textAlign = "center";
  dateInput.style.background = "transparent";
  // Prevent the default scrolling behavior
  event.preventDefault();
}
// Function to handle the mouse wheel event
function rotaterightWheel(event) {
  const dateInput = document.getElementById("right_birthday");
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  rightWheelAngle += direction * 2;
  // Apply the rotation transform to the wheel element
  rightWheel.style.transform = `rotate(${rightWheelAngle}deg)`;

  dateInput.type = "text";
  dateInput.value = determineDateRangeRight(roundAngle(rightWheelAngle));
  dateInput.style.textAlign = "center";
  dateInput.style.background = "transparent";
  // Prevent the default scrolling behavior
  event.preventDefault();
}
function determineDateRangeLeft(angle) {
  angle = angle % 360;
  for (let i = 0; i < zodiacDateRangesLeft.length; i++) {
    if (angle === zodiacDateRangesLeft[i][0]) {
      return zodiacDateRangesLeft[i][1];
    }
  }
  return "unknown";
}
function determineDateRangeRight(angle) {
  angle = angle % 360;
  for (let i = 0; i < zodiacDateRangesRight.length; i++) {
    if (angle === zodiacDateRangesRight[i][0]) {
      return zodiacDateRangesRight[i][1];
    }
  }
  return "unknown";
}

// Add the event listener for the mouse wheel event
//wheel.addEventListener('wheel', rotateWheel);
// Function to round the angle to the nearest multiple of 30
function roundAngle(angle) {
  var base = Math.floor(angle / 360);
  var rem = angle % 360;
  if (angle >= 0) {
    return base * 360 + Math.round(rem / 30) * 30;
  } else {
    base = Math.ceil(angle / 360); // Use Math.ceil instead of Math.floor
    //console.log(base + ';' + rem)
    return base * 360 + Math.round(rem / 30) * 30;
  }
}

// Function to handle the mouseout event
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

// Add the event listeners for the mouse wheel and mouseout events
leftWheel.addEventListener("wheel", rotateleftWheel);
rightWheel.addEventListener("wheel", rotaterightWheel);
leftWheel.addEventListener("mouseout", stopRotation);
rightWheel.addEventListener("mouseout", stopRotation);

// Gt all the elements that need to be moved when the find out button is pressed:
const button = document.getElementById("find-out");
const how_to = document.getElementById("how_to");
const help = document.getElementById("help");
const closeButton = document.getElementById("closeButton");
const popup = document.getElementById("pop-up");
const left_arrow = document.getElementById("left_arrow");
const right_arrow = document.getElementById("right_arrow");
const left_bday = document.getElementById("left_bday_input");
const right_bday = document.getElementById("right_bday_input");

how_to.addEventListener("click", () => {
  how_to.style.visibility = "hidden";
  help.style.display = "block";
  help.style.animation = "fadeIn 1s forwards";
});

closeButton.addEventListener("click", () => {
  how_to.style.visibility = "visible";
  help.style.animation = "fadeOut 1s forwards";
  help.style.display = "none";
});

button.addEventListener("mouseenter", () => {
  stopRotation();
});

button.addEventListener("click", () => {
  const pair = determinePairing(leftWheelAngle, rightWheelAngle);
  leftWheel.style.animation = "slideOffLeft 1s forwards";
  rightWheel.style.animation = "slideOffRight 1s forwards";
  left_arrow.style.animation = "slideOffLeft 0.1s forwards";
  right_arrow.style.animation = "slideOffRight 0.1s forwards";
  left_bday.style.animation = "slideOffLeft 0.4s forwards";
  right_bday.style.animation = "slideOffRight 0.4s forwards";
  button.style.animation = "fadeOut 0.5s forwards";
  button.style.display = "none";
  how_to.style.animation = "fadeOut 0.5s forwards";
  how_to.style.display = "none";

  setTimeout(() => {
    popup.style.display = "block";
    popup.style.animation = "fadeIn 2s forwards";
    const pairingHeader = popup.querySelector("#pairing");
    pairingHeader.textContent = pair[0] + " and " + pair[1];
    const pairing_text = popup.querySelector("#pairing_text");
    pairing_text.innerHTML = textGenerator(pair[0], pair[1]);
  }, 2);
});

function getMappingLeft(angle) {
  angle = angle % 360;
  for (let i = 0; i < mappingLeft.length; i++) {
    if (angle == mappingLeft[i][0]) {
      return mappingLeft[i][1];
    }
  }
  return "unknown";
}
function getMappingRight(angle) {
  angle = angle % 360;
  for (let i = 0; i < mappingRight.length; i++) {
    if (angle == mappingRight[i][0]) {
      return mappingRight[i][1];
    }
  }
  return "unknown";
}

function determinePairing(angleLeft, angleRight) {
  angleLeft = angleLeft % 360;
  angleRight = angleRight % 360;
  const leftMapping = getMappingLeft(angleLeft);
  const rightMapping = getMappingRight(angleRight);
  return [leftMapping, rightMapping];
}

// generate results text

//text generator
function textGenerator(one, two) {
  for (let i = 0; i < romantic.length; i++) {
    console.log(one + " and " + two);
    if (one + " and " + two === romantic[i][0]) {
      return romantic[i][1];
    } else if (two + " and " + one === romantic[i][0]) {
      return romantic[i][1];
    }
  }
  return "An error has occurred";
}
