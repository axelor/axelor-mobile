export interface Color {
  background_light: string;
  foreground: string;
  background: string;
}

export interface ThemeColors {
  screenBackgroundColor: string;
  backgroundColor: string;
  primaryColor: Color;
  secondaryColor: Color;
  secondaryColor_dark: Color;
  errorColor: Color;
  cautionColor: Color;
  plannedColor: Color;
  progressColor: Color;
  priorityColor: Color;
  defaultColor: Color;
  importantColor: Color;
  successColor: Color;
  warningColor: Color;
  inverseColor: Color;
  infoColor: Color;
  red: Color;
  pink: Color;
  purple: Color;
  deepPurple: Color;
  indigo: Color;
  blue: Color;
  lightBlue: Color;
  cyan: Color;
  teal: Color;
  green: Color;
  lightGreen: Color;
  lime: Color;
  yellow: Color;
  amber: Color;
  orange: Color;
  deepOrange: Color;
  brown: Color;
  grey: Color;
  blueGrey: Color;
  black: Color;
  text: string;
  placeholderTextColor: string;
}

export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
  isCustom?: boolean;
}

export interface ConfigurableTheme {
  name: string;
  label?: string;
  content: any;
}

export interface ConfigurablePalette {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    dark: string;
  };
  body: {
    color: string;
    placeholder: string;
    background: string;
    sidebar: string;
  };
  web: {
    blue: string;
    indigo: string;
    purple: string;
    pink: string;
    red: string;
    orange: string;
    yellow: string;
    green: string;
    teal: string;
    cyan: string;
    black: string;
    grey: string;
  };
}
