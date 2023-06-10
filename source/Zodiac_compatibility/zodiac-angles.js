// @ts-check

import { mod } from "../utils.js";
import { zodiacOrder, zodiacDateRanges, romantic } from "./data/dataArray.js";

/**
 * Rounds the given angle to the nearest multiple of 30.
 * @param {number} angle - The angle to round.
 * @returns {number} The rounded angle.
 */
export function roundAngle(angle) {
  const rounded = Math.round(angle / 30) * 30;
  return mod(rounded, 360);
}

/**
 * Retrieves the zodiac sign mapping for the given angle on the left wheel.
 * @param {number} angle - The angle on the left wheel.
 * @returns {string} The corresponding zodiac sign.
 */
export function getMappingLeft(angle) {
  angle = mod(angle, 360);
  for (const [i, zodiac] of zodiacOrder.entries()) {
    if (angle < (i + 1) * 60) {
      return zodiac;
    }
  }
  return "unknown";
}

/**
 * Retrieves the zodiac sign mapping for the given angle on the right wheel.
 * @param {number} angle - The angle on the right wheel.
 * @returns {string} The corresponding zodiac sign.
 */
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

/**
 * Determines the zodiac sign date range based on the given angle on the left wheel.
 * @param {number} angle - The angle of the left wheel.
 * @returns {string} The zodiac sign associated with the angle.
 */
export function determineDateRangeLeft(angle) {
  return zodiacDateRanges[getMappingLeft(angle)] ?? "unknown";
}

/**
 * Determines the zodiac sign date range based on the given angle on the right wheel.
 * @param {number} angle - The angle of the right wheel.
 * @returns {string} The zodiac sign associated with the angle.
 */
export function determineDateRangeRight(angle) {
  return zodiacDateRanges[getMappingRight(angle)] ?? "unknown";
}

/**
 * Gets the zodiac sign pair based on the angles of the left and right wheels.
 * @param {number} angleLeft - The angle of the left wheel.
 * @param {number} angleRight - The angle of the right wheel.
 * @returns {Array} An array containing the zodiac sign pair.
 */
export function determinePairing(angleLeft, angleRight) {
  angleLeft = mod(angleLeft, 360);
  angleRight = mod(angleRight, 360);
  const leftMapping = getMappingLeft(angleLeft);
  const rightMapping = getMappingRight(angleRight);
  return [leftMapping, rightMapping];
}

/**
 * Generates the text describing the romantic compatibility between two zodiac signs.
 * @param {string} leftSign - The left wheel's zodiac sign.
 * @param {string} rightSign - The right wheel's zodiac sign.
 * @returns {string} The generated text.
 */
export function textGenerator(leftSign, rightSign) {
  return (
    romantic.get(`${leftSign} and ${rightSign}`) ??
    romantic.get(`${rightSign} and ${leftSign}`) ??
    "An error has occurred"
  );
}
