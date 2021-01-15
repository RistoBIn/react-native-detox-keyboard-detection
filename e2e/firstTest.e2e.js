const { getProps } = require('detox-getprops');

const Platform = {
  ios: 'ios',
  android: 'android'
};

let originalLayout = null;

const getCurrentLayout = async () => {
  const rProps = await getProps(element(by.type('com.facebook.react.ReactRootView')));
  return {
    width: parseInt(rProps.width),
    height: parseInt(rProps.height)
  };
}

const expectKeyboardIsOpen = async () => {
  if (device.getPlatform() === Platform.ios) {
    await expect(element(by.type('UIRemoteKeyboardWindow'))).toExist();
  } else if (device.getPlatform() === Platform.android) {
    const currentLayout = await getCurrentLayout();
    if (currentLayout.height < originalLayout.height) {
      return;
    }
    else {
      throw "Keyboard is not opened."
    }
  }
}

const expectKeyboardIsClose = async () => {
  if (device.getPlatform() === 'ios') {
    await expect(element(by.type('UIRemoteKeyboardWindow'))).not.toExist();
  } else if (device.getPlatform() === Platform.android) {
    const currentLayout = await getCurrentLayout();
    if (currentLayout.height === originalLayout.height) {
      return;
    }
    else {
      throw "Keyboard is opened."
    }
  }
}

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
    originalLayout = await getCurrentLayout();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should open keyboard after textinput tap', async () => {
    await element(by.id('input1')).tap();
    await expectKeyboardIsOpen();
  });

  it('should close keyboard after textinput not focused', async () => {
    await expectKeyboardIsClose();
  });
});