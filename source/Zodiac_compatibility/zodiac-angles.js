// @ts-check

import { mod } from "../utils.js";
import { zodiacOrder, zodiacDateRanges, romantic } from "./data/dataArray.js";

/**
 * Rounds the given angle to the nearest multiple of 30.
 * @param {number} angle - The angle to round.
 * @returns {number} The rounded angle.
 */
export function roundAngle(angle) {
  return Math.round(angle / 30) * 30;
}

/**
 * Retrieves the zodiac sign mapping for the given angle on the left wheel.
 * @param {number} roundedAngle - The angle on the left wheel pre-rounded to the nearest 30 degree increment
 * @returns {string} The corresponding zodiac sign, or `'unknown'` if the angle does not correspond to a zodiac.
 */
export function getMappingLeft(roundedAngle) {
  if (Math.round(roundedAngle / 30) * 30 !== roundedAngle) {
    return "unknown";
  }
  const index = Math.round(mod(roundedAngle, 360) / 30);
  return zodiacOrder[index < 12 ? Math.round(mod(roundedAngle, 360) / 30) : 0];
}

/**
 * Retrieves the zodiac sign mapping for the given angle on the right wheel.
 * @param {number} roundedAngle - The angle on the right wheel pre-rounded to the nearest 30 degree increment
 * @returns {string} The corresponding zodiac sign, or `'unknown'` if the angle does not correspond to a zodiac.
 */
export function getMappingRight(roundedAngle) {
  if (Math.round(roundedAngle / 30) * 30 !== roundedAngle) {
    return "unknown";
  }
  const index = Math.round(mod(roundedAngle, 360) / 30);
  return zodiacOrder[index < 6 ? index + 6 : index < 12 ? index - 6 : 0];
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

/**
 * Finds the smaller difference between two angles. For example, the difference
 * -170° - 170° should be 20°, because -170° is equivalent to 190°.
 * @param {number} angle - The angle to subtract the base from.
 * @param {number} base - The base angle that is subtracted from the angle.
 * @returns {number} `angle - base`, but it's guaranteed to be between -180° and
 * 180°.
 */
export function angleDiff(angle, base) {
  const diff = mod(angle - base, 360);
  return diff > 180 ? diff - 360 : diff;
}

/**
 * Calculates the default CSS transition-timing-function, `ease`
 * (`cubic-bezier(0.25, 0.1, 0.25, 1.0)`).
 *
 * @param {number} t - Transition time (between 0 and 1).
 * @returns {number} The interpolated value (between 0 and 1).
 */
export function ease(t) {
  const ax = 0;
  const ay = 0;
  const bx = 0.25;
  const by = 0.1;
  const cx = 0.25;
  const cy = 1.0;
  const dx = 1.0;
  const dy = 1.0;

  function cubicBezier(t) {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    return ax * mt3 + 3 * bx * mt2 * t + 3 * cx * mt * t2 + dx * t3;
  }

  // Use binary search to find the approximate value of t
  let start = 0;
  let end = 1;
  const epsilon = 0.0001; // Desired precision

  while (Math.abs(end - start) > epsilon) {
    const mid = (start + end) / 2;
    const value = cubicBezier(mid);
    if (value < t) {
      start = mid;
    } else {
      end = mid;
    }
  }

  return cubicBezier((start + end) / 2);
}
