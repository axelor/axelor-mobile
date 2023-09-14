import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import 'react-native-gesture-handler/jestSetup';
import 'react-native/jest/setup';

configure({adapter: new Adapter()});

jest.mock('react-native-reanimated', () => ({
  default: {
    call: jest.fn(),
  },
}));

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

jest.mock(
  'react-native-toast-message',
  () => ({
    show: jest.fn(),
    BaseToast: 'BaseToastMock',
    ErrorToast: 'ErrorToastMock',
  }),
  {virtual: true},
);

jest.mock(
  'react-redux',
  () => ({
    useSelector: jest.fn(),
  }),
  {virtual: true},
);

jest.mock(
  'react-native-mmkv',
  () => ({
    MMKV: () => ({
      set: jest.fn(),
      getString: jest.fn(),
      clearAll: jest.fn(),
    }),
  }),
  {virtual: true},
);

jest.mock('react-native-system-navigation-bar', () => ({
  navigationHide: () => jest.fn(),
}));

jest.mock('react-native-static-safe-area-insets', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  getSafeAreaInsets: jest.fn(() => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })),
}));

jest.mock('react-native-calendars', () => ({
  Agenda: jest.fn(),
  AgendaEntry: jest.fn(),
  DateData: jest.fn(),
}));

jest.mock('react-native-date-picker', () => ({
  default: jest.fn(),
}));

jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: jest.fn(() => ({})),
}));

jest.mock('rn-fetch-blob');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
