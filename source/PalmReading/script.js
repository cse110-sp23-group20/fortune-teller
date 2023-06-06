window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  document
    .getElementById("read-your-hand")
    ?.addEventListener("click", showResults);
  document
    .getElementById("read-another-hand")
    ?.addEventListener("click", readHand);
}

function showResults() {
  document.getElementById("camera-frame").hidden = true;
  document.getElementById("results-frame").hidden = false;
}

function readHand() {
  document.getElementById("results-frame").hidden = true;
  document.getElementById("camera-frame").hidden = false;
}
