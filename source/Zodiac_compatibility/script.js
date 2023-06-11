import { wait } from "../utils.js";
import {
  determineDateRangeLeft,
  getMappingLeft,
  roundAngle,
  textGenerator,
} from "./zodiac-angles.js";

// Get all necessary document objects
const button = document.getElementById("find-out");
const how_to = document.getElementById("how_to");
const help = document.getElementById("help");
const popup = document.getElementById("pop-up");

class Wheel {
  elem;
  dateInput;
  // Set initial rotation angle of the zodiac wheel
  angle = 0;
  angleOffset;

  constructor(elem, dateInput, angleOffset = 0) {
    this.elem = elem;
    this.dateInput = dateInput;
    this.angleOffset = angleOffset;

    // add the necessary event listeners for the wheel
    this.elem.addEventListener("wheel", this.#handleRotate);
    this.elem.addEventListener("mouseout", this.stopRotation);
  }

  getMapping() {
    return getMappingLeft(roundAngle(this.angle + this.angleOffset));
  }

  #getDateRange() {
    return determineDateRangeLeft(roundAngle(this.angle + this.angleOffset));
  }

  #setAngle(angle) {
    this.angle = angle;
    // Apply the rotation transform to the wheel element
    this.elem.style.transform = `rotate(${this.angle}deg)`;
    this.dateInput.value = this.#getDateRange();
  }

  /**
   * Rotates the wheel based on the mouse wheel event.
   * @param {WheelEvent} event - The mouse wheel event.
   */
  #handleRotate = (event) => {
    // Determine the direction of scrolling
    const direction = Math.sign(event.deltaY);

    // Update the rotation angle based on the scrolling direction
    this.#setAngle(this.angle + direction * 2);

    // Prevent the default scrolling behavior
    event.preventDefault();
  };

  /**
   * Stops the rotation of the wheels and applies a smooth transition to the nearest rounded angle.
   */
  stopRotation = () => {
    // Round the current angle of the wheels to the nearest multiple of 30
    const target = roundAngle(this.angle);

    // print rounded angles for clarity
    console.log(
      this.elem.id,
      `Wheel is rounded to ${target}: ${this.getMapping()}`
    );

    // Apply the rounded rotation transform to the wheel elements smoothly over 500ms
    const interval = setInterval(() => {
      if (this.angle < target) {
        this.#setAngle(this.angle + 1);
      }
      if (this.angle > target) {
        this.#setAngle(this.angle - 1);
      }
      if (this.angle === target) {
        clearInterval(interval);
      }
    }, 15);
  };
}

const leftWheel = new Wheel(
  document.getElementById("left_wheel_img"),
  document.getElementById("left_birthday")
);
const rightWheel = new Wheel(
  document.getElementById("right_wheel_img"),
  document.getElementById("right_birthday"),
  180
);

// add all the necessary event listeners for the buttons
button.addEventListener("mouseenter", () => {
  leftWheel.stopRotation();
  rightWheel.stopRotation();
});
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

/**
 * Displays the results of the pairing and animates the UI elements.
 */
async function displayResults() {
  const left = leftWheel.getMapping();
  const right = rightWheel.getMapping();
  // slide off or fade all of the elements on the page to make room for results popup
  document.body.classList.add("remove-wheels");

  const pairingHeader = popup.querySelector("#pairing");
  pairingHeader.textContent = left + " and " + right;
  const pairing_text = popup.querySelector("#pairing_text");
  pairing_text.innerHTML = textGenerator(left, right);

  /**
   * Displays the popup with the pairing information after a delay.
   */
  await wait(200);
  popup.parentElement.classList.add("open");
}
