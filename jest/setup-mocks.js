/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* eslint-disable no-undef */

import 'react-native-gesture-handler/jestSetup';
import 'react-native/jest/setup';

jest.useFakeTimers();

jest.mock('react-native/Libraries/BatchedBridge/NativeModules');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Settings/NativeSettingsManager', () => ({
  settings: {},
  getConstants: () => ({settings: {}}),
}));
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const turboModuleRegistry = jest.requireActual(
    'react-native/Libraries/TurboModule/TurboModuleRegistry',
  );
  return {
    ...turboModuleRegistry,
    getEnforcing: name => {
      try {
        return turboModuleRegistry.getEnforcing(name);
      } catch (e) {
        return {};
      }
    },
  };
});

jest.mock('react-native-blob-util', () => ({
  DocumentDir: 'FAKE-DIRECTORY-PATH',
}));

jest.mock('react-native-calendars', () => ({
  Agenda: jest.fn(),
  AgendaEntry: jest.fn(),
  DateData: jest.fn(),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({default: jest.fn()}));

jest.mock('@react-native-community/slider', () => 'RNSlider');

jest.mock('react-native-datawedge-intents', () => ({
  registerBroadcastReceiver: () => jest.fn(),
}));

jest.mock('react-native-date-picker', () => ({default: jest.fn()}));

jest.mock('react-native-device-info', () => ({
  getManufacturer: 'FAKE-MANUFACTURER',
}));

jest.mock('react-native-file-viewer', () => ({
  open: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: 'FAKE-DIRECTORY-PATH',
  downloadFile: jest.fn(),
}));

jest.mock('react-native-gifted-charts', () => ({
  LineChart: jest.fn(),
  BarChart: jest.fn(),
  PieChart: jest.fn(),
}));

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

jest.mock('react-native-pell-rich-editor', () => ({
  actions: jest.fn(),
  RichEditor: jest.fn(),
  RichToolbar: jest.fn(),
}));

require('react-native-reanimated').setUpTests();

jest.mock('react-native-share', () => ({
  turboModuleRegistry: jest.fn(),
}));

jest.mock('react-native-signature-canvas', () => ({Signature: jest.fn()}));

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

jest.mock('react-native-svg', () => {
  const React = require('react');
  const {View} = require('react-native');
  const createMock = () =>
    React.forwardRef((props, ref) => <View {...props} ref={ref} />);

  return {
    Circle: createMock(),
    Svg: createMock(),
    Path: createMock(),
  };
});

jest.mock('react-native-system-navigation-bar', () => ({
  default: jest.fn(),
  navigationHide: () => jest.fn(),
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

jest.mock('react-native-vision-camera', () => ({
  useCameraDevices: jest.fn(),
  useCameraFormat: jest.fn(),
  useCodeScanner: jest.fn(),
}));

jest.mock('react-native-webview', () => ({default: jest.fn()}));

jest.mock(
  'react-redux',
  () => ({
    useSelector: jest.fn(),
  }),
  {virtual: true},
);
