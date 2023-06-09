// E2E TESTS
describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto(
      "https://cse110-sp23-group20.github.io/fortune-teller/source/Zodiac_compatibility/"
    );
  });

  it("should perform a user interaction and verify the result", async () => {
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

    // Check if the pop-up element is not visible (display is set to "none")
    const isPopupVisible = await page.evaluate(() => {
      const popup = document.querySelector("#pop-up");
      return getComputedStyle(popup).display !== "none";
    });

    // Assert that the pop-up element is not visible
    expect(isPopupVisible).toBe(false);
  });
});
