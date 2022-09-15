import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.useFakeTimers();

jest.mock('react-native-datawedge-intents', () => ({
  registerBroadcastReceiver: () => jest.fn(),
}));

jest.mock('react-native-file-viewer', () => ({
  open: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: 'FAKE-DIRECTORY-PATH',
  downloadFile: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getManufacturer: 'FAKE-MANUFACTURER',
}));
