/**
 * Array of general, college, and collage-romance type fortunes
 */
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
  "Your positive attitude will bring you good luck and fortune.",
  "Embrace the challenges that college brings, for they are the stepping stones to your future success.", // College
  "Your college journey is like a blank canvas. Paint it with knowledge, experiences, and friendships that will last a lifetime.",
  "In the halls of higher education, discover your true passions and let them guide you towards a fulfilling career.",
  "Success in college is not just about grades; it's about the wisdom gained from both victories and failures.",
  "The key to acing exams is not just studying hard but also finding the right balance between work and play.",
  "Embrace diversity in college, for it is through understanding others that you will broaden your own horizons.",
  "In college, you are the author of your own story. Make every chapter count and create a narrative that inspires others.",
  "Don't be afraid to step out of your comfort zone in college. Growth happens when you challenge yourself.",
  "Believe in your abilities, trust the process, and remember that you are capable of achieving great things in college and beyond.",
  "Every setback in college is an opportunity for growth. Keep pushing forward, and you will emerge stronger than ever.",
  "Success is not a destination but a journey. Enjoy the ride, make meaningful connections, and cherish every moment of your college years.",
  "Remember, the true value of education lies not just in the knowledge gained but in the person you become.",
  "Make the most of every networking opportunity in college. You never know where a connection can lead you.",
  "In the face of challenges, remember that perseverance and resilience are the keys to unlocking your full potential.",
  "College is the perfect time to explore your passions. Don't be afraid to pursue what truly sets your soul on fire.",
  "Stay curious, stay hungry for knowledge. College is your chance to quench your thirst for learning.",
  "Celebrate your achievements in college, big and small. They are the milestones that mark your personal growth.",
  "Don't compare your college journey to others'. Stay focused on your own goals and pave your unique path to success.",
  "Seek guidance when you need it, for mentors can offer invaluable wisdom that will shape your college experience.",
  "Trust yourself and your abilities. You have the power to turn your college dreams into a reality.",
  "Opportunities are like puzzle pieces; in college, you'll find the right ones to shape your future.",
  "The friendships you forge in college will be your lifelong treasures. Nurture them with care.",
  "In the realm of higher education, passion and dedication are the keys that unlock doors to boundless possibilities.",
  "Embrace the unknown in college, for it is in the unfamiliar that you'll discover your true potential.",
  "Remember, failure is not the end but a stepping stone on the path to greatness. Learn from it, rise above it.",
  "In the realm of college, seize every chance to expand your horizons, for knowledge knows no bounds.",
  "Your college experience is a mosaic of moments. Collect each one with gratitude and make a masterpiece.",
  "The pursuit of education is a marathon, not a sprint. Pace yourself, stay determined, and finish strong.",
  "In college, each class is a brushstroke, and your mind is the canvas. Paint a masterpiece of knowledge.",
  "The walls of a college campus hold countless stories. Leave your own mark and become a part of its legacy.",
  "Be fearless in pursuing your dreams in college. The world needs your unique talents and perspectives.",
  "Remember, in college, failure is not falling down; it's staying down. Rise each time with renewed determination.",
  "In college, challenges may test your limits, but they also reveal the strength and resilience within you.",
  "Every lecture is an opportunity to expand your mind. Pay attention, ask questions, and embrace the power of knowledge.",
  "Success in college is not solely measured by grades but by the growth and transformation you undergo along the way.",
  "Take time to nourish your mind, body, and soul in college. Self-care is essential for a balanced and fulfilling journey.",
  "As you navigate the college maze, trust your instincts and follow the path that aligns with your passions.",
  "In college, make connections that transcend the classroom. Forge bonds that will support and inspire you throughout your life.",
  "Every setback in college is an opportunity to learn, adapt, and come back stronger. Keep pushing forward!",
  "Remember, in college, you have the power to shape your own narrative. Write a story that reflects your true potential.",
  "Embrace diversity in college, for it enriches your understanding of the world and fosters compassion and empathy.",
  "As you climb the mountain of knowledge in college, enjoy the breathtaking view of the discoveries you make along the way.",
  "Celebrate the small victories in college. Each step forward, no matter how small, brings you closer to your goals.",
  "In college, seek mentors who inspire and challenge you. Their guidance can ignite the spark that propels you towards greatness.",
  "Let curiosity be your guiding light in college. Embrace the joy of learning and explore new realms of knowledge.",
  "College is a time of self-discovery. Embrace the journey of finding who you truly are and embrace your authentic self.",
  "Remember, in college, success is not a destination; it's a mindset. Embrace a growth mindset and watch your potential soar.",
  "In college, each essay is an opportunity to articulate your thoughts and ideas. Let your voice shine and make an impact.",
  "Dare to dream big in college. Your aspirations have the power to shape the world and leave a lasting legacy.",
  "As you embark on your college adventure, remember that every day is a chance to grow, learn, and redefine what's possible.",
  "Love may find you in the most unexpected places, even in the lecture hall or library. Keep your heart open.", // Romance
  "In the realm of college, sparks of attraction can ignite friendships that blossom into beautiful love stories.",
  "A study partner today may become a soulmate tomorrow. Let academic connections pave the way for lasting romance.",
  "Love is like a research project, requiring patience, dedication, and the willingness to explore new depths.",
  "In college, love knows no boundaries. Embrace the diversity of connections and let your heart guide you.",
  "A campus stroll hand-in-hand can lead to memories that will warm your heart long after graduation.",
  "Don't be afraid to let love distract you momentarily. Sometimes the best lessons are learned in the embrace of another.",
  "The late-night conversations shared with someone special can deepen your connection and create unforgettable bonds.",
  "In the whirlwind of college, love can be a guiding light, reminding you of the importance of both emotional and intellectual connections.",
  "Just as knowledge grows, so can love. Nurture it with care, and watch it blossom into something extraordinary.",
  "Remember, relationships in college are a delicate dance. Communicate, compromise, and cherish the magic of love.",
  "The chemistry you share with someone special can be more electrifying than any scientific experiment.",
  "In the realm of college romance, take risks, be vulnerable, and discover the magic of love's transformative power.",
  "As you explore your passions in college, you may find that love is the most captivating subject of all.",
  "Cherish the stolen moments with your college sweetheart, for they will become precious memories that last a lifetime.",
  "Love is the ultimate inspiration. Let the love you find in college ignite your creativity and fuel your dreams.",
  "In the sea of possibilities, love can be the anchor that grounds you and gives your college journey meaning.",
  "True love sees no boundaries. Embrace cultural diversity in college and let love bridge the gaps.",
  "The late-night study sessions can turn into whispers of love, as the line between friendship and romance blurs.",
  "In college, love may be a detour from your original plans, but it can lead to a destination more beautiful than you ever imagined.",
  "The right person can be your biggest cheerleader in college, supporting you in both your academic and personal pursuits.",
  "Love is a dance, and college is the perfect stage to find a partner who moves to the rhythm of your heart.",
  "A love letter written on a textbook page can hold more magic than any words penned in a fairy tale.",
  "In college, love can be a refuge in the storm. Find solace in the arms of someone who understands your journey.",
  "A smile from someone special can brighten even the gloomiest of college days. Let love be your sunshine.",
  "Love has a way of finding you when you least expect it. Stay open-hearted, and let destiny work its magic.",
  "In the journey of love, don't be afraid to rewrite the script. Create a love story in college that is uniquely yours.",
  "The echoes of laughter shared with a loved one in college will reverberate in your heart for a lifetime.",
  "Love can be a sanctuary in the whirlwind of college life. Find comfort and strength in the arms of your beloved.",
  "In the hustle and bustle of college, love can be a calming melody that brings peace to your soul.",
  "The path to love in college may not always be smooth, but with patience and understanding, it can lead to a love story for the ages.",
  "The campus may be vast, but love has a way of bringing two hearts together, no matter the distance.",
  "In college, love is an adventure waiting to unfold. Embrace the journey and let your heart guide you to incredible destinations.",
  "The love you find in college can shape not only your present but also your future. Choose your love wisely, for it can inspire you to greatness.",
];

let previousFortune = "";
const fortuneButton = document.getElementById("fortune-button");
const fortuneText = document.getElementById("fortune-text");
const fortuneAudioCrack = document.getElementById("fortune-crack");
const voiceToggle = document.getElementById("voice-toggle-checkbox");

/**
 * This function will get a random fortune from the fortune array and make sure it does not match the previous one
 * @returns {string} a random fortune
 */
function getRandomFortune() {
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let fortune = fortunes[randomIndex];

  // Generate a new random fortune if it matches the previous fortune
  while (fortune === previousFortune) {
    randomIndex = Math.floor(Math.random() * fortunes.length);
    fortune = fortunes[randomIndex];
  }

  previousFortune = fortune;
  return fortune;
}

/**
 * Displays the fortune and if voice toggle is checked, reads out the fortune
 */
function showFortune() {
  const fortune = getRandomFortune();
  fortuneText.textContent = fortune;
  fortuneText.style.display = "block";
  if (voiceToggle.checked) {
    speakFortune(fortune);
  } else {
    setTimeout(enableButton, 1000);
  }
}

/**
 * Reads out the fortune using speech synthesis
 * @param {string} fortune What the fortune to be read out is
 */
function speakFortune(fortune) {
  const speech = new SpeechSynthesisUtterance(fortune);
  const option = voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name == option) speech.voice = voices[i];
  }
  speech.lang = "en-US";
  speech.rate = 0.8;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);

  // Reenable button when fortune is done being read
  speech.addEventListener("end", () => {
    enableButton();
  });
}

/**
 * Disables button so user cannot click it
 */
function disableButton() {
  fortuneButton.disabled = true;
  fortuneButton.style.opacity = "0.5";
}

/**
 * Enables button so user can click it
 */
function enableButton() {
  fortuneButton.disabled = false;
  fortuneButton.style.opacity = "1";
}

/**
 * When the user clicks the button, disables it so they cannot click the button 
 * in quick succession and cause audio issues
 */
fortuneButton.addEventListener("click", function () {
  fortuneAudioCrack.play();
  disableButton();
  setTimeout(showFortune, 1000);
});

/**
 * Added options for different voices using voice synthesis
 */
const synth = window.speechSynthesis;

// const inputForm = document.querySelector("form");
// const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");
// const pitch = document.querySelector("#pitch");
// const pitchValue = document.querySelector(".pitch-value");
// const rate = document.querySelector("#rate");
// const rateValue = document.querySelector(".rate-value");

let voices = [];

/**
 * Speech synthesis API
 */
function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}