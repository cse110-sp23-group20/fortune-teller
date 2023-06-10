//import { randomize } from "source\home-page\script.js";

describe("Basic unit Tests for the Home Page", () => {
    beforeAll(async() => {
        await page.goto("https://cse110-sp23-group20.github.io/fortune-teller/source/home-page/");

    });

    //checking to make sure team website link is correct
    it("should have the correct link", async() => {
        const teamLink = await page.$('a.team-link.hover-underline');
        const hrefProperty = await teamLink.getProperty("href");
        const hrefValue = await hrefProperty.jsonValue();

        expect(hrefValue).toBe(
            "https://github.com/cse110-sp23-group20/cse110-sp23-group20/blob/main/admin/team.md"
        );
    });


    //checking to make sure the link actually works
    it("should navigate to the correct page when the link is clicked", async() => {
        const teamLink = await page.$('a.team-link.hover-underline');

        // Listen for the page navigation event
        const navigationPromise = page.waitForNavigation();

        // Click on the link
        await teamLink.click();

        // Wait for the page navigation to complete
        await navigationPromise;

        // Get the current URL after navigation
        const currentURL = page.url();

        // Assert that the current URL matches the expected destination
        expect(currentURL).toBe("https://github.com/cse110-sp23-group20/cse110-sp23-group20/blob/main/admin/team.md");
    });
});