// @ts-check

/**
 * @file Utility functions. Conveniently, these functions are good candidates
 * for unit tests.
 */

/**
 * Randomly selects an item in the given list.
 *
 * @template T
 * @param {ArrayLike<T>} options - List of options to choose from.
 * @returns {T} The randomly chosen option
 */
export function pick(options) {
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Calculates the modulus. JavaScript's `%` operator is the remainder operator,
 * which works differently for negative numbers. For example, `-10 % 360` in
 * JavaScript, but `-10 mod 360` is 350.
 *
 * @param {number} a - Dividend
 * @param {number} b - Div-sor
 * @returns {number} The modulus of `a` and `b`
 */
export function mod(a, b) {
  return ((a % b) + b) % b;
}
