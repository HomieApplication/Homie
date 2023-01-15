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
  expect(await driver.hasElementByAccessibilityId("university")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("description")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("date_of_birth")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("date_picker")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("select_image_button")).toBe(
    true
  );
  expect(await driver.hasElementByAccessibilityId("hobby_select")).toBe(true);
  expect(await driver.hasElementByAccessibilityId("save_changes_button")).toBe(
    true
  );
});

test("Test not all fields completed error", async () => {
  await driver.findElementByAccessibilityId("university").setValue("oth");
  await driver.findElementByAccessibilityId("save_changes_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("university").setValue(null);
  await driver
    .findElementByAccessibilityId("description")
    .setValue("description test");
  await driver.findElementByAccessibilityId("save_changes_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver.findElementByAccessibilityId("university").setValue(null);
  await driver.findElementByAccessibilityId("description").setValue(null);
  date_picker = driver.findElementByAccessibilityId("date_picker");
  date_picker[0].set_value("27");
  date_picker[1].set_value("January");
  date_picker[2].set_value("1994");
  await driver.findElementByAccessibilityId("save_changes_button").click();

  expect(await driver.elementByAccessibilityId("OK")).toBe(true);
});

test("Test hobby picker", async () => {
  await driver.findElementByAccessibilityId("hobby_select").setValue("invalid");
  expect(await driver.elementByAccessibilityId("OK")).toBe(true);

  await driver
    .findElementByAccessibilityId("hobby_select")
    .addValue("Literature");
  await driver.findElementByAccessibilityId("hobby_select").addValue("Cooking");
  await driver.findElementByAccessibilityId("hobby_select").addValue("Music");

  expect(
    await driver
      .elementByAccessibilityId("hobby_select")
      .getAttribute("Literature")
  ).toBe(true);
  expect(
    await driver
      .elementByAccessibilityId("hobby_select")
      .getAttribute("Cooking")
  ).toBe(true);
  expect(
    await driver.elementByAccessibilityId("hobby_select").getAttribute("Music")
  ).toBe(true);
  expect(
    await driver
      .elementByAccessibilityId("hobby_select")
      .getAttribute("Computers")
  ).toBe(false);
});
