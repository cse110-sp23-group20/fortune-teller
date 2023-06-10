describe("Basic user flow for Website", () => {
  // First, visit the fortune cookie website
  beforeAll(async () => {
    await page.goto(
      "https://cse110-sp23-group20.github.io/fortune-teller/source/FortuneCookie/"
    );
  });

  // Check to make sure that fortune button is enabled when page loads
  it("Make sure fortune button is enabled", async () => {
    console.log("Checking to make sure fortune button is enabled...");
    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");

    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(false);
  }, 5000);

  // Check to make sure that reset button is disabled when page loads
  it("Make sure reset button is disabled", async () => {
    console.log("Checking to make sure reset button is disabled...");
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");

    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    console.log("How is this true: " + booleanValue);
    expect(resetButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that fortune button disables when it is clicked
  it("Make sure fortune button disables after being clicked", async () => {
    console.log(
      "Checking to make sure fortune button disables when clicked..."
    );

    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");
    await fortuneButton.click();

    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that reset button is enabled when after fortune button is clicked
  it("Make sure reset button is enabled after fortune button is clicked", async () => {
    console.log("Checking to make sure reset button is enabled...");

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'reset-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const resetButton = document.querySelector("#reset-button");
      return resetButton && resetButton.disabled === false;
    });

    // Makes sure the reset button is actually enabled
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");
    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(false);
  }, 25000);

  // Check to make sure that the speech synthesis is being populated, the correct voices are called by the function
  // describe("populateVoice", () => {
  //   test("populate voice options", () => {
  //     const voices = [
  //       { name: "Karen", lang: "en-AU", default: false },
  //       { name: "Eddy", lang: "pt-BR", default: false },
  //       { name: "Lesya", lang: "uk-UA", default: false },
  //     ];
  //     const synthesis = {
  //       getVoices: jest.fn().mockReturnValue(voices),
  //     };
  //     //const option = document.createElement('option');
  //     const appendchild = jest.spyOn(voiceSelect, "appendChild");
  //     //document.body.innerHTML=
  //     //<select></select>;
  //     populateVoiceList();
  //     expect(synthesis.getVoices).toHaveBeenCalled();
  //     expect(appendchild).toHaveBeenCalledTimes(3);
  //     //expect(voiceSelect.innerHTML).toContain('Karen');
  //   });
  // });
});
