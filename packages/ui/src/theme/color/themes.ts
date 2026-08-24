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
  translationKey: 'User_Theme_Light',
  isCustom: false,
  colors: {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
    primaryColor: {
      background_light: '#E4F6EC',
      foreground: '#000000',
      background: '#3ECF8E',
    },
    secondaryColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    secondaryColor_dark: {
      background_light: '#c5c3c3',
      foreground: '#FFFFFF',
      background: '#424242',
    },
    errorColor: {
      background_light: '#FCEAE8',
      foreground: '#FFFFFF',
      background: '#E0564B',
    },
    cautionColor: {
      background_light: '#FCEFDA',
      foreground: '#000000',
      background: '#E07A1F',
    },
    plannedColor: {
      background_light: '#ECE4FA',
      foreground: '#FFFFFF',
      background: '#6443B0',
    },
    progressColor: {
      background_light: '#FCEFD2',
      foreground: '#000000',
      background: '#E3A722',
    },
    priorityColor: {
      background_light: '#E3F0FB',
      foreground: '#FFFFFF',
      background: '#2E78C4',
    },
    defaultColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    importantColor: {
      background_light: '#FCEAE8',
      foreground: '#FFFFFF',
      background: '#E0564B',
    },
    successColor: {
      background_light: '#E4F6EC',
      foreground: '#FFFFFF',
      background: '#1F9D57',
    },
    warningColor: {
      background_light: '#FCEFDA',
      foreground: '#000000',
      background: '#E07A1F',
    },
    inverseColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    infoColor: {
      background_light: '#E3F0FB',
      foreground: '#FFFFFF',
      background: '#2E78C4',
    },
    ...bootstrapColors,
    text: '#13211B',
    placeholderTextColor: '#9AA8A1',
  },
};

export const purpleTheme: Theme = {
  key: 'purple',
  name: 'Purple',
  translationKey: 'User_Theme_Purple',
  isCustom: false,
  colors: {
    screenBackgroundColor: '#F8F9FA',
    backgroundColor: '#FFFFFF',
    primaryColor: {
      background_light: '#EBEAFE',
      foreground: '#000000',
      background: '#635FDC',
    },
    secondaryColor: {
      background_light: '#EEEEF1',
      foreground: '#000000',
      background: '#B5B5C2',
    },
    secondaryColor_dark: {
      background_light: '#E4E4E4',
      foreground: '#FFFFFF',
      background: '#5A5A7C',
    },
    errorColor: {
      background_light: '#FBE7E6',
      foreground: '#FFFFFF',
      background: '#DD514C',
    },
    cautionColor: {
      background_light: '#FEEBDA',
      foreground: '#000000',
      background: '#FD7E14',
    },
    plannedColor: {
      background_light: '#F6E7FC',
      foreground: '#FFFFFF',
      background: '#C354F2',
    },
    progressColor: {
      background_light: '#FEF1DC',
      foreground: '#000000',
      background: '#FFBE4E',
    },
    priorityColor: {
      background_light: '#DDF3FC',
      foreground: '#FFFFFF',
      background: '#26C6F9',
    },
    defaultColor: {
      background_light: '#F2F2F2',
      foreground: '#000000',
      background: '#CECECE',
    },
    importantColor: {
      background_light: '#FBE7E6',
      foreground: '#FFFFFF',
      background: '#DD514C',
    },
    successColor: {
      background_light: '#E1F7ED',
      foreground: '#FFFFFF',
      background: '#3ECF8E',
    },
    warningColor: {
      background_light: '#FEEBDA',
      foreground: '#000000',
      background: '#FD7E14',
    },
    inverseColor: {
      background_light: '#EAEAEA',
      foreground: '#FFFFFF',
      background: '#606060',
    },
    infoColor: {
      background_light: '#DDF3FC',
      foreground: '#FFFFFF',
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
  translationKey: 'User_Theme_ColorBlind',
  isCustom: false,
  colors: {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FAFBFC',
    primaryColor: {
      background_light: '#DCEAF3',
      foreground: '#FFFFFF',
      background: '#0072B2',
    },
    secondaryColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    secondaryColor_dark: {
      background_light: '#c5c3c3',
      foreground: '#FFFFFF',
      background: '#424242',
    },
    errorColor: {
      background_light: '#FBE6D9',
      foreground: '#FFFFFF',
      background: '#D55E00',
    },
    cautionColor: {
      background_light: '#FCEFDA',
      foreground: '#000000',
      background: '#E69F00',
    },
    plannedColor: {
      background_light: '#F8E9F1',
      foreground: '#FFFFFF',
      background: '#CC79A7',
    },
    progressColor: {
      background_light: '#FDF3D0',
      foreground: '#000000',
      background: '#F0C808',
    },
    priorityColor: {
      background_light: '#E4F4FC',
      foreground: '#000000',
      background: '#56B4E9',
    },
    defaultColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    importantColor: {
      background_light: '#FBE6D9',
      foreground: '#FFFFFF',
      background: '#D55E00',
    },
    successColor: {
      background_light: '#DCF3EC',
      foreground: '#FFFFFF',
      background: '#009E73',
    },
    warningColor: {
      background_light: '#FCEFDA',
      foreground: '#000000',
      background: '#E69F00',
    },
    inverseColor: {
      background_light: '#DCE4DF',
      foreground: '#FFFFFF',
      background: '#6B7B73',
    },
    infoColor: {
      background_light: '#E4F4FC',
      foreground: '#000000',
      background: '#56B4E9',
    },
    ...bootstrapColors,
    text: '#13211B',
    placeholderTextColor: '#9AA8A1',
  },
};
