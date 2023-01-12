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

test("Test not all fields completed error", async () => {
  await driver.findElementByAccessibilityId("login").setValue("invalid");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("login").setValue(null);
  await driver.findElementByAccessibilityId("password").setValue("password123");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test invalid email", async () => {
  await driver.findElementByAccessibilityId("login").setValue("invalid");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test user does not exist", async () => {
  await driver
    .findElementByAccessibilityId("login")
    .setValue("test@doesnotexist.test");
  await driver.findElementByAccessibilityId("password").setValue("password123");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});
