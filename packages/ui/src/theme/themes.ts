/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  text: string;
  placeholderTextColor: string;
}

export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
}

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
    text: '#000000',
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
    text: '#000000',
    placeholderTextColor: '#C0C0C0',
  },
};
