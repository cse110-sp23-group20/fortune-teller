const fortunes = [
  "Your future is bright, embrace it with open arms.",
  "A wonderful surprise is coming your way.",
  "Believe in yourself and you will achieve great things.",
  "Your kindness will lead to good fortune.",
  "The journey may be difficult, but the destination is worth it.",
  "Your talents will soon be recognized and rewarded.",
  "Don't be afraid to take a chance, it may lead to great things.",
  "Your hard work and perseverance will pay off in the end.",
  "Keep an open mind and you will find new opportunities.",
  "Your positivity and optimism will bring you success.",
  "You will soon experience a life-changing event.",
  "Your creativity and imagination will bring you great success.",
  "The best things in life are yet to come.",
  "You will soon receive unexpected blessings.",
  "A new friendship will bring you great happiness.",
  "Your future is full of endless possibilities.",
  "Good things come to those who work hard and never give up.",
  "Let go of the past and embrace a bright future.",
  "Your perseverance will lead to victory.",
  "Your ability to adapt to change will bring you great success.",
  "Your determination and hard work will pay off in the long run.",
  "The journey may be tough, but the reward will be worth it.",
  "Trust in your intuition and you will make the right decisions.",
  "A new opportunity is on the horizon, seize it.",
  "Your courage and confidence will bring you great success.",
  "Your future is filled with abundance and prosperity.",
  "Your greatest treasure is the love and support of those around you.",
  "Your creativity will bring you great success in all areas of life.",
  "Embrace change and you will find success and happiness.",
  "Your positive attitude will bring you good luck and fortune."
];

const fortuneButton = document.getElementById("fortune-button");
const fortuneText = document.getElementById("fortune-text");
const fortuneAudioCrack = document.getElementById("fortune-crack");
const voiceToggle = document.getElementById("voice-toggle-checkbox");


// Gets a random fortune and displays it
function showFortune() {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[randomIndex];
  fortuneText.textContent = fortune;
  fortuneText.style.display = "block";
  if (voiceToggle.checked) {
    speakFortune(fortune);
  }
}

// Uses speech synthesis to read out fortune
function speakFortune(fortune) {
  const speech = new SpeechSynthesisUtterance(fortune);
  speech.lang = "en-US";
  speech.rate = 0.8;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
}

// When button is clicked, audio plays and then fortune is read/displayed
fortuneButton.addEventListener("click", function() {
  // fortuneText.style.display = "none";
  // fortuneAudio.currentTime = 0;
  fortuneAudioCrack.play();
  fortuneButton.disabled = true;
  fortuneButton.style.opacity = "0.5";
  setTimeout(showFortune, 1000);
  setTimeout(() => {
      fortuneButton.disabled = false;
      fortuneButton.style.opacity = "1";
  }, 5000);
});
