import { BASE } from "./consts.js";

describe("User rotates NO wheels and presses find out", () => {
  // First, visit the zodiac compatibility page
  beforeAll(async () => {
    await page.goto(`${BASE}/source/love-compatibility/`);
  });

  it("User immediately clicks find out", async () => {
    // Simulate a user interaction
    await page.click("#find-out");
    // Wait for a specific element to be visible or for a certain condition
    await page.waitForSelector("#pop-up");
    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );
    // Assert the expected result
    expect(pairingHeader).toEqual("Capricorn and Cancer");
  });
});

describe("User rotates LEFT wheel ONLY and presses find out", () => {
  // First, visit the zodiac compatibility page
  beforeAll(async () => {
    await page.goto(`${BASE}/source/love-compatibility/`);
  });

  it("User rotates LEFT wheel then clicks find out", async () => {
    // Hover over the left wheel
    const leftWheel = await page.$("#left-wheel-img");
    const leftWheelBoundingBox = await leftWheel.boundingBox();
    await page.mouse.move(
      leftWheelBoundingBox.x + leftWheelBoundingBox.width / 4,
      leftWheelBoundingBox.y + leftWheelBoundingBox.height / 4
    );

    await new Promise((resolve) => setTimeout(resolve, 4000));
    // Spin the left wheel
    await page.evaluate(() => {
      const leftWheelImg = document.querySelector("#left-wheel-img");
      for (let i = 0; i < 100; i++) {
        leftWheelImg.dispatchEvent(new WheelEvent("wheel", { deltaY: -720 }));
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // User presses find out button
    await page.hover("#find-out");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click("#find-out");

    // Wait for results pop up to be visible
    await page.waitForSelector("#pop-up", { timeout: 10000 });

    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );

    // Through visual inspection the for loop spins the left wheel to Leo
    expect(pairingHeader).toEqual("Leo and Cancer");
  }, 15000);
});

describe("User rotates LEFT and RIGHT wheel and presses find out", () => {
  // First, visit the zodiac compatibility page
  beforeAll(async () => {
    await page.goto(`${BASE}/source/love-compatibility/`);
  });

  it("User rotates RIGHT and RIGHT wheel then clicks find out", async () => {
    // Hover over the left wheel
    const leftWheel = await page.$("#left-wheel-img");
    const leftWheelBoundingBox = await leftWheel.boundingBox();
    await page.mouse.move(
      leftWheelBoundingBox.x + leftWheelBoundingBox.width / 4,
      leftWheelBoundingBox.y + leftWheelBoundingBox.height / 4
    );

    await new Promise((resolve) => setTimeout(resolve, 4000));
    // Spin the left wheel
    await page.evaluate(() => {
      const leftWheelImg = document.querySelector("#left-wheel-img");
      for (let i = 0; i < 100; i++) {
        leftWheelImg.dispatchEvent(new WheelEvent("wheel", { deltaY: -720 }));
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hover over the right wheel
    const rightWheel = await page.$("#right-wheel-img");
    const rightWheelBoundingBox = await rightWheel.boundingBox();
    await page.mouse.move(
      rightWheelBoundingBox.x + rightWheelBoundingBox.width / 4,
      rightWheelBoundingBox.y + rightWheelBoundingBox.height / 4
    );
    // Spin the right wheel
    await page.evaluate(() => {
      const rightWheelImg = document.querySelector("#right-wheel-img");
      for (let i = 0; i < 100; i++) {
        rightWheelImg.dispatchEvent(new WheelEvent("wheel", { deltaY: -720 }));
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // User presses find out button
    await page.hover("#find-out");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click("#find-out");

    // Wait for results pop up to be visible
    await page.waitForSelector("#pop-up", { timeout: 10000 });

    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );

    // Through visual inspection the for loop spins the left wheel to Leo
    // and the right to Aquarius
    expect(pairingHeader).toEqual("Leo and Aquarius");
  }, 15000);
});
