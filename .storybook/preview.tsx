import React from 'react';
import {Platform} from 'react-native';
import type {Preview} from '@storybook/react';
import {
  OutsideAlerterProvider,
  ThemeProvider,
  ConfigProvider,
  WritingThemeProvider,
  lightTheme,
  writingDefaultTheme,
} from '../packages/ui/src';
import './storybook.css';

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

const preview: Preview = {
  decorators: [
    Story => (
      <OutsideAlerterProvider>
        <ThemeProvider themes={[lightTheme]} defaultTheme={lightTheme}>
          <WritingThemeProvider
            themes={[writingDefaultTheme]}
            defaultTheme={writingDefaultTheme}>
            <ConfigProvider>
              <Story />
            </ConfigProvider>
          </WritingThemeProvider>
        </ThemeProvider>
      </OutsideAlerterProvider>
    ),
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F2F2F2',
        },
      ],
    },
  },
};

export default preview;
