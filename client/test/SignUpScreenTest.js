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
  expect(await driver.hasElementByAccessibilityId("confirm_password")).toBe(
    true
  );
  expect(await driver.hasElementByAccessibilityId("first_name")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("second_name")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("year")).toBe(true);
});

test("Test not all fields completed error", async () => {
  await driver
    .findElementByAccessibilityId("login")
    .setValue("invalid@invalid.com");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("login").setValue(null);
  await driver.findElementByAccessibilityId("first_name").setValue("name");
  await driver.findElementByAccessibilityId("confirm_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test invalid email", async () => {
  await driver.findElementByAccessibilityId("login").setValue("invalid");
  expect(await driver.elementByAccessibilityId("invalid_email")).toBe(true);

  await driver.findElementByAccessibilityId("confirm_button").click();
  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test passwords dont match", async () => {
  await driver.findElementByAccessibilityId("password").setValue("password123");
  await driver
    .findElementByAccessibilityId("confirm_password")
    .setValue("password124");
  expect(await driver.elementByAccessibilityId("different_passwords")).toBe(
    true
  );

  await driver.findElementByAccessibilityId("confirm_button").click();
  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test password too short", async () => {
  await driver.findElementByAccessibilityId("password").setValue("p");
  await driver.findElementByAccessibilityId("confirm_password").setValue("p");
  expect(await driver.elementByAccessibilityId("password_too_short")).toBe(
    true
  );

  await driver.findElementByAccessibilityId("confirm_button").click();
  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});
