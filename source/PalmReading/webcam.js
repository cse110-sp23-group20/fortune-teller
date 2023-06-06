const webcamWrapper = document.getElementById("webcam-wrapper");
/**
 * The currently displayed `.instructions` element.
 * @type {HTMLParagraphElement | null}
 */
let lastInstructionElem = null;
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
const requestBtn = document.getElementById("request-webcam");
const ecgGraph = document.getElementById("ecg");
const result = document.getElementById("result-palm");
const context = result.getContext("2d");
const readAnother = document.getElementById("read-another-hand");
let flipCamera = true;
async function startCamera() {
  document.body.classList.remove("show-results");
  requestBtn.parentNode.style.display = "none";
  readAnother.style.display = "none";
  flipCamera = true;
  video.classList.add("flip");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    const { facingMode } = stream.getTracks()[0].getCapabilities();
    if (facingMode.includes("environment")) {
      video.classList.remove("flip");
      flipCamera = false;
    }
  } catch {
    requestBtn.parentNode.style.display = null;
  }
}
requestBtn.addEventListener("click", startCamera);
video.addEventListener("loadedmetadata", () => {
  video.play();
  video.classList.add("video-on");
  ecgGraph.classList.add("ecg-active");
  ecgHistory.splice(0, ecgHistory.length);

  setTimeout(() => {
    setInstructions("Please hold your hand over your camera.");
  }, 500);
  setTimeout(() => {
    frameId = 0;
    paintEcg();
    setInstructions("Heartbeat detected.");
  }, 3000);
  setTimeout(() => {
    paintEcg();
    setInstructions("Keep your hand steady.");
  }, 6000);
  setTimeout(() => {
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
    document.body.classList.add("show-results");
  }, 10000);
});
readAnother.addEventListener("click", startCamera);

// 20 units is about 0.6s, so 1 s = 33ish units
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
const XSHIFT = 0.8;
const YSHIFT = -0.2;
const PERIOD = 30;
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

const ECG_LENGTH = 300;
const FPS = 60;
const ecgPath = document.getElementById("ecg-path");
const ecgHistory = [];
let simTime = 0;
let startTime = Date.now();
let frameId = null;
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
