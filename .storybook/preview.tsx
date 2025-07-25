import React from 'react';
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

const preview: Preview = {
  decorators: [
    Story => (
      <OutsideAlerterProvider>
        <ThemeProvider themes={[lightTheme]} defaultTheme={lightTheme}>
          <WritingThemeProvider
            themes={[writingDefaultTheme]}
            defaultTheme={writingDefaultTheme}>
            <ConfigProvider showModulesSubtitle={false}>
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
