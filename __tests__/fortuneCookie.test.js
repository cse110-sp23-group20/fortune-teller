describe('Basic user flow for Website', () => {
  // First, visit the fortune cookie website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501/source/FortuneCookie/');
  });

  // Check to make sure that button is enabled when page loads
  it('Make sure button is enabled', async () => {
      console.log('Checking to make sure button is enabled...');
      let buttonDisabled;
      const button = await page.$('button');
      let booleanValue = await button.getProperty('disabled');
      buttonDisabled = await booleanValue.jsonValue();
      expect(buttonDisabled).toBe(false);
  }, 5000)

  // Check to make sure that button disables when it is clicked
  it('Make sure button disables', async () => {
      console.log('Checking to make sure button disables when clicked...');
      let buttonDisabled;
      const button = await page.$('button');
      await button.click();
      let booleanValue = await button.getProperty('disabled');
      buttonDisabled = await booleanValue.jsonValue();
      expect(buttonDisabled).toBe(true);
  }, 5000)

  // Check to make sure that button reenables after it is clicked
  it('Make sure button is reenabled', async () => {
    console.log('Checking to make sure button reenables after being clicked...');
    // Wait because it takes time until button is reenabled as it has to read out the fortune
    await page.waitForTimeout(10000);
    let buttonDisabled;
    const button = await page.$('button');
    let booleanValue = await button.getProperty('disabled');
    buttonDisabled = await booleanValue.jsonValue();
    expect(buttonDisabled).toBe(false);
}, 15000)

  // Check to make sure audio disables if user unchecks 'toggle voice' checkbox
  it('Make sure audio disables', async () => {
    console.log('Checking to make sure audio disables after \'toggle voice\' is unchecked...');
    // Wait because it takes time until button is reenabled as it has to read out the fortune
    let 
}, 15000)


});