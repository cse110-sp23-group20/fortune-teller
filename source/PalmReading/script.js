const fortune = document.getElementById("fortune-paragraph");
// etc

/**
 * Generates random fortunes. Called when the app finishes analyzing the palm.
 */
export function handleFortune() {
  console.log("TODO", fortune);
}

const tabLabels = document.querySelectorAll('input[name="tab"]');
const tabContents = document.querySelectorAll(".tab-content");

tabLabels.forEach(function (label) {
  label.addEventListener("change", function () {
    tabContents.forEach(function (content) {
      content.hidden = true;
    });

    const selectedContent = document.getElementById(`${this.value}-tab`);
    selectedContent.hidden = false;
  });
});
