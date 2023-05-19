function init () {
  /**
   * The `<video>` element that previews whatever is on the webcam.
   * @type {HTMLVideoElement}
   */
  const video = document.getElementById('webcam-video')
  const requestBtn = document.getElementById('request-webcam')
  const instructions = document.getElementById('instructions')
  requestBtn.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    requestBtn.style.display = 'none'
  })
  video.addEventListener('loadedmetadata', () => {
    video.play()
    instructions.style.display = null
  })
}

document.addEventListener('DOMContentLoaded', init)
