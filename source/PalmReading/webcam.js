/**
 * The `<video>` element that previews whatever is on the webcam.
 * @type {HTMLVideoElement}
 */
const video = document.getElementById("webcam-video");
const requestBtn = document.getElementById("request-webcam");
const instructions = document.getElementById("instructions");
requestBtn.addEventListener("click", async () => {
  try {
    requestBtn.parentNode.style.display = "none";
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch {
    requestBtn.parentNode.style.display = null;
  }
});
video.addEventListener("loadedmetadata", () => {
  video.play();
  video.classList.add("video-on");
  instructions.style.display = "block";
});

/**
 * The `<canvas>` element that captures whatever was on the webcam when you press "Read your hand".
 * @type {HTMLVideoElement}
 */
const result = document.getElementById("result");
const context = result.getContext("2d");
const readHandBtn = document.getElementById("read-your-hand");
readHandBtn.addEventListener("click", () => {
  result.width = video.videoWidth;
  result.height = video.videoHeight;
  context.drawImage(video, 0, 0);
});

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
  [12, 4.8],
  [13, 4.8],
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
function paintEcg() {
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
        -ecg(now / 30) * (Math.random() * 1 + 2.5) + 15 + (Math.random() - 0.5)
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
  window.requestAnimationFrame(paintEcg);
}
paintEcg();
