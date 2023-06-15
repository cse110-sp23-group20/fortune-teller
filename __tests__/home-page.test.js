//import { randomize } from "source\home-page\script.js";
import { BASE } from "./consts.js";

describe("Basic unit Tests for the Home Page", () => {
  beforeAll(async () => {
    await page.goto(`${BASE}/source/home-page/`);
  });

  //checking to make sure team website link is correct
  it("should have the correct link", async () => {
    const teamLink = await page.$("a.team-link.hover-underline");
    const hrefProperty = await teamLink.getProperty("href");
    const hrefValue = await hrefProperty.jsonValue();

    expect(hrefValue).toBe(
      "https://github.com/cse110-sp23-group20/fortune-teller/blob/main/admin/team.md"
    );
  });

  //checking to make sure the link actually works
  it("should navigate to the correct page when the link is clicked", async () => {
    // Click on the link and wait for the page navigation to complete
    await Promise.all([
      page.waitForNavigation(),
      page.click("a.team-link.hover-underline"),
    ]);

    // Get the current URL after navigation
    const currentURL = page.url();

    // Assert that the current URL matches the expected destination
    expect(currentURL).toBe(
      "https://github.com/cse110-sp23-group20/fortune-teller/blob/main/admin/team.md"
    );
  });
});
