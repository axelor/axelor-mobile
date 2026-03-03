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

import {Theme} from './types';
import {bootstrapColors} from './color.defaults';

export const lightTheme: Theme = {
  key: 'light',
  name: 'Light',
  isCustom: false,
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
  isCustom: false,
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
  isCustom: false,
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
