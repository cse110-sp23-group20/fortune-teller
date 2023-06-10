import {
  roundAngle,
  getMappingLeft,
  getMappingRight,
  determineDateRangeLeft,
  determineDateRangeRight,
  determinePairing,
  textGenerator,
} from "../source/Zodiac_compatibility/zodiac-angles.js";

describe("roundAngle Tests", () => {
  test("should round positive angles correctly", () => {
    // Test cases for positive angles
    expect(roundAngle(0)).toBe(0);
    expect(roundAngle(30)).toBe(30);
    expect(roundAngle(45)).toBe(60);
    expect(roundAngle(75)).toBe(90);
    expect(roundAngle(105)).toBe(120);

    // Test cases for very large positive angles
    expect(roundAngle(400)).toBe(390);
    expect(roundAngle(430)).toBe(420);
    expect(roundAngle(800)).toBe(810);
  });

  test("should round negative angles correctly", () => {
    // Test cases for negative angles
    // the function will always round up if there is a tie
    expect(roundAngle(-30)).toBe(-30);
    expect(roundAngle(-45)).toBe(-30);
    expect(roundAngle(-75)).toBe(-60);
    expect(roundAngle(-105)).toBe(-90);

    // Test cases for very small negative angles
    expect(roundAngle(-400)).toBe(-390);
    expect(roundAngle(-430)).toBe(-420);
    expect(roundAngle(-800)).toBe(-810);
  });
});

describe("getMappingLeft Tests", () => {
  test("should return the corresponding zodiac sign for a positive rounded angle", () => {
    expect(getMappingLeft(0)).toBe("Capricorn");
    expect(getMappingLeft(30)).toBe("Sagittarius");
    expect(getMappingLeft(60)).toBe("Scorpio");
    expect(getMappingLeft(90)).toBe("Libra");
    expect(getMappingLeft(120)).toBe("Virgo");
    expect(getMappingLeft(150)).toBe("Leo");
    expect(getMappingLeft(180)).toBe("Cancer");
    expect(getMappingLeft(210)).toBe("Gemini");
    expect(getMappingLeft(240)).toBe("Taurus");
    expect(getMappingLeft(270)).toBe("Aries");
    expect(getMappingLeft(300)).toBe("Pisces");
    expect(getMappingLeft(330)).toBe("Aquarius");
    expect(getMappingLeft(360)).toBe("Capricorn");
  });
  test("should return the corresponding zodiac sign for a negative rounded angle", () => {
    expect(getMappingLeft(-30)).toBe("Aquarius");
    expect(getMappingLeft(-60)).toBe("Pisces");
    expect(getMappingLeft(-90)).toBe("Aries");
    expect(getMappingLeft(-120)).toBe("Taurus");
    expect(getMappingLeft(-150)).toBe("Gemini");
    expect(getMappingLeft(-180)).toBe("Cancer");
    expect(getMappingLeft(-210)).toBe("Leo");
    expect(getMappingLeft(-240)).toBe("Virgo");
    expect(getMappingLeft(-270)).toBe("Libra");
    expect(getMappingLeft(-300)).toBe("Scorpio");
    expect(getMappingLeft(-330)).toBe("Sagittarius");
    expect(getMappingLeft(-360)).toBe("Capricorn");
  });
  test('should return "unknown" for an unrounded angle', () => {
    expect(getMappingLeft(45)).toBe("unknown");
    expect(getMappingLeft(123)).toBe("unknown");
    expect(getMappingLeft(-15)).toBe("unknown");
    expect(getMappingLeft(361)).toBe("unknown");
  });
});

describe("getMappingRight", () => {
  test("should return the corresponding zodiac sign for a rounded positive angle", () => {
    expect(getMappingRight(0)).toBe("Cancer");
    expect(getMappingRight(30)).toBe("Gemini");
    expect(getMappingRight(60)).toBe("Taurus");
    expect(getMappingRight(90)).toBe("Aries");
    expect(getMappingRight(120)).toBe("Pisces");
    expect(getMappingRight(150)).toBe("Aquarius");
    expect(getMappingRight(180)).toBe("Capricorn");
    expect(getMappingRight(210)).toBe("Sagittarius");
    expect(getMappingRight(240)).toBe("Scorpio");
    expect(getMappingRight(270)).toBe("Libra");
    expect(getMappingRight(300)).toBe("Virgo");
    expect(getMappingRight(330)).toBe("Leo");
    expect(getMappingRight(360)).toBe("Cancer");
  });

  test("should return the corresponding zodiac sign for a rounded negative angle", () => {
    expect(getMappingRight(-30)).toBe("Leo");
    expect(getMappingRight(-60)).toBe("Virgo");
    expect(getMappingRight(-90)).toBe("Libra");
    expect(getMappingRight(-120)).toBe("Scorpio");
    expect(getMappingRight(-150)).toBe("Sagittarius");
    expect(getMappingRight(-180)).toBe("Capricorn");
    expect(getMappingRight(-210)).toBe("Aquarius");
    expect(getMappingRight(-240)).toBe("Pisces");
    expect(getMappingRight(-270)).toBe("Aries");
    expect(getMappingRight(-300)).toBe("Taurus");
    expect(getMappingRight(-330)).toBe("Gemini");
    expect(getMappingRight(-360)).toBe("Cancer");
  });

  test('should return "unknown" for an unknown angle', () => {
    expect(getMappingRight(45)).toBe("unknown");
    expect(getMappingRight(123)).toBe("unknown");
    expect(getMappingRight(-15)).toBe("unknown");
    expect(getMappingLeft(361)).toBe("unknown");
  });
});

describe("determineDateRangeLeft Tests", () => {
  test("should return the corresponding date range for the zodiac sign returned by determineDateRangeLeft", () => {
    expect(determineDateRangeLeft(0)).toBe("Dec 22 - Jan 19"); // Capricorn
    expect(determineDateRangeLeft(30)).toBe("Nov 22 - Dec 21"); // Sagittarius
    expect(determineDateRangeLeft(60)).toBe("Oct 23 - Nov 21"); // Scorpio
    expect(determineDateRangeLeft(90)).toBe("Sep 23 - Oct 22"); // Libra
    expect(determineDateRangeLeft(120)).toBe("Aug 23 - Sep 22"); // Virgo
    expect(determineDateRangeLeft(150)).toBe("Jul 23 - Aug 22"); // Leo
    expect(determineDateRangeLeft(180)).toBe("Jun 21 - Jul 22"); // Cancer
    expect(determineDateRangeLeft(210)).toBe("May 21 - Jun 20"); // Gemini
    expect(determineDateRangeLeft(240)).toBe("Apr 20 - May 20"); // Taurus
    expect(determineDateRangeLeft(270)).toBe("Mar 21 - Apr 19"); // Aries
    expect(determineDateRangeLeft(300)).toBe("Feb 19 - Mar 20"); // Pisces
    expect(determineDateRangeLeft(330)).toBe("Jan 20 - Feb 18"); // Aquarius
  });

  test('should return "unknown" for an unknown angle', () => {
    expect(determineDateRangeLeft(45)).toBe("unknown");
    expect(determineDateRangeLeft(123)).toBe("unknown");
    expect(determineDateRangeLeft(500)).toBe("unknown");
  });
});

describe("determineDateRangeRight Tests", () => {
  test("should return the corresponding date range for a known zodiac sign", () => {
    expect(determineDateRangeRight(0)).toBe("Jun 21 - Jul 22"); // Cancer
    expect(determineDateRangeRight(30)).toBe("May 21 - Jun 20"); // Gemini
    expect(determineDateRangeRight(60)).toBe("Apr 20 - May 20"); // Taurus
    expect(determineDateRangeRight(90)).toBe("Mar 21 - Apr 19"); // Aries
    expect(determineDateRangeRight(120)).toBe("Feb 19 - Mar 20"); // Pisces
    expect(determineDateRangeRight(150)).toBe("Jan 20 - Feb 18"); // Aquarius
    expect(determineDateRangeRight(180)).toBe("Dec 22 - Jan 19"); // Capricorn
    expect(determineDateRangeRight(210)).toBe("Nov 22 - Dec 21"); // Sagittarius
    expect(determineDateRangeRight(240)).toBe("Oct 23 - Nov 21"); // Scorpio
    expect(determineDateRangeRight(270)).toBe("Sep 23 - Oct 22"); // Libra
    expect(determineDateRangeRight(300)).toBe("Aug 23 - Sep 22"); // Virgo
    expect(determineDateRangeRight(330)).toBe("Jul 23 - Aug 22"); // Leo
  });

  test('should return "unknown" for an unknown angle', () => {
    expect(determineDateRangeRight(45)).toBe("unknown");
    expect(determineDateRangeRight(123)).toBe("unknown");
  });
});

describe("determinePairing Tests", () => {
  test("should return the zodiac sign pair for various angles", () => {
    expect(determinePairing(120, 210)).toEqual(["Virgo", "Sagittarius"]);
    expect(determinePairing(240, 330)).toEqual(["Taurus", "Leo"]);
    expect(determinePairing(270, 150)).toEqual(["Aries", "Aquarius"]);
    // Add more test cases for different angle pairs and expected zodiac sign pairs
  });

  test("should return the zodiac sign pair when angles exceed 360 degrees and negative angles", () => {
    expect(determinePairing(390, -45)).toEqual(["Sagittarius", "unknown"]);
    expect(determinePairing(-180, 420)).toEqual(["Cancer", "Taurus"]);
    // Add more test cases for angles greater than 360 degrees and negative angles
  });

  test("should return the unknown for unrounded angles", () => {
    expect(determinePairing(45, 135)).toEqual(["unknown", "unknown"]);
    expect(determinePairing(-361, 361)).toEqual(["unknown", "unknown"]);
    // Add more test cases for unknown angles
  });
});

describe("textGenerator Tests", () => {
  test("should generate the matching romantic compatibility text for various zodiac sign pairs", () => {
    expect(textGenerator("Aries", "Taurus")).toBe(
      "Aries and Taurus can experience an intense and passionate romantic relationship. Aries brings excitement, spontaneity, and a sense of adventure, while Taurus offers stability, loyalty, and sensuality. However, conflicts may arise due to Aries' impulsive nature and Taurus' desire for security and routine. Open communication and compromise are key to maintaining a harmonious and fulfilling romance."
    );
    expect(textGenerator("Capricorn", "Gemini")).toBe(
      "Gemini and Capricorn have contrasting personalities, which can create both attraction and challenges in their romantic relationship. Gemini is outgoing, adaptable, and enjoys social interactions, while Capricorn is more reserved, practical, and focused on long-term goals. Gemini is attracted to Capricorn's ambition, stability, and determination, while Capricorn admires Gemini's intelligence, wit, and ability to keep things interesting. However, their differences in communication styles and priorities can lead to misunderstandings and conflicts. Gemini's need for variety and freedom may clash with Capricorn's desire for structure and commitment. Building trust, practicing open and honest communication, and finding a balance between stability and flexibility are essential for Gemini and Capricorn to create a harmonious and fulfilling romantic partnership."
    );
    expect(textGenerator("Pisces", "Cancer")).toBe(
      "Cancer and Pisces can have a deeply emotional and nurturing romantic relationship. Both signs are highly sensitive, empathetic, and seek emotional connection. Cancer is nurturing, protective, and values family, while Pisces is compassionate, intuitive, and values emotional depth. They can create a safe and comforting space for each other, where they can freely express their emotions and provide support. Both signs are romantic and enjoy the simple pleasures of life. However, conflicts may arise due to their emotional sensitivity and occasional mood swings. Building trust, open communication, and understanding each other's emotional needs are important for a successful and fulfilling romantic relationship between Cancer and Pisces."
    );
    expect(textGenerator("Virgo", "Virgo")).toBe(
      "When two Virgo individuals come together in a romantic relationship, they create a bond based on shared values, practicality, and a mutual desire for stability. Both partners are detail-oriented, analytical, and seek perfection in their lives and relationships. They appreciate each other's intellect, reliability, and dedication. The relationship between two Virgos is likely to be well-organized, structured, and focused on personal growth. They excel in communication, problem-solving, and supporting each other's goals. However, their attention to detail and tendency to be critical can sometimes lead to over-analysis or nitpicking. It's important for Virgo partners to cultivate patience, understanding, and the ability to see the bigger picture in order to maintain harmony in their relationship."
    );
  });
  test("should tell the user there's an error if an unknown pair is passed into the function", () => {
    expect(textGenerator("unknown", "unknown")).toBe("An error has occurred");
  });
});
