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
  expect(await driver.hasElementByAccessibilityId("image")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("name")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("year")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("description")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("star")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("galerry")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("map")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("fancy_list")).toBe(true);
});

test("Test star", async () => {
  expect(await driver.hasElementByAccessibilityId("star").isDisplayed()).toBe(
    true
  );
  await driver.hasElementByAccessibilityId("star").click();

  expect(await driver.hasElementByAccessibilityId("star").isDisplayed()).toBe(
    true
  );
});

test("Test all displayed correctly / is visible", async () => {
  expect(await driver.elementByAccessibilityId("name").isDisplayed()).toBe(
    true
  );
  expect(await driver.elementByAccessibilityId("year").isDisplayed()).toBe(
    true
  );
  expect(await driver.elementByAccessibilityId("star").isDisplayed()).toBe(
    true
  );
  expect(await driver.elementByAccessibilityId("map").isDisplayed()).toBe(true);
  expect(
    await driver.elementByAccessibilityId("fancy_list").isDisplayed()
  ).toBe(true);
});
