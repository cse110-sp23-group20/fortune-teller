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
const howTo = document.getElementById("how-to");
const help = document.getElementById("help");
const popup = document.getElementById("pop-up");

/**
 * Stores information about the pointer dragging the wheel around.
 * @typedef {object} PointerInfo
 * @property {number} pointerId - The ID of the pointer.
 * @property {number} initWheelAngle - The angle of the wheel when dragging
 * started.
 * @property {number} initMouseAngle - The polar coordinate angle of the mouse
 * when dragging started.
 * @property {number} lastMouseAngle2 - The second-to-last recorded mouse angle.
 * @property {number} lastTime2 - The timestamp of the second-to-last
 * `pointermove` event.
 * @property {number} lastMouseAngle1 - The last recorded mouse angle.
 * @property {number} lastTime1 - The timestamp of the last `pointermove` event.
 */

/**
 * Stores information about the wheel momentum animation.
 * @typedef {object} MomentumInfo
 * @property {number} frameId - The ID of the requested frame, returned by
 * `window.requestAnimationFrame`, used to cancel it.
 * @property {number} lastTime - The timestamp of the last animation frame.
 * @property {number} angleVel - The angular velocity of the wheel, in
 * degrees/ms.
 */

/**
 * A rotatable zodiac wheel.
 *
 * All units of rotation are in degrees, and units of time are in milliseconds.
 */
class Wheel {
  /**
   * The amount of friction to apply to a wheel spinning with momentum. In
   * degrees/ms^2.
   * @type {number}
   */
  static #FRICTION = 0.001;

  /**
   * The wheel image that gets rotated.
   * @type {HTMLElement}
   */
  #elem;
  /**
   * The input element that displays the date range of the selected zodiac.
   * @type {HTMLInputElement}
   */
  #dateInput;
  /**
   * The rotation angle of the wheel image.
   *
   * Note that this may not be the angle to get the zodiac mapping from, since,
   * for example, the right wheel takes the zodiac from the left side of the
   * wheel.
   * @type {number}
   */
  #angle = 0;
  /**
   * An offset to add to `#angle` before determining the mapped zodiac. The
   * right wheel has an offset of 180° because it takes the zodiac from the left
   * side of the wheel.
   * @type {number}
   */
  #angleOffset;
  /**
   * Information about the pointer dragging the wheel, if the wheel is being
   * dragged.
   * @type {PointerInfo | null}
   */
  #pointer = null;
  /**
   * Information about the wheel momentum animation, if the wheel momentum is
   * being animated.
   * @type {MomentumInfo | null}
   */
  #animating = null;
  /**
   * The `setTimeout` ID of the delay after using the scroll wheel on the wheel
   * before trying to snap the wheel to the closest zodiac. This timeout gets
   * cleared if the user continues to scroll before the timeout runs.
   * @type {number | null}
   */
  #wheelTimeout = null;

  /**
   * Constructs a `Wheel` based on existing DOM elements. Adds event listeners
   * to the wheel image.
   * @param {HTMLElement} elem - The wheel image element.
   * @param {HTMLInputElement} dateInput - The date input that shows the date
   * range of the selected zodiac.
   * @param {number} angleOffset - The offset to add to the visual rotation
   * angle of the wheel before determining the mapped zodiac. Default: 0.
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

  /**
   * Calculates the zodiac that the wheel's arrow is pointing to. If the wheel
   * rotation angle is not at a perfect multiple of 30°, it will round the angle
   * to determine which zodiac the arrow is pointing at.
   * @returns {string} The zodiac.
   */
  getMapping() {
    return getMappingLeft(roundAngle(this.#angle + this.#angleOffset));
  }

  /**
   * Gets the range of dates for the zodiac that the wheel's arrow is pointing
   * at.
   * @returns {string} A range of dates for the zodiac.
   */
  #getDateRange() {
    return determineDateRangeLeft(roundAngle(this.#angle + this.#angleOffset));
  }

  /**
   * Gets the midpoint of the wheel image.
   * @returns {{ x: number, y: number }} Coordinates in pixels relative to the
   * top left of the screen.
   */
  #getCenter() {
    const rect = this.#elem.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  /**
   * Sets the visual rotation angle of the wheel image (no animation). This will
   * also update the zodiac date range while the wheel is rotating.
   * @param {number} angle - The angle to rotate the wheel to, in degrees.
   */
  #setAngle(angle) {
    if (!Number.isFinite(angle)) {
      throw new RangeError(`Expected a numerical angle. Received ${angle}`);
    }
    this.#angle = angle;
    // Apply the rotation transform to the wheel element
    this.#elem.style.transform = `rotate(${this.#angle}deg)`;
    this.#dateInput.value = this.#getDateRange();
  }

  /**
   * Determines the current rotation angle of the wheel image.
   *
   * Normally, this would be the same as `#angle`, but for snapping the wheel to
   * the nearest zodiac, it uses a CSS transition to smoothly rotate to the
   * nearest zodiac.
   *
   * However, if the user decides to start rotating the wheel in the middle of
   * the transition, `#angle` will have the rounded angle. This method uses
   * `getComputedStyle` to get the current angle during the transition.
   * @returns {number} The visual rotation angle of the wheel image, in degrees.
   */
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
   * Converts a mouse position to a polar coordinate relative to the middle of
   * the wheel image, and returns the angle.
   * @param {PointerEvent} event - The event object from a pointer event
   * handler.
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
   * Event handler for the `pointerdown` event.
   *
   * We're using [pointer
   * events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
   * rather than [mouse events](https://javascript.info/mouse-events-basics) or
   * [touch
   * events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events)
   * because pointer events have several advantages:
   *
   * - They're an all-in-one set of events that fire for both mouse cursors,
   *   fingers, and pens (collectively called pointers). This means that I don't
   *   need to add both `mousedown` and `touchstart` event listeners.
   * - The `setPointerCapture` method lets me receive `pointermove` and
   *   `pointerup` events on the wheel image even when the pointer moves outside
   *   of the element. For mouse and touch events, I would have to listen for
   *   move events on the entire `document`.
   * - Combined with CSS `touch-action: none;`, I don't need to use
   *   `event.preventDefault()` to prevent scrolling, which would also require
   *   `{ passive: true }` when using touch events.
   * - Finally, the `pointercancel` event makes it nice in case the user holds
   *   down their mouse and leaves the page. For mouse events, it will simply
   *   not fire any event when this happens, so to the user when they return,
   *   it'll look like the wheel is sticking to their cursor even though they
   *   aren't holding it down.
   * @param {PointerEvent} event - Event object.
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
   * Event handler for the `pointermove` event.
   * @param {PointerEvent} event - Event object.
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
   * Event handler for the `pointerup` and `pointercancel` events. The latter
   * occurs if the user holds their mouse down then switches tabs.
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

    this.#stopMomentum();
    this.#wheelTimeout = setTimeout(() => {
      this.#wheelTimeout = null;
      this.#snap();
    }, 500);

    // Prevent the default scrolling behavior
    event.preventDefault();
  };

  /**
   * Starts rotating the wheel with momentum given an initial angular velocity.
   * @param {number} angleVel - The initial angular velocity, in degrees/ms.
   * Default: 0.
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

  /**
   * Stops all animations relating to the wheel moving on its own, such as the
   * wheel rotating with momentum or automatically snapping to the nearest
   * zodiac.
   *
   * This is called when the user starts rotating the wheel to prevent the user
   * and the website from fighting over control of the wheel.
   */
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

  /**
   * Simulates the wheel moving and updates the wheel rotation accordingly, in
   * an animation frame. Automatically stops and snaps to the nearest zodiac
   * when the wheel slows down.
   */
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

  /**
   * Uses a CSS transition to smoothly rotate the wheel to the nearest zodiac.
   *
   * Note that because we're using CSS transitions, there can be a discrepancy
   * between the angle of the wheel that the user sees and `#angle`, which
   * stores the rounded angle. To get the angle the user sees, use `#getAngle`.
   */
  #snap() {
    this.#elem.style.transition = "transform 0.5s";
    this.#setAngle(roundAngle(this.#angle));
  }
}

/**
 * The left wheel.
 * @type {Wheel}
 */
const leftWheel = new Wheel(
  document.getElementById("left-wheel-img"),
  document.getElementById("left-birthday")
);
/**
 * The right wheel.
 * @type {Wheel}
 */
const rightWheel = new Wheel(
  document.getElementById("right-wheel-img"),
  document.getElementById("right-birthday"),
  180
);

// add all the necessary event listeners for the buttons
button.addEventListener("click", displayResults);

howTo.addEventListener("click", () => {
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
  const pairing-text = popup.querySelector("#pairing-text");
  pairing-text.innerHTML = textGenerator(left, right);

  /**
   * Displays the popup with the pairing information after a delay.
   */
  await wait(200);
  popup.parentElement.classList.add("open");
}
