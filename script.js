// Get the wheel element
//const wheel = document.querySelector('.wheel');
var wheel1 = document.getElementById('wheel1');
var wheel2 = document.getElementById('wheel2');
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
  w1angle += (direction * 2);
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
    w2angle += (direction * 2);
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
  wheel1.addEventListener('wheel', rotateWheel1);
  wheel2.addEventListener('wheel', rotateWheel2);
  document.addEventListener('mouseout', stopRotation);