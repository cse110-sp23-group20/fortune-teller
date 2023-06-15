import { heads, hearts, lifes, fates, suns } from "./fortunes.js";

/**
 * Generates random fortunes. Called when the app finishes analyzing the palm.
 */
export function handleFortune() {
  let headIndex = Math.floor(Math.random() * heads.length);
  let heartIndex = Math.floor(Math.random() * hearts.length);
  let lifeIndex = Math.floor(Math.random() * lifes.length);
  let fateIndex = Math.floor(Math.random() * fates.length);
  let sunIndex = Math.floor(Math.random() * suns.length);

  let headResult = heads[headIndex];
  let heartResult = hearts[heartIndex];
  let lifeResult = lifes[lifeIndex];
  let fateResult = fates[fateIndex];
  let sunResult = suns[sunIndex];

  document.getElementById("head-tab").querySelector("p").innerText = headResult;
  document.getElementById("heart-tab").querySelector("p").innerText =
    heartResult;
  document.getElementById("life-tab").querySelector("p").innerText = lifeResult;
  document.getElementById("fate-tab").querySelector("p").innerText = fateResult;
  document.getElementById("sun-tab").querySelector("p").innerText = sunResult;
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
