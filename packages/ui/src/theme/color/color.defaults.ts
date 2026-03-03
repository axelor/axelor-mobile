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

import {ConfigurablePalette} from './types';

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

export const defaultLightColors: ConfigurablePalette = {
  mode: 'light',
  colors: {
    primary: '#6C67FA',
    secondary: '#6C757D',
    success: '#3ECF8E',
    warning: '#FFBE4E',
    danger: '#DD514C',
    info: '#26C6F9',
    dark: '#212529',
  },
  body: {
    color: '#5A5A7C',
    placeholder: '#ACACBD',
    background: '#FFFFFF',
    sidebar: '#F8F8FF',
  },
  web: {
    blue: '#6C67FA',
    indigo: '#6610F2',
    purple: '#C354F2',
    pink: '#D63384',
    red: '#DD514C',
    orange: '#FD7E14',
    yellow: '#FFBE4E',
    green: '#3ECF8E',
    teal: '#20C997',
    cyan: '#26C6F9',
    black: '#333333',
    grey: '#6C757D',
  },
};

export const defaultDarkColors: ConfigurablePalette = {
  mode: 'dark',
  colors: {
    primary: '#666CFF',
    secondary: '#6D788D',
    success: '#3ECF8E',
    warning: '#FDB528',
    danger: '#E04440',
    info: '#26C6F9',
    dark: '#212529',
  },
  body: {
    color: '#C7C8DC',
    placeholder: '#7C7D94',
    background: '#31334D',
    sidebar: '#292A41',
  },
  web: {
    blue: '#666CFF',
    indigo: '#6610F2',
    purple: '#C354F2',
    pink: '#D63384',
    red: '#E04440',
    orange: '#FD7E14',
    yellow: '#FDB528',
    green: '#3ECF8E',
    teal: '#20C997',
    cyan: '#26C6F9',
    black: '#333333',
    grey: '#6D788D',
  },
};
