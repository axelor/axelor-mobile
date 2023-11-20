import React from 'react';
import {Platform} from 'react-native';
import {
  OutsideAlerterProvider,
  ThemeProvider,
  ConfigProvider,
  WritingThemeProvider,
  lightTheme,
  writingDefaultTheme,
} from '../packages/ui/src';

if (Platform.OS === 'web') {
  const IconFont = require('react-native-vector-icons/Fonts/FontAwesome.ttf');
  const iconFontStyles = `@font-face {
    src: url(${IconFont});
    font-family: FontAwesome;
  }`;

  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  document.head.appendChild(style);
}

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <OutsideAlerterProvider>
      <ThemeProvider themes={[lightTheme]} defaultTheme={lightTheme}>
        <WritingThemeProvider
          themes={[writingDefaultTheme]}
          defaultTheme={writingDefaultTheme}>
          <ConfigProvider>
            <div>
              <Story />
            </div>
          </ConfigProvider>
        </WritingThemeProvider>
      </ThemeProvider>
    </OutsideAlerterProvider>
  ),
];
