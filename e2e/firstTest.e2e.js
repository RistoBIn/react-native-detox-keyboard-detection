const Platform = {
  ios: 'ios',
  android: 'android'
};

const expectKeyboardIsOpen = async (inputId) => {
  if (device.getPlatform() === Platform.ios) {
    await expect(element(by.type('UIRemoteKeyboardWindow'))).toExist();
  } else if (device.getPlatform() === Platform.android) {
    device.pressBack();
    expect(element(by.id(inputId))).toBeVisible();
  }
}

const expectKeyboardIsClose = async (inputId) => {
  if (device.getPlatform() === 'ios') {
    await expect(element(by.type('UIRemoteKeyboardWindow'))).not.toExist();
  } else if (device.getPlatform() === Platform.android) {
    device.pressBack();
    expect(element(by.id(inputId))).not.toBeVisible();
  }
}

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should open keyboard after textinput tap', async () => {
    await element(by.id('input1')).tap();
    await expectKeyboardIsOpen("input1");
  });

  it('should close keyboard after textinput not focused', async () => {
    await element(by.id('input1')).tap();
    await element(by.id('input1')).typeText('\n');
    await expectKeyboardIsClose("input1");
  });
});