module.exports = {
    preset: "jest-puppeteer",
    launch: {
        headless: process.env.CI === "true",
        ignoreDefaultArgs: ["--disable-extensions"],
        args: ["--no-sandbox"],
        executablePath: "chrome.exe"
    }, 
    server: {
        command: "npm run server",
        port: 5505,
        launchTimeout: 180000
    }
};
