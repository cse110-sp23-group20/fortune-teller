import { wait } from "../utils.js";
import { handleFortune } from "./script.js";

/**
 * The wrapper element that holds all the element anchored around the middle of
 * the screen, where the circle with the webcam video is.
 * @type {HTMLDivElement}
 */
const webcamWrapper = document.getElementById("webcam-wrapper");
/**
 * The currently displayed `.instructions` element.
 * @type {HTMLParagraphElement | null}
 */
let lastInstructionElem = null;
/**
 * Sets the message that appears under the webcam while it is analyzing the
 * palm. There will be a fade transition between the previous and new
 * instruction message.
 *
 * @param {string} instruction - The message to display. If an empty string,
 * it'll hide the instructions.
 */
function setInstructions(instruction) {
  if (lastInstructionElem) {
    lastInstructionElem.addEventListener("animationend", (e) => {
      e.currentTarget.remove();
    });
    lastInstructionElem.classList.remove("instructions-active");
  }
  if (instruction) {
    lastInstructionElem = Object.assign(document.createElement("p"), {
      textContent: instruction,
      className: "instructions instructions-active",
    });
    webcamWrapper.append(lastInstructionElem);
  } else {
    lastInstructionElem = null;
  }
}

/**
 * The `<video>` element that previews whatever is on the webcam.
 * @type {HTMLVideoElement}
 */
const video = document.getElementById("webcam-video");
/**
 * The button that requests for camera access.
 * @type {HTMLButtonElement}
 */
const requestBtn = document.getElementById("request-webcam");
/**
 * The heartbeat graph.
 * @type {SVGSVGElement}
 */
const ecgGraph = document.getElementById("ecg");
/**
 * A `<canvas>` that stores a snapshot of the webcam video.
 * @type {HTMLCanvasElement}
 */
const result = document.getElementById("result-palm");
/**
 * The `CanvasRenderingContext2D` for `result`.
 * @type {CanvasRenderingContext2D}
 */
const context = result.getContext("2d");
/**
 * The button for resetting the app and reading another hand.
 * @type {HTMLButtonElement}
 */
const readAnother = document.getElementById("read-another-hand");
/**
 * Whether the camera should be horizontally flipped (for front-facing cameras).
 * @type {boolean}
 */
let flipCamera = true;
/**
 * Handler for the "Begin" button that requests for camera access and turns on
 * the webcam.
 */
async function startCamera() {
  document.body.classList.remove("show-results");
  requestBtn.parentNode.style.display = "none";
  readAnother.style.display = "none";
  flipCamera = true;
  video.classList.add("flip");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    video.srcObject = stream;
    const track = stream.getTracks()[0];
    // Firefox does not support getCapabilities
    if ("getCapabilities" in track) {
      const { facingMode } = track.getCapabilities();
      if (facingMode.includes("environment")) {
        video.classList.remove("flip");
        flipCamera = false;
      }
    }
  } catch (error) {
    requestBtn.parentNode.style.display = null;
  }
}
requestBtn.addEventListener("click", startCamera);
video.addEventListener("loadedmetadata", async () => {
  video.play();
  video.classList.add("video-on");
  ecgGraph.classList.add("ecg-active");
  ecgHistory.splice(0, ecgHistory.length);

  await wait(500);
  setInstructions("Please hold your hand over your camera.");
  await wait(2500);
  frameId = 0;
  paintEcg();
  setInstructions("Heartbeat detected.");
  await wait(3000);
  setInstructions("Keep your hand steady.");
  await wait(4000);
  video.pause();
  const size = Math.min(video.videoWidth, video.videoHeight);
  result.width = size;
  result.height = size;
  if (flipCamera) {
    context.translate(size, 0);
    context.scale(-1, 1);
  }
  if (video.videoWidth > video.videoHeight) {
    context.drawImage(video, -(video.videoWidth - video.videoHeight) / 2, 0);
  } else {
    context.drawImage(video, 0, -(video.videoHeight - video.videoWidth) / 2);
  }
  video.srcObject.getTracks()[0].stop();
  window.cancelAnimationFrame(frameId);
  frameId = null;
  video.classList.remove("video-on");
  ecgGraph.classList.remove("ecg-active");
  setInstructions("");
  readAnother.style.display = "block";
  handleFortune();
  document.body.classList.add("show-results");
});
readAnother.addEventListener("click", startCamera);

/**
 * Some points on an image of an ECG graph I found on Google Images that I
 * manually marked out in MS Paint. Used to form the piecewise linear `ecg`
 * polyline.
 * @type {[number, number][]}
 */
const ecgPoints = [
  [-0.8, 0.2],
  [0.4, 1.2],
  [1.5, 0.2],
  [4.8, 0.2],
  [5.1, -0.8],
  [6.2, 13.9],
  [7.4, -4],
  [7.8, 0.2],
  [10, 0.8],
  [12, 4],
  [13, 4],
  [15, 0.5],
  [16.8, 1.1],
  [18, 0.2],
];
/**
 * Horizontal shift factor to be added to each point in `ecgPoints`. This is
 * because the image I got wasn't centered at the origin.
 * @type {number}
 */
const XSHIFT = 0.8;
/**
 * Vertical shift factor to be added to each point in `ecgPoints`.
 * @type {number}
 */
const YSHIFT = -0.2;
/**
 * The period of the heartbeat shape, in whatever units `ecgPoints` is in.
 * Increase to increase the spacing between heartbeats, but it's mostly a
 * guessing game.
 */
const PERIOD = 30;
/**
 * A periodic, piecewiese linear function that draws out the shape of an ECG.
 * The units used in this function are kind of weird, so some guesswork is
 * required to shape it into a nice-looking form for the heartbeat graph.
 *
 * @param {number} time - The x-value of the ECG graph.
 * @returns {number} The resulting y-value of the graph.
 */
function ecg(time) {
  time = time % PERIOD;
  const index = ecgPoints.findIndex(([x]) => x + XSHIFT > time);
  if (index === -1) {
    return 0;
  }
  const [left, right] = ecgPoints.slice(index - 1, index + 1);
  return (
    ((time - XSHIFT - left[0]) * (right[1] - left[1])) / (right[0] - left[0]) +
    left[1] +
    YSHIFT
  );
}

/**
 * The number of SVG units in width of the fake heartbeat graph.
 * @type {number}
 */
const ECG_LENGTH = 300;
/**
 * The FPS of the animation. `paintEcg` will try to keep the animation at this
 * rate, for displays that have slower or faster refresh rates.
 * @type {number}
 */
const FPS = 60;
/**
 * The `<path>` element that draws the ECG graph.
 * @type {SVGPathElement}
 */
const ecgPath = document.getElementById("ecg-path");
/**
 * A queue of points (new elements added to the beginning) representing the ECG
 * graph. Kept to a maximum of `ECG_LENGTH` items.
 * @type {number[]}
 */
const ecgHistory = [];
/**
 * Tracks how much time has been "simulated" by `paintEcg`. This is used for
 * refresh rate independence. For example, if there was a lag spike and real
 * time passes more than usual by the next animation frame, then `paintEcg`
 * might simulate two simulation "frames" in the same animation frame so the
 * animation doesn't slow down.
 * @type {number}
 */
let simTime = 0;
/**
 * The time when animation and simulation started.
 * @type {number}
 */
let startTime = Date.now();
/**
 * The ID returned by `window.requestAnimationFrame`, used to cancel it or
 * determine whether it is animating. `null` if `paintEcg` is not animating.
 * @type {number | null}
 */
let frameId = null;
/**
 * Draws the next frame of the fake heartbeat ECG graph animation. Once
 * `frameId` is set to `null`, the animation stops.
 *
 * This should be display refresh rate independent.
 */
function paintEcg() {
  if (frameId === null) {
    return;
  }
  // Correct for different monitor refresh rates
  const now = Date.now();
  const realTime = now - startTime;
  if (realTime - simTime > 500) {
    // If too much time passed
    simTime = 0;
    startTime = now;
  } else {
    while (simTime < realTime) {
      ecgHistory.unshift(
        -ecg(now / 30) * (Math.random() * 1 + 2.5) +
          15 +
          (Math.random() - 0.5) * 2
      );
      while (ecgHistory.length > ECG_LENGTH) {
        ecgHistory.pop();
      }
      ecgPath.setAttributeNS(
        null,
        "d",
        "M" + ecgHistory.map((pt, i) => `${i + 1} ${pt}`).join("L")
      );
      simTime += 1000 / FPS;
    }
  }
  frameId = window.requestAnimationFrame(paintEcg);
}
