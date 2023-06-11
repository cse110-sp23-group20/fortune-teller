const fortune = document.getElementById("fortune-paragraph");
// etc

/**
 * Generates random fortunes. Called when the app finishes analyzing the palm.
 */
export function handleFortune() {
  console.log("TODO", fortune);
}

/**
 * The tabs' `<input type=radio>` elements.
 * @type {ArrayLike<HTMLInputElement>}
 */
const tabLabels = document.querySelectorAll('input[name="tab"]');
/**
 * Each tabs' tab content.
 * @type {ArrayLike<HTMLDivElement>}
 */
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
