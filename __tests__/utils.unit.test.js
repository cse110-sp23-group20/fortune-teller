/* global global */

import { mod, pick, wait, timeoutId } from "../source/utils.js";

// Yes. I generated these tests with ChatGPT. 😎

describe("pick", () => {
  // Test with an array of numbers
  test("picks a number from the given array", () => {
    const options = [1, 2, 3, 4, 5];
    const result = pick(options);
    expect(options).toContain(result);
  });

  // Test with an array of strings
  test("picks a string from the given array", () => {
    const options = ["apple", "banana", "cherry", "date"];
    const result = pick(options);
    expect(options).toContain(result);
  });

  // Test with an array of objects
  test("picks an object from the given array", () => {
    const options = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];
    const result = pick(options);
    expect(options).toContain(result);
  });

  // Test with an empty array
  test("returns undefined for an empty array", () => {
    const options = [];
    const result = pick(options);
    expect(result).toBeUndefined();
  });

  // Test with a single-element array
  test("returns the only option for a single-element array", () => {
    const options = ["only"];
    const result = pick(options);
    expect(result).toEqual("only");
  });

  // Test with a large array
  test("picks an element from a large array", () => {
    const options = Array.from({ length: 1000 }, (_, index) => index);
    const result = pick(options);
    expect(options).toContain(result);
  });
});

describe("mod", () => {
  // Test with positive numbers
  test("returns the correct modulus for positive numbers", () => {
    expect(mod(10, 3)).toBe(1);
    expect(mod(15, 6)).toBe(3);
    expect(mod(20, 7)).toBe(6);
  });

  // Test with negative numbers
  test("returns the correct modulus for negative numbers", () => {
    expect(mod(-10, 3)).toBe(2);
    expect(mod(-15, 6)).toBe(3);
    expect(mod(-20, 7)).toBe(1);
  });

  // Test with zero divisor
  test("returns NaN when the divisor is zero", () => {
    expect(mod(10, 0)).toBeNaN();
    expect(mod(-10, 0)).toBeNaN();
    expect(mod(0, 0)).toBeNaN();
  });

  // Test with large numbers
  test("returns the correct modulus for large numbers", () => {
    expect(mod(987654321, 123456789)).toBe(9);
    expect(mod(123456789, 987654321)).toBe(123456789);
  });
});

jest.useFakeTimers();

describe("wait", () => {
  let setTimeoutMock;

  beforeEach(() => {
    setTimeoutMock = jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    jest.clearAllTimers();
    setTimeoutMock.mockRestore();
  });

  test("resolves after the specified delay", () => {
    const delay = 1000;
    const promise = wait(delay);
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), delay);
    jest.advanceTimersByTime(delay);
    return expect(promise).resolves.toBeUndefined();
  });

  test("does not resolve if clearTimeout is called", () => {
    const delay = 1000;
    const promise = wait(delay);
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), delay);
    clearTimeout(timeoutId);
    jest.advanceTimersByTime(delay);
    const passSymbol = Symbol();
    return expect(
      Promise.race([promise, Promise.resolve(passSymbol)])
    ).resolves.toBe(passSymbol);
  });
});
