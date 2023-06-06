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
      ecgHistory.unshift(Math.random() * 50 - 25);
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
