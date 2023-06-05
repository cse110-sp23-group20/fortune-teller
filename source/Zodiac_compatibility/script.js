// Get the wheel element
//const wheel = document.querySelector('.wheel');
var wheel1 = document.getElementById("wheel1");
var wheel2 = document.getElementById("wheel2");
// Set initial rotation angle
let w1angle = 0;
let w1anglereal = 0;
let w2angle = 0;
let w2anglereal = 0;

// Function to handle the mouse wheel event
function rotateWheel1(event) {
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w1angle += direction * 2;
  w1anglereal = w1angle % 360;
  console.log(w1anglereal);
  // Apply the rotation transform to the wheel element
  wheel1.style.transform = `rotate(${w1anglereal}deg)`;

  // Prevent the default scrolling behavior
  event.preventDefault();
}
// Function to handle the mouse wheel event
function rotateWheel2(event) {
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w2angle += direction * 2;
  w2anglereal = w2angle % 360;
  // Apply the rotation transform to the wheel element
  wheel2.style.transform = `rotate(${w2anglereal}deg)`;

  // Prevent the default scrolling behavior
  event.preventDefault();
}

// Add the event listener for the mouse wheel event
//wheel.addEventListener('wheel', rotateWheel);
// Function to round the angle to the nearest multiple of 30
function roundAngle(angle) {
  return Math.round(angle / 30) * 30;
}

// Function to handle the mouseout event
function stopRotation(event) {
  // Round the current angle of the wheels to the nearest multiple of 30
  const target1 = roundAngle(w1anglereal);
  const target2 = roundAngle(w2anglereal);
  // print rounded angles for clarity
  console.log(`wheel 1 is rounded to ${target1}`);
  console.log(`wheel 2 is rounded to ${target2}`);

  // Apply the rounded rotation transform to the wheel elements smoothly over 500ms
  const interval = setInterval(() => {
    if (w1anglereal < target1) {
      w1anglereal += 1;
      wheel1.style.transform = `rotate(${w1anglereal}deg)`;
    }
    if (w1anglereal > target1) {
      w1anglereal -= 1;
      wheel1.style.transform = `rotate(${w1anglereal}deg)`;
    }
    if (w2anglereal < target2) {
      w2anglereal += 1;
      wheel2.style.transform = `rotate(${w2anglereal}deg)`;
    }
    if (w2anglereal > target2) {
      w2anglereal -= 1;
      wheel2.style.transform = `rotate(${w2anglereal}deg)`;
    }
    if (w1anglereal === target1 && w2anglereal === target2) {
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

console.log(popup);
button.addEventListener("click", () => {
  const pair = determinePairing(w1anglereal, w2anglereal);
  //console.log(pair);
  wheel1.style.animation = "slideOffLeft 1s forwards";
  wheel2.style.animation = "slideOffRight 1s forwards";
  button.style.animation = "fadeOut 1s forwards";
  setTimeout(() => {
    popup.style.display = "block";
    popup.style.animation = "fadeIn 3s forwards";
    const pairingHeader = popup.querySelector("#pairing");
    pairingHeader.textContent = pair;
  }, 2);
});

const mapping1 = [
  [0, "aquarius"],
  [360, "aquarius"],

  [30, "pisces"],
  [-330, "pisces"],

  [60, "aries"],
  [-300, "aries"],

  [90, "taurus"],
  [-270, "taurus"],

  [120, "gemini"],
  [-240, "gemini"],

  [150, "cancer"],
  [-210, "cancer"],

  [180, "leo"],
  [-180, "leo"],

  [210, "virgo"],
  [-150, "virgo"],

  [240, "libra"],
  [-120, "libra"],

  [270, "scorpio"],
  [-90, "scorpio"],

  [300, "sagittarius"],
  [-60, "scorpio"],

  [330, "capricorn"],
  [-30, "scorpio"],
];

const mapping2 = [
  [0, "leo"],
  [360, "leo"],

  [30, "virgo"],
  [-330, "virgo"],

  [60, "libra"],
  [-300, "libra"],

  [90, "scorpio"],
  [-270, "scorpio"],

  [120, "sagittarius"],
  [-240, "sagittarius"],

  [150, "capricorn"],
  [-210, "capricorn"],

  [180, "aquarius"],
  [-180, "aquarius"],

  [210, "pisces"],
  [-150, "pisces"],

  [240, "aires"],
  [-120, "aires"],

  [270, "taurus"],
  [-90, "taurus"],

  [300, "gemini"],
  [-60, "gemini"],

  [330, "cancer"],
  [-30, "cancer"],
];

function getMapping1(angle1) {
  for (let i = 0; i < mapping1.length; i++) {
    if (angle1 === mapping1[i][0]) {
      return mapping1[i][1];
    }
  }
  return "unknown";
}
function getMapping2(angle2) {
  for (let i = 0; i < mapping2.length; i++) {
    if (angle2 === mapping2[i][0]) {
      return mapping2[i][1];
    }
  }
  return "unknown";
}

function determinePairing(angle1, angle2) {
  const angle1Mapping = getMapping1(angle1);
  const angle2Mapping = getMapping2(angle2);
  return `wheel1's mapping is ${angle1Mapping} and wheel2's mapping is ${angle2Mapping}.`;
}
