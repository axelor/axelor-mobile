/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
}

export const bootstrapColors = {
  red: {
    background: '#DC3545',
    background_light: '#EA868F',
    foreground: '#000000',
  },
  pink: {
    background: '#D63384',
    background_light: '#E685B5',
    foreground: '#000000',
  },
  purple: {
    background: '#6F42C1',
    background_light: '#A98EDA',
    foreground: '#000000',
  },
  deepPurple: {
    background: '#673AB7',
    background_light: '#A489D4',
    foreground: '#000000',
  },
  indigo: {
    background: '#6610F2',
    background_light: '#A370F7',
    foreground: '#000000',
  },
  blue: {
    background: '#0D6EFD',
    background_light: '#6EA8FE',
    foreground: '#000000',
  },
  lightBlue: {
    background: '#03A9F4',
    background_light: '#68CBF8',
    foreground: '#000000',
  },
  cyan: {
    background: '#0DCAF0',
    background_light: '#6EDFF6',
    foreground: '#000000',
  },
  teal: {
    background: '#20C997',
    background_light: '#79DFC1',
    foreground: '#000000',
  },
  green: {
    background: '#198754',
    background_light: '#75B798',
    foreground: '#000000',
  },
  lightGreen: {
    background: '#8BC34A',
    background_light: '#B9DB92',
    foreground: '#000000',
  },
  lime: {
    background: '#CDDC39',
    background_light: '#E1EA88',
    foreground: '#000000',
  },
  yellow: {
    background: '#FFC107',
    background_light: '#FFDA6A',
    foreground: '#000000',
  },
  amber: {
    background: '#FFC107',
    background_light: '#FFDA6A',
    foreground: '#000000',
  },
  orange: {
    background: '#FD7E14',
    background_light: '#FEB272',
    foreground: '#000000',
  },
  deepOrange: {
    background: '#FF5722',
    background_light: '#FF9A7A',
    foreground: '#000000',
  },
  brown: {
    background: '#795548',
    background_light: '#AF9991',
    foreground: '#FFFFFF',
  },
  grey: {
    background: '#6C757D',
    background_light: '#A7ACB1',
    foreground: '#000000',
  },
  blueGrey: {
    background: '#607D8B',
    background_light: '#A0B1B9',
    foreground: '#000000',
  },
  black: {
    background: '#000000',
    background_light: '#666666',
    foreground: '#FFFFFF',
  },
};

export const lightTheme: Theme = {
  key: 'light',
  name: 'Light',
  colors: {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FAFBFC',
    primaryColor: {
      background_light: '#84DCB7',
      foreground: '#000000',
      background: '#3ECF8E',
    },
    secondaryColor: {
      background_light: '#DDDDDD',
      foreground: '#000000',
      background: '#CECECE',
    },
    secondaryColor_dark: {
      background_light: '#606060',
      foreground: '#FFFFFF',
      background: '#424242',
    },
    errorColor: {
      background_light: '#EE6666',
      foreground: '#000000',
      background: '#F12F2F',
    },
    cautionColor: {
      background_light: '#EE9B67',
      foreground: '#000000',
      background: '#F27B30',
    },
    plannedColor: {
      background_light: '#D3C7EC',
      foreground: '#000000',
      background: '#B5A1DF',
    },
    progressColor: {
      background_light: '#FCE064',
      foreground: '#000000',
      background: '#FFD101',
    },
    priorityColor: {
      background_light: '#81C9E8',
      foreground: '#000000',
      background: '#36AEE1',
    },
    defaultColor: {
      background_light: '#DDDDDD',
      foreground: '#000000',
      background: '#CECECE',
    },
    importantColor: {
      background_light: '#EE6666',
      foreground: '#000000',
      background: '#F12F2F',
    },
    successColor: {
      background_light: '#84DCB7',
      foreground: '#000000',
      background: '#3ECF8E',
    },
    warningColor: {
      background_light: '#EE9B67',
      foreground: '#000000',
      background: '#F27B30',
    },
    inverseColor: {
      background_light: '#9E9E9F',
      foreground: '#FFFFFF',
      background: '#606060',
    },
    infoColor: {
      background_light: '#81C9E8',
      foreground: '#000000',
      background: '#36AEE1',
    },
    ...bootstrapColors,
    text: '#000000',
    placeholderTextColor: '#C0C0C0',
  },
};

export const purpleTheme: Theme = {
  key: 'purple',
  name: 'Purple',
  colors: {
    screenBackgroundColor: '#F8F9FA',
    backgroundColor: '#FFFFFF',
    primaryColor: {
      background_light: '#A7A4FC',
      foreground: '#000000',
      background: '#6C67FA',
    },
    secondaryColor: {
      background_light: '#C9C9D0',
      foreground: '#000000',
      background: '#B5B5C2',
    },
    secondaryColor_dark: {
      background_light: '#606060',
      foreground: '#FFFFFF',
      background: '#5A5A7C',
    },
    errorColor: {
      background_light: '#E18D8A',
      foreground: '#000000',
      background: '#DD514C',
    },
    cautionColor: {
      background_light: '#F4A868',
      foreground: '#000000',
      background: '#FD7E14',
    },
    plannedColor: {
      background_light: '#D18EED',
      foreground: '#000000',
      background: '#C354F2',
    },
    progressColor: {
      background_light: '#F5CE8B',
      foreground: '#000000',
      background: '#FFBE4E',
    },
    priorityColor: {
      background_light: '#73D3F1',
      foreground: '#000000',
      background: '#26C6F9',
    },
    defaultColor: {
      background_light: '#DDDDDD',
      foreground: '#000000',
      background: '#CECECE',
    },
    importantColor: {
      background_light: '#E18D8A',
      foreground: '#000000',
      background: '#DD514C',
    },
    successColor: {
      background_light: '#84DCB7',
      foreground: '#000000',
      background: '#3ECF8E',
    },
    warningColor: {
      background_light: '#F4A868',
      foreground: '#000000',
      background: '#FD7E14',
    },
    inverseColor: {
      background_light: '#9E9E9F',
      foreground: '#FFFFFF',
      background: '#606060',
    },
    infoColor: {
      background_light: '#73D3F1',
      foreground: '#000000',
      background: '#26C6F9',
    },
    ...bootstrapColors,
    text: '#333333',
    placeholderTextColor: '#C0C0C0',
  },
};

export const colorBlindTheme: Theme = {
  key: 'colorBlind',
  name: 'Color blind',
  colors: {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FAFBFC',
    primaryColor: {
      background_light: '#BF9263',
      foreground: '#000000',
      background: '#994F00',
    },
    secondaryColor: {
      background_light: '#63A4E0',
      foreground: '#000000',
      background: '#3288D9',
    },
    secondaryColor_dark: {
      background_light: '#006CD1',
      foreground: '#FFFFFF',
      background: '#154470',
    },
    errorColor: {
      background_light: '#EF9477',
      foreground: '#000000',
      background: '#E54D1D',
    },
    cautionColor: {
      background_light: '#F5C0AA',
      foreground: '#000000',
      background: '#F49B76',
    },
    plannedColor: {
      background_light: '#D3C7EC',
      foreground: '#000000',
      background: '#B5A1DF',
    },
    progressColor: {
      background_light: '#FCE064',
      foreground: '#000000',
      background: '#FFD101',
    },
    priorityColor: {
      background_light: '#81C9E8',
      foreground: '#000000',
      background: '#36AEE1',
    },
    defaultColor: {
      background_light: '#63A4E0',
      foreground: '#000000',
      background: '#3288D9',
    },
    importantColor: {
      background_light: '#EE6666',
      foreground: '#000000',
      background: '#F12F2F',
    },
    successColor: {
      background_light: '#BF9263',
      foreground: '#000000',
      background: '#994F00',
    },
    warningColor: {
      background_light: '#EE9B67',
      foreground: '#000000',
      background: '#F27B30',
    },
    inverseColor: {
      background_light: '#9E9E9F',
      foreground: '#FFFFFF',
      background: '#606060',
    },
    infoColor: {
      background_light: '#81C9E8',
      foreground: '#000000',
      background: '#36AEE1',
    },
    ...bootstrapColors,
    text: '#000000',
    placeholderTextColor: '#C0C0C0',
  },
};
