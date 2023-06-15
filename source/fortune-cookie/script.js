import { pick, timeoutId, wait } from "../utils.js";
import { fortunes } from "./fortunes.js";

let previousFortune = "";
const fortuneButton = document.getElementById("fortune-button");
const fortunePaper = document.getElementById("fortune-paper");
const fortuneText = document.getElementById("fortune-text");
const fortuneAudioCrack = document.getElementById("fortune-crack");
const cookieWrapper = document.getElementById("cookie-wrapper");
const cookieButton = document.getElementById("cookie-button");
const cookieLeft = document.getElementById("fortune-image-left");
const background = document.getElementById("background");
const resetButton = document.getElementById("reset-button");
const cancelButton = document.getElementById("cancel-animation-btn");

/**
 * Stops the current animation and resets all animatable parts of the app to the
 * specified view (`state`).
 * @param {'fortune' | 'cookie'} state - Whether to set the view to showing the
 * fortune (`'fortune'`) or the cookie (`'cookie'`).
 */
function reset(state) {
  clearTimeout(timeoutId);
  fortuneAudioCrack.ontimeupdate = null;
  fortunePaper.onanimationend = null;
  fortuneAudioCrack.pause();
  window.speechSynthesis.cancel();
  fortunePaper.classList.remove("pull-out");
  document.body.classList.remove("dramatic-mode");
  cancelButton.parentElement.classList.remove("animating");
  cookieWrapper.classList.remove("cracked");
  fortuneText.style.transform = null;
  elem = null;
  cookieFalling = false;
  fortunePaper.style.transform = null;
  cookieButton.style.transform = null;
  cookieLeft.style.transform = null;
  if (state === "fortune") {
    fortunePaper.classList.add("reveal");
    cookieButton.classList.add("hide-cookie");
    resetButton.disabled = false;
    fortuneButton.disabled = true;
    cookieButton.disabled = true;
  } else if (state === "cookie") {
    fortunePaper.classList.remove("reveal");
    cookieButton.classList.remove("hide-cookie");
    resetButton.disabled = true;
    fortuneButton.disabled = false;
    cookieButton.disabled = false;
  }
}

resetButton.addEventListener("click", () => {
  if (prefersReducedMotion()) {
    reset("cookie");
    return;
  }
  resetButton.disabled = true;
  cookieButton.classList.remove("hide-cookie");
  cancelButton.parentElement.classList.add("animating");
  cancelButton.parentElement.classList.add("animating-new-cookie");
  fallFortune();
  fallNewCookie();
  wait(2000).then(handleCookieReady);
});

/**
 * This function will get a random fortune from the fortune array and make sure it does not match the previous one
 * @returns {string} a random fortune
 */
function getRandomFortune() {
  let fortune = pick(fortunes);

  // Generate a new random fortune if it matches the previous fortune
  while (fortune === previousFortune) {
    fortune = pick(fortunes);
  }

  previousFortune = fortune;
  return fortune;
}

/**
 * Reads out the fortune using speech synthesis
 * @param {string} fortune What the fortune to be read out is
 */
function speakFortune(fortune) {
  const speech = new SpeechSynthesisUtterance(fortune);
  speech.voice = voices[voiceSelect.value];
  speech.lang = "en-US";
  speech.rate = 0.8;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);

  // Reenable button when fortune is done being read
  speech.addEventListener("end", handleFortuneEnd);
}

/**
 * Disables button so user cannot click it
 */
function disableButton() {
  fortuneButton.disabled = true;
  cookieButton.disabled = true;
}

/**
 * A handler called whenever the animation for opening the fortune cookie ends.
 */
function handleFortuneEnd() {
  reset("fortune");
}

/**
 * A handler called whenever the animation for dropping a new fortune cookie
 * ends.
 */
function handleCookieReady() {
  reset("cookie");
}

/**
 * Sets the animation to make the left half of the cookie fall.
 */
function fallLeft() {
  elem = cookieLeft;
  x = 0;
  y = 0;
  xv = -0.25;
  yv = -0.4;
  rot = 0;
  rotv = -0.05;
  shakeIntensity = 10;
}
/**
 * Sets the animation to make the right half of the cookie fall.
 */
function fallRight() {
  elem = cookieButton;
  x = 0;
  y = 0;
  xv = 0.25;
  yv = 0;
  rot = 0;
  rotv = 0.05;
  shakeIntensity = 0;
}
/**
 * Sets the animation to make the fortune paper fall.
 */
function fallFortune() {
  elem = fortunePaper;
  x = 0;
  y = 0;
  xv = 0;
  yv = -0.4;
  rot = 0;
  rotv = -0.05;
}
/**
 * Sets the animation to make a new, full fortune cookie fall.
 */
function fallNewCookie() {
  cookieLeft.style.transform = null;
  cookieButton.style.transform = null;
  cookieY = -innerHeight / 2 - 300;
  cookieYV = 0;
  cookieFalling = true;
}

/**
 * Determines whether the user has `prefers-reduced-motion` enabled.
 * @returns {boolean} Whether to reduce motion.
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * When the user clicks the button, disables it so they cannot click the button
 * in quick succession and cause audio issues
 */
document.body.addEventListener("click", async function (event) {
  if (event.target.closest(".fortune-button")) {
    if (fortuneButton.disabled) {
      return;
    }
    if (prefersReducedMotion()) {
      reset("fortune");
      return;
    }
    document.body.classList.add("dramatic-mode");
    cancelButton.parentElement.classList.add("animating");
    cancelButton.parentElement.classList.remove("animating-new-cookie");
    disableButton();

    await wait(800);

    fortuneAudioCrack.currentTime = 0;
    fortuneAudioCrack.play();
    // Only make the cookie break when the audio is actually crunching
    // (this takes into account audio loading time)
    await new Promise((resolve) => {
      fortuneAudioCrack.ontimeupdate = () => {
        if (fortuneAudioCrack.currentTime > 0.3) {
          fortuneAudioCrack.ontimeupdate = null;
          resolve();
        }
      };
    });

    cookieWrapper.classList.add("cracked");
    fortuneText.textContent = getRandomFortune();
    fallLeft();

    await wait(1000);

    fortunePaper.classList.add("pull-out");

    wait(1500).then(() => {
      cookieLeft.style.display = null;
      fallRight();
    });

    await new Promise((resolve) => {
      fortunePaper.onanimationend = () => {
        fortunePaper.onanimationend = null;
        resolve();
      };
    });

    fortunePaper.classList.remove("pull-out");
    fortunePaper.classList.add("reveal");

    if (voiceSelect.value !== "none") {
      speakFortune(fortuneText.textContent);
    } else {
      wait(1000).then(handleFortuneEnd);
    }
  }
});

cancelButton.addEventListener("click", () => {
  if (cancelButton.parentElement.classList.contains("animating-new-cookie")) {
    handleCookieReady();
  } else {
    handleFortuneEnd();
  }
});

/**
 * The acceleration due to "gravity" applied on all falling objects in the
 * animation, in px/ms^2.
 * @type {number}
 */
const GRAVITY = 0.002;
let elem, x, y, xv, yv, rot, rotv;
/**
 * The decrease in shake intensity, in px/ms.
 * @type {number}
 */
const shakeV = -0.02;
let shakeIntensity;
let cookieY, cookieYV;
/**
 * Whether to animate a new cookie falling.
 * @type {boolean}
 */
let cookieFalling = false;

/**
 * The timestamp of the last time `paint` was called.
 * @type {number}
 */
let lastTime = Date.now();
/**
 * Draws the next frame of the cookie falling animation.
 */
function paint() {
  const now = Date.now();
  const elapsed = Math.min(now - lastTime, 200);
  lastTime = now;

  yv += GRAVITY * elapsed;
  x += xv * elapsed;
  y += yv * elapsed;
  rot += rotv * elapsed;
  if (elem) {
    if (elem === fortunePaper) {
      elem.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) perspective(1000px) scale(0.5) translateZ(350px)`;
    } else {
      elem.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    }
  }

  shakeIntensity = Math.max(0, shakeIntensity + shakeV * elapsed);
  if (shakeIntensity > 0) {
    const shake = `translate(${(Math.random() * 2 - 1) * shakeIntensity}px, ${
      (Math.random() * 2 - 1) * shakeIntensity
    }px)`;
    cookieWrapper.parentElement.style.transform = shake;
    background.style.transform = shake;
  } else {
    cookieWrapper.parentElement.style.transform = null;
    background.style.transform = null;
  }

  if (cookieFalling) {
    cookieYV += GRAVITY * elapsed;
    if (cookieYV > 10) {
      cookieYV = 10;
    }
    cookieY += cookieYV * elapsed;
    // Bounce from floor
    if (cookieY > 0) {
      cookieY = 0;
      cookieYV *= -0.4;
    }
    cookieButton.style.transform = `translateY(${cookieY}px)`;
  }

  window.requestAnimationFrame(paint);
}
paint();

/**
 * A reference to `window.speechSynthesis`.
 * @type {SpeechSynthesis}
 */
const synth = window.speechSynthesis;
/**
 * The voice selection dropdown.
 * @type {HTMLSelectElement}
 */
const voiceSelect = document.querySelector("select");
/**
 * A list of voices available by the browser.
 * @type {SpeechSynthesisVoice[]}
 */
let voices = [];

/**
 * Speech synthesis API, adds options for different voices to read out fortune using voice synthesis
 */
function populateVoiceList() {
  voices = synth.getVoices();

  let defaultVoice = voices[0]?.lang ?? "none";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.value = i;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
      defaultVoice = i;
    }

    voiceSelect.appendChild(option);
  }

  voiceSelect.value = defaultVoice;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
