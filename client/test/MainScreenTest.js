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
  expect(await driver.hasElementByAccessibilityId("login")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("password")).toBe(true);
});
