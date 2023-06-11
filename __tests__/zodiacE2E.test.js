import { BASE } from "./consts.js";

// E2E TESTS
describe("Basic user flow for Website", () => {
  // First, visit the zodiac compatibility page
  beforeAll(async () => {
    await page.goto(`${BASE}/source/Zodiac_compatibility/`);
  });

  it("User rotates wheels and clicks find out", async () => {
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

    await page.click("#go-back");

    // Check if the pop-up element is not visible (visibility is set to
    // "hidden")
    const isPopupVisible = await page.evaluate(() => {
      const popup = document.querySelector("#pop-up");
      return getComputedStyle(popup).visibility !== "hidden";
    });

    // Assert that the pop-up element is not visible
    expect(isPopupVisible).toBe(false);
  });
});
