import { mod } from "../utils.js";
import { zodiacOrder, zodiacDateRanges, romantic } from "./data.js";

// Function to round the angle to the nearest multiple of 30
export function roundAngle(angle) {
  const rounded = Math.round(angle / 30) * 30;
  return mod(rounded, 360);
}

export function getMappingLeft(angle) {
  angle = mod(angle, 360);
  for (const [i, zodiac] of zodiacOrder.entries()) {
    if (angle < (i + 1) * 60) {
      return zodiac;
    }
  }
  return "unknown";
}
export function getMappingRight(angle) {
  angle = mod(angle, 360);
  if (angle < 180) {
    for (const [i, zodiac] of zodiacOrder.slice(6).entries()) {
      if (angle < (i + 1) * 60) {
        return zodiac;
      }
    }
  } else {
    for (const [i, zodiac] of zodiacOrder.slice(0, 6).entries()) {
      if (angle - 180 < (i + 1) * 60) {
        return zodiac;
      }
    }
  }
  return "unknown";
}

export function determineDateRangeLeft(angle) {
  return zodiacDateRanges[getMappingLeft(angle)] ?? "unknown";
}

export function determineDateRangeRight(angle) {
  return zodiacDateRanges[getMappingRight(angle)] ?? "unknown";
}

export function determinePairing(angle1, angle2) {
  angle1 = mod(angle1, 360);
  angle2 = mod(angle2, 360);
  const angle1Mapping = getMappingLeft(angle1);
  const angle2Mapping = getMappingRight(angle2);
  return [angle1Mapping, angle2Mapping];
}

//text generator
export function textGenerator(one, two) {
  return (
    romantic.get(`${one} and ${two}`) ??
    romantic.get(`${two} and ${one}`) ??
    "An error has occurred"
  );
}
