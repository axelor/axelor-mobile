import {
  OutsideAlerterProvider,
  ThemeProvider,
  ConfigProvider,
  WritingThemeProvider,
  lightTheme,
  writingDefaultTheme,
} from '../packages/ui/src';

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
