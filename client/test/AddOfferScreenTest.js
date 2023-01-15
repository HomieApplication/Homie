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
  expect(await driver.hasElementByAccessibilityId("offer_title")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("description")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("dormitory")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("create_offer_button")).toBe(
    true
  );
});

test("Test not all fields completed error", async () => {
  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("offer_title").setValue("Title");
  await driver.findElementByAccessibilityId("create_offer_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("offer_title").setValue(null);
  await driver
    .findElementByAccessibilityId("description")
    .setValue("Test description");
  await driver.findElementByAccessibilityId("create_offer_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test dormitory unable to choose", async () => {
  await driver.findElementByAccessibilityId("dormitory").setValue("invalid");
  expect(
    await driver.elementByAccessibilityId("dormitory").getAttribute("Text")
  ).toBe(null);
});

test("Test modal appearance", async () => {
  await driver.findElementByAccessibilityId("choose_dorm_button").click();
  expect(await driver.elementByAccessibilityId("modal_map").isDisplayed()).toBe(
    true
  );

  await driver.findElementByAccessibilityId("map_done").click();
  expect(await driver.elementByAccessibilityId("modal_map").isDisplayed()).toBe(
    false
  );
});
