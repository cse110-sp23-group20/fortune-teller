import { pick } from "../utils.js";
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

function reset() {
  resetButton.disabled = true;
  fallFortune();
  fallNewCookie();
  setTimeout(() => {
    fortunePaper.classList.remove("reveal");
    fortuneText.style.transform = null;
    elem = null;
    cookieFalling = false;
    fortuneButton.disabled = false;
    fortunePaper.style.transform = null;
    cookieButton.style.transform = null;
  }, 2000);
}

resetButton.addEventListener("click", reset);

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
  speech.addEventListener("end", () => {
    handleFortuneEnd();
  });
}

/**
 * Disables button so user cannot click it
 */
function disableButton() {
  fortuneButton.disabled = true;
}

/**
 * Enables button so user can click it
 */
function handleFortuneEnd() {
  resetButton.disabled = false;
  document.body.classList.remove("dramatic-mode");
  elem = null;
}

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
function fallFortune() {
  elem = fortunePaper;
  x = 0;
  y = 0;
  xv = 0;
  yv = -0.4;
  rot = 0;
  rotv = -0.05;
}
function fallNewCookie() {
  cookieWrapper.classList.remove("cracked");
  cookieLeft.style.transform = null;
  cookieButton.style.transform = null;
  cookieY = -innerHeight / 2 - 300;
  cookieYV = 0;
  cookieFalling = true;
}

/**
 * When the user clicks the button, disables it so they cannot click the button
 * in quick succession and cause audio issues
 */
document.body.addEventListener("click", function (event) {
  if (event.target.closest(".fortune-button")) {
    if (fortuneButton.disabled) {
      return;
    }
    document.body.classList.add("dramatic-mode");
    disableButton();
    // setTimeout(showFortune, 1000);
    setTimeout(() => {
      fortuneAudioCrack.currentTime = 0;
      fortuneAudioCrack.play();
      fortuneAudioCrack.ontimeupdate = () => {
        if (fortuneAudioCrack.currentTime > 0.3) {
          // Only make the cookie break when the audio is actually crunching
          // (this takes into account audio loading time)
          fortuneAudioCrack.ontimeupdate = null;
          cookieWrapper.classList.add("cracked");
          fortuneText.textContent = getRandomFortune();
          fallLeft();

          setTimeout(() => {
            fortunePaper.classList.add("pull-out");

            fortunePaper.onanimationend = () => {
              fortunePaper.onanimationend = null;
              fortunePaper.classList.remove("pull-out");
              fortunePaper.classList.add("reveal");

              if (voiceSelect.value !== "none") {
                speakFortune(fortuneText.textContent);
              } else {
                setTimeout(handleFortuneEnd, 1000);
              }
            };

            setTimeout(() => {
              cookieLeft.style.display = null;
              fallRight();
            }, 1500);
          }, 1000);
        }
      };
    }, 800);
  }
});

/** in px/ms^2 */
const GRAVITY = 0.002;
let elem, x, y, xv, yv, rot, rotv;
const shakeV = -0.02;
let shakeIntensity;
let cookieY, cookieYV;
let cookieFalling = false;

let lastTime = Date.now();
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
 * Added options for different voices using voice synthesis
 */
const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");
let voices = [];

/**
 * Speech synthesis API
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
