function init() {
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
}

document.addEventListener("DOMContentLoaded", init);
