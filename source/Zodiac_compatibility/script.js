// Get the wheel element
//const wheel = document.querySelector('.wheel');
var wheel1 = document.getElementById("left_wheel_img");
var wheel2 = document.getElementById("right_wheel_img");
// Set initial rotation angle
let w1angle = 0;
let w2angle = 0;

// Function to handle the mouse wheel event
function rotateWheel1(event) {
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w1angle += direction * 5;
  console.log(w1angle);
  // Apply the rotation transform to the wheel element
  wheel1.style.transform = `rotate(${w1angle}deg)`;

  // Prevent the default scrolling behavior
  event.preventDefault();
}
// Function to handle the mouse wheel event
function rotateWheel2(event) {
  // Determine the direction of scrolling
  const direction = Math.sign(event.deltaY);

  // Update the rotation angle based on the scrolling direction
  w2angle += direction * 5;
  // Apply the rotation transform to the wheel element
  wheel2.style.transform = `rotate(${w2angle}deg)`;

  // Prevent the default scrolling behavior
  event.preventDefault();
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
  const target1 = roundAngle(w1angle);
  const target2 = roundAngle(w2angle);
  // print rounded angles for clarity
  console.log(`wheel 1 is rounded to ${target1}`);
  console.log(`wheel 2 is rounded to ${target2}`);

  // Apply the rounded rotation transform to the wheel elements smoothly over 500ms
  const interval = setInterval(() => {
    if (w1angle< target1) {
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
button.addEventListener("click", () => {
  stopRotation()
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
    pairingHeader.textContent = pair ;
    const pairing_text = popup.querySelector("#pairing_text");
    pairing_text.textContent =  'Aries and Pisces have different approaches to life and relationships. Aries is direct and assertive, while Pisces is intuitive and sensitive. They may need to find a balance between their contrasting traits to create harmony.'
  }, 2);
});

const mapping1 = [
  [0, "Capricorn"],
  [360, "Capricorn"],

  [30, "Sagittarius"],
  [-330, "Sagittarius"],

  [60, "Scorpio"],
  [-300, "Scorpio"],

  [90, "Libra"],
  [-270, "Libra"],

  [120, "Virgo"],
  [-240, "Virgo"],

  [150, "Leo"],
  [-210, "Leo"],

  [180, "Cancer"],
  [-180, "Cancer"],

  [210, "Gemini"],
  [-150, "Gemini"],

  [240, "Taurus"],
  [-120, "Taurus"],

  [270, "Aries"],
  [-90, "Aries"],

  [300, "Pisces"],
  [-60, "Pisces"],

  [330, "Aquarius"],
  [-30, "Aquarius"],
];

const mapping2 = [
  [0, "Cancer"],
  [360, "Cancer"],

  [30, "Gemini"],
  [-330, "Gemini"],

  [60, "Taurus"],
  [-300, "Taurus"],

  [90, "Aries"],
  [-270, "Aries"],

  [120, "Pisces"],
  [-240, "Pisces"],

  [150, "Aquarius"],
  [-210, "Aquarius"],

  [180, "Capricorn"],
  [-180, "Capricorn"],

  [210, "Sagittarius"],
  [-150, "Sagittarius"],

  [240, "Scorpio"],
  [-120, "Scorpio"],

  [270, "Libra"],
  [-90, "Libra"],

  [300, "Virgo"],
  [-60, "Virgo"],

  [330, "Leo"],
  [-30, "Leo"],
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
  angle1 = angle1%360
  angle2 = angle2%360
  const angle1Mapping = getMapping1(angle1);
  const angle2Mapping = getMapping2(angle2);
  return `${angle1Mapping} and ${angle2Mapping}`;
}

// generate results text


function determineResults(pairing, relationship) {
  if (relationship === "romantic"){

  }
  else if (relationship === "friendship"){

  }
  else{
    
  }

}
