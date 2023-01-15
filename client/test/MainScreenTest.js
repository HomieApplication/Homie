import wd from "wd";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 4723;

const config = {
  platformName: "iOS",
  platformVersion: "16.2",
  deviceName: "iPhone 14 Pro Max",
  app: "../build/app.ipa",
  automationName: "XCUITest",
};

const driver = wd.promiseChainRemote("localhost", PORT);

beforeAll(async () => {
  await driver.init(config);
});

test("Test Accessibilty Id", async () => {
  expect(await driver.hasElementByAccessibilityId("profile_header")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("scroll")).toBe(true);
});

test("Test scroll", async () => {
  await driver.scroll(10, 100);
  expect(await driver.hasElementByAccessibilityId("card")).isDisplayed();

  await driver.scroll(10, -100);
  expect(await driver.hasElementByAccessibilityId("card")).isDisplayed();
});
