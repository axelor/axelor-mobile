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
  id: string;
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
