import { BASE } from "./consts.js";

// E2E TESTS
describe("Basic user flow test cases for Website", () => {
  // First, visit the zodiac compatibility page
  beforeAll(async () => {
    await page.goto(`${BASE}/source/Zodiac_compatibility/`);
  });

  it("User ONLY clicks find out", async () => {
    // Simulate the user clicking the find-out button when it appears
    await page.click("#find-out");
    // Wait for the popup to be visible or for a certain condition
    await page.waitForSelector("#pop-up");
    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );
    // By default Capricorn and Cancer is the default pairing
    expect(pairingHeader).toEqual("Capricorn and Cancer");

    // Simulate the user clicking the go-back button
    await page.click("#go-back");

    // Check that the pop-up element is no longer visible (visibility is set to
    // "hidden")
    const isPopupVisible = await page.evaluate(() => {
      const popup = document.querySelector("#pop-up");
      return getComputedStyle(popup).visibility !== "hidden";
    });
    expect(isPopupVisible).toBe(false);
  });

  it("User scrolls 1 wheel then clicks find out", async () => {
    // Simulate hovering over the image
    await page.hover("#left_wheel_img");

    // Simulate scrolling down while still hovering
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });
    // Simulate the user clicking the find-out button when it appears
    await page.click("#find-out");
    // Wait for the popup to be visible or for a certain condition
    await page.waitForSelector("#pop-up");
    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );

    expect(pairingHeader).toEqual("Capricorn and Cancer");

    // Simulate the user clicking the go-back button
    await page.click("#go-back");
  });
  it("User scrolls 2 wheels then clicks find out", async () => {
    // Simulate hovering over the image
    await page.hover("#left_wheel_img");

    // Simulate scrolling down while still hovering
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });

    await page.hover("#right_wheel_img");

    // Simulate scrolling down while still hovering
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });
    // Simulate the user clicking the find-out button when it appears
    await page.click("#find-out");
    // Wait for the popup to be visible or for a certain condition
    await page.waitForSelector("#pop-up");
    // Get the text content of an element
    const pairingHeader = await page.$eval(
      "#pairing",
      (element) => element.textContent
    );

    expect(pairingHeader).toEqual("Capricorn and Cancer");

    // Simulate the user clicking the go-back button
    await page.click("#go-back");
  });
});
