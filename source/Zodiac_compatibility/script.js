import { wait } from "../utils.js";
import {
  angleDiff,
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

/**
 * @typedef {object} PointerInfo
 * @property {number} pointerId
 * @property {number} initWheelAngle
 * @property {number} initMouseAngle
 * @property {number} lastMouseAngle2
 * @property {number} lastTime2
 * @property {number} lastMouseAngle1
 * @property {number} lastTime1
 */

/**
 * @typedef {object} MomentumInfo
 * @property {number} frameId
 * @property {number} lastTime
 * @property {number} angleVel
 */

class Wheel {
  /**
   * In degrees/ms^2.
   * @type {number}
   */
  static #FRICTION = 0.001;

  /**
   * @type {HTMLElement}
   */
  #elem;
  /**
   * @type {HTMLInputElement}
   */
  #dateInput;
  /**
   * @type {number}
   */
  #angle = 0;
  /**
   * @type {number}
   */
  #angleOffset;
  /**
   * @type {PointerInfo | null}
   */
  #pointer = null;
  /**
   * @type {MomentumInfo | null}
   */
  #animating = null;
  /**
   * @type {number | null}
   */
  #wheelTimeout = null;

  /**
   * @param {HTMLElement} elem
   * @param {HTMLInputElement} dateInput
   * @param {number} angleOffset
   */
  constructor(elem, dateInput, angleOffset = 0) {
    this.#elem = elem;
    this.#dateInput = dateInput;
    this.#angleOffset = angleOffset;

    // add the necessary event listeners for the wheel
    this.#elem.addEventListener("wheel", this.#handleWheel);
    this.#elem.addEventListener("pointerdown", this.#handlePointerDown);
    this.#elem.addEventListener("pointermove", this.#handlePointerMove);
    this.#elem.addEventListener("pointerup", this.#handlePointerUp);
    this.#elem.addEventListener("pointercancel", this.#handlePointerUp);
  }

  getMapping() {
    return getMappingLeft(roundAngle(this.#angle + this.#angleOffset));
  }

  #getDateRange() {
    return determineDateRangeLeft(roundAngle(this.#angle + this.#angleOffset));
  }

  /**
   * @returns {{ x: number; y: number }}
   */
  #getCenter() {
    const rect = this.#elem.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  #setAngle(angle) {
    if (!Number.isFinite(angle)) {
      throw new RangeError(`Expected a numerical angle. Received ${angle}`);
    }
    this.#angle = angle;
    // Apply the rotation transform to the wheel element
    this.#elem.style.transform = `rotate(${this.#angle}deg)`;
    this.#dateInput.value = this.#getDateRange();
  }

  #getAngle() {
    const matrix = window.getComputedStyle(this.#elem).transform;
    const match = matrix.match(
      /^matrix\((-?\d+(?:\.\d+)?(?:e-?\d+)?), (-?\d+(?:\.\d+)?(?:e-?\d+)?)/
    );
    if (match) {
      const cosine = +match[1];
      const sine = +match[2];
      return Math.atan2(sine, cosine) * (180 / Math.PI);
    } else {
      return this.#angle;
    }
  }

  /**
   * @param {PointerEvent} event
   * @returns {number} Clockwise, between -180° and 180°, where 0° means the
   * mouse is right of the center.
   */
  #getMouseAngle(event) {
    const center = this.#getCenter();
    return (
      // y is first
      Math.atan2(event.clientY - center.y, event.clientX - center.x) *
      (180 / Math.PI)
    );
  }

  /**
   * @param {PointerEvent} event
   */
  #handlePointerDown = (event) => {
    if (!this.#pointer) {
      const wheelAngle = this.#getAngle();
      const mouseAngle = this.#getMouseAngle(event);
      this.#pointer = {
        pointerId: event.pointerId,
        initWheelAngle: wheelAngle,
        initMouseAngle: mouseAngle,
        lastMouseAngle2: mouseAngle,
        lastTime2: Date.now(),
        lastMouseAngle1: mouseAngle,
        lastTime1: Date.now(),
      };
      this.#elem.setPointerCapture(event.pointerId);
      // Set angle again in case it was interrupted mid-transition
      this.#setAngle(wheelAngle);
      this.#stopMomentum();
    }
  };

  /**
   * @param {PointerEvent} event
   */
  #handlePointerMove = (event) => {
    if (this.#pointer?.pointerId === event.pointerId) {
      const mouseAngle = this.#getMouseAngle(event);
      this.#pointer.lastMouseAngle2 = this.#pointer.lastMouseAngle1;
      this.#pointer.lastTime2 = this.#pointer.lastTime1;
      this.#pointer.lastMouseAngle1 = mouseAngle;
      this.#pointer.lastTime1 = Date.now();
      this.#setAngle(
        mouseAngle - this.#pointer.initMouseAngle + this.#pointer.initWheelAngle
      );
    }
  };

  /**
   * @param {PointerEvent} event
   */
  #handlePointerUp = (event) => {
    if (this.#pointer?.pointerId === event.pointerId) {
      this.#startMomentum(
        this.#pointer.lastTime1 > this.#pointer.lastTime2
          ? angleDiff(
              this.#pointer.lastMouseAngle1,
              this.#pointer.lastMouseAngle2
            ) /
              (this.#pointer.lastTime1 - this.#pointer.lastTime2)
          : 0
      );
      this.#pointer = null;
    }
  };

  /**
   * Rotates the wheel based on the mouse wheel event.
   * @param {WheelEvent} event - The mouse wheel event.
   */
  #handleWheel = (event) => {
    const center = this.#getCenter();
    const wheelAngle = this.#getAngle();

    // Determine the direction of scrolling
    const direction =
      Math.sign(event.deltaY) * Math.sign(center.x - event.clientX);

    // Update the rotation angle based on the scrolling direction
    this.#setAngle(wheelAngle + direction * 2);
    console.log(wheelAngle, this.#angle);

    this.#stopMomentum();
    this.#wheelTimeout = setTimeout(() => {
      this.#wheelTimeout = null;
      this.#snap();
    }, 500);

    // Prevent the default scrolling behavior
    event.preventDefault();
  };

  /**
   * @param {number} angleVel
   */
  #startMomentum(angleVel = 0) {
    if (!this.#animating) {
      this.#animating = {
        frameId: 0,
        lastTime: Date.now(),
        angleVel,
      };
      this.#paint();
    }
  }

  #stopMomentum() {
    if (this.#animating) {
      window.cancelAnimationFrame(this.#animating.frameId);
      this.#animating = null;
    }
    if (this.#wheelTimeout) {
      clearTimeout(this.#wheelTimeout);
      this.#wheelTimeout = null;
    }
    this.#elem.style.transition = null;
  }

  #paint = () => {
    if (!this.#animating) {
      return;
    }
    const now = Date.now();
    const elapsed = Math.min(now - this.#animating.lastTime, 200);
    this.#animating.lastTime = now;
    if (this.#animating.angleVel > 0) {
      this.#animating.angleVel = Math.max(
        this.#animating.angleVel - Wheel.#FRICTION * elapsed,
        0
      );
    } else {
      this.#animating.angleVel = Math.min(
        this.#animating.angleVel + Wheel.#FRICTION * elapsed,
        0
      );
    }
    if (this.#animating.angleVel === 0) {
      this.#animating = null;
      this.#snap();
      return;
    } else {
      this.#setAngle(this.#angle + this.#animating.angleVel * elapsed);
    }
    this.#animating.frameId = window.requestAnimationFrame(this.#paint);
  };

  #snap() {
    this.#elem.style.transition = "transform 0.5s";
    this.#setAngle(roundAngle(this.#angle));
  }
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
