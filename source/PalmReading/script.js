const fortune = document.getElementById("fortune-paragraph");
// etc

const heads = [
  "Long and straight head line: You possess a logical and analytical mind. You excel in problem-solving and have a practical approach to life.",
  "Short head line: You tend to be impulsive and prefer to make decisions based on intuition rather than careful analysis. You may have a quick wit and enjoy spontaneous experiences.",
  "Curved head line: Your thoughts and actions are influenced by emotions and creativity. You have a vivid imagination and may excel in artistic or intuitive pursuits.",
  "Forked head line: This indicates a dual nature and the ability to see multiple perspectives. You may possess strong decision-making skills and adaptability in different situations.",
  "Chained head line: You tend to overthink and have a restless mind. You may struggle with concentration and easily get distracted, but you also have the ability to multitask effectively.",
  "Broken head line: This suggests a period of significant change or trauma in your life that has had an impact on your thoughts and mental clarity. You may have experienced setbacks but have the resilience to overcome them.",
  "Wavy head line: Your thoughts and mental processes are influenced by fluctuating moods and emotions. You may have a creative and imaginative mind but can also be prone to mood swings.",
  "Absent head line: A missing head line indicates a highly intuitive and unconventional thinker. You rely more on instincts and emotions rather than logic and analysis.",
  "Deep and well-defined head line: You possess strong mental focus and concentration. You have the ability to think deeply about complex matters and make well-informed decisions.",
  "Faint or unclear head line: This may indicate a lack of clarity in your thoughts and difficulty in making decisions. You may benefit from cultivating a more focused and organized mindset."
];

const hearts = [
  "Long and curved heart line: You are emotionally expressive and have a deep capacity for love and affection. You value meaningful connections and are often guided by your heart in matters of love and relationships.",
  "Short and straight heart line: You have a practical approach to love and relationships. You may prioritize stability and security over intense emotional experiences.",
  "Broken heart line: This suggests emotional upheavals or significant heartbreak in your life. It could indicate periods of emotional vulnerability or challenges in finding lasting love.",
  "Forked heart line: You have a strong romantic nature and may experience multiple significant relationships or love interests throughout your life. This can indicate a propensity for passionate connections or indecisiveness in matters of the heart.",
  "Upwardly curved heart line: You are optimistic and enthusiastic in matters of love. You tend to be passionate and may have a tendency to idealize your romantic partners.",
  "Downwardly curved heart line: You are more reserved and cautious when it comes to matters of the heart. You may take your time in developing deep emotional connections and prefer stability and practicality in relationships.",
  "Wavy heart line: Your emotions fluctuate, and you may experience highs and lows in your relationships. You have a sensitive and empathetic nature, which can make you more susceptible to emotional turbulence.",
  "Absent heart line: A missing heart line can indicate difficulty in expressing or understanding emotions. You may struggle with forming deep emotional connections or have a more logical approach to relationships.",
  "Deep and well-defined heart line: You have a strong emotional intelligence and are deeply in touch with your feelings. You have the capacity for profound love and may be highly empathetic and nurturing in relationships.",
  "Faint or unclear heart line: This may suggest challenges in understanding or expressing emotions. You may need to work on developing greater emotional awareness and communication skills in relationships."
];

const lifes = [
  "Long and deep life line: You possess a strong vitality and have the potential for a long and healthy life. You have a resilient nature and the ability to bounce back from challenges.",
  "Short life line: This may indicate a tendency to live life to the fullest and take risks. You may have a sense of urgency and a desire to make the most of every moment.",
  "Curved life line: Your life path is influenced by your emotional and creative nature. You may experience ups and downs but have the ability to adapt and find fulfillment in various aspects of life.",
  "Broken life line: This suggests significant life changes or disruptions that have had an impact on your overall well-being. It could indicate major transitions or shifts in your life path.",
  "Chained life line: You have a tendency to worry and overthink, which can impact your overall sense of well-being. It is important for you to find ways to manage stress and maintain a balanced lifestyle.",
  "Faint or unclear life line: This may indicate a sense of uncertainty or lack of direction in your life. It is important for you to explore your passions and align your actions with your purpose.",
  "Deep and well-defined life line: You have a strong sense of purpose and a solid foundation in life. You have the ability to overcome obstacles and make the most of opportunities that come your way.",
  "Absent life line: A missing life line is rare but can indicate a unique life path or a sense of detachment from traditional norms. You may forge your own path and have a non-conventional approach to life.",
  "Multiple life lines: This suggests a multifaceted personality and the ability to pursue different paths simultaneously. You may have diverse interests and talents that allow you to thrive in various areas of life.",
  "Overlapping life lines: Overlapping life lines can indicate complex relationships or intertwining paths with significant others. It may signify strong connections or dependencies on others throughout your life."
];

const fates = [
  "Straight and well-defined fate line: You have a clear sense of purpose and direction in life. You are likely to achieve success and recognition in your chosen career or path.",
  "Faint or unclear fate line: This may suggest a lack of clarity or uncertainty regarding your life's purpose or career path. It is important to explore different possibilities and seek clarity to align with your true calling.",
  "Forked fate line: This indicates multiple career paths or significant life choices. You have the ability to make choices that can lead to different outcomes, and your fate may be influenced by these decisions.",
  "Broken fate line: This suggests setbacks or major changes in your life that may impact your career or life path. However, you have the resilience to overcome challenges and adapt to new circumstances.",
  "Absent fate line: A missing fate line may indicate a more fluid and flexible approach to life. You may not be bound by a specific career path or have a strong sense of destiny. You are open to exploring different possibilities and taking opportunities as they come.",
  "Long and deep fate line: You have a strong sense of purpose and a clear life mission. You are likely to achieve significant success and recognition in your chosen field.",
  "Curved fate line: Your life path is influenced by your creative and intuitive nature. You may find success in artistic or unconventional fields and have a unique approach to your career or life's purpose.",
  "Multiple fate lines: This suggests diverse talents and interests. You may have the ability to pursue different paths simultaneously or have multiple successful careers in your lifetime.",
  "Crossed fate lines: Crossing fate lines can indicate significant life-changing events or major decisions that alter the course of your life. These events can shape your destiny and open new opportunities.",
  "Rising fate line: Your career or life path may experience gradual progress and growth over time. You have the potential to achieve greater success and reach new heights through consistent effort and perseverance."
];

const suns = [
  "Strong and well-defined sun line: You possess natural leadership qualities and have the potential for success and recognition in your chosen field. Your charisma and confidence can attract opportunities and positive attention.",
  "Faint or broken sun line: This may suggest a period of uncertainty or challenges in achieving your ambitions. It could indicate setbacks or obstacles that may require perseverance and adaptability to overcome.",
  "Multiple sun lines: Multiple sun lines indicate diverse talents and potential for success in different areas of life. You have the ability to excel in various fields or pursue multiple passions.",
  "Long and curved sun line: Your success and achievements are strongly influenced by your creativity and artistic abilities. You may find fulfillment and recognition in artistic or creative endeavors.",
  "Short or faint sun line: This may suggest a more introverted nature or a preference for a modest and private life. You may find satisfaction in personal achievements rather than seeking external recognition.",
  "Branching sun line: This indicates opportunities for growth and expansion in your career or personal life. You may have the ability to explore different paths or take on new challenges.",
  "Island or chain of islands on the sun line: This suggests periods of instability or obstacles that may hinder your progress. It is important to stay resilient and seek support during challenging times.",
  "Cross or intersecting lines on the sun line: This may indicate significant turning points or major decisions in your career or personal life. It is important to carefully consider your options and make choices that align with your long-term goals.",
  "Absent sun line: The absence of a sun line suggests a more subtle or understated path to success. You may find fulfillment in personal growth and inner achievements rather than external recognition.",
  "Rising sun line: A sun line that starts low on the palm and rises towards the mount of Apollo indicates increasing success and recognition as you progress in your career or life journey."
];

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
  document.getElementById("heart-tab").querySelector("p").innerText = heartResult;
  document.getElementById("life-tab").querySelector("p").innerText = lifeResult;
  document.getElementById("fate-tab").querySelector("p").innerText = fateResult;
  document.getElementById("sun-tab").querySelector("p").innerText = sunResult;
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
