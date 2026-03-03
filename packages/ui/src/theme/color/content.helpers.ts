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

import {
  addOpacityToHex,
  deepCopy,
  getBestForegroundColor,
  rgbaStringToHex,
} from '../../utils';
import {
  bootstrapColors,
  defaultDarkColors,
  defaultLightColors,
} from './color.defaults';
import {
  Color,
  ConfigurablePalette,
  ConfigurableTheme,
  Theme,
  ThemeColors,
} from './types';

export const getActiveTheme = (
  defaultTheme: Theme,
  themeColorsConfig: ThemeColors,
) => {
  const activeTheme = deepCopy(defaultTheme);
  Object.assign(activeTheme.colors, themeColorsConfig);
  return activeTheme;
};

export function formatColor(color: string) {
  if (color == null) {
    return null;
  }

  if (color.includes('#')) {
    if (color.length === 4) {
      return `#${color
        .replace('#', '')
        .split('')
        .map(char => char + char)
        .join('')}`;
    }

    return color;
  }

  if (color.includes('rgb')) {
    return rgbaStringToHex(color);
  }

  return null;
}

const extendColor = (color: string): Color => {
  const _hexColor = formatColor(color);

  return {
    background: _hexColor,
    background_light: addOpacityToHex(_hexColor, 0.7),
    foreground: getBestForegroundColor(_hexColor),
  };
};

function formatPalette(theme: any): ConfigurablePalette {
  const mode = theme.palette?.mode ?? 'light';
  const _default = mode === 'light' ? defaultLightColors : defaultDarkColors;

  return {
    mode,
    colors: {
      primary: formatColor(theme.palette?.primary) ?? _default.colors.primary,
      secondary:
        formatColor(theme.palette?.secondary) ?? _default.colors.secondary,
      success: formatColor(theme.palette?.success) ?? _default.colors.success,
      warning: formatColor(theme.palette?.warning) ?? _default.colors.warning,
      danger: formatColor(theme.palette?.danger) ?? _default.colors.danger,
      info: formatColor(theme.palette?.info) ?? _default.colors.info,
      dark: formatColor(theme.palette?.dark) ?? _default.colors.dark,
    },
    body: {
      color: formatColor(theme.palette?.body_color) ?? _default.body.color,
      placeholder:
        formatColor(theme.components?.Input?.placeholder?.color) ??
        _default.body.placeholder,
      background:
        formatColor(theme.palette?.body_bg) ?? _default.body.background,
      sidebar:
        formatColor(theme.components?.Shell?.sidebar?.bg) ??
        _default.body.sidebar,
    },
    web: {
      blue: formatColor(theme.palette?.blue) ?? _default.web.blue,
      indigo: formatColor(theme.palette?.indigo) ?? _default.web.indigo,
      purple: formatColor(theme.palette?.purple) ?? _default.web.purple,
      pink: formatColor(theme.palette?.pink) ?? _default.web.pink,
      red: formatColor(theme.palette?.red) ?? _default.web.red,
      orange: formatColor(theme.palette?.orange) ?? _default.web.orange,
      yellow: formatColor(theme.palette?.yellow) ?? _default.web.yellow,
      green: formatColor(theme.palette?.green) ?? _default.web.green,
      teal: formatColor(theme.palette?.teal) ?? _default.web.teal,
      cyan: formatColor(theme.palette?.cyan) ?? _default.web.cyan,
      black: formatColor(theme.palette?.black) ?? _default.web.black,
      grey: formatColor(theme.palette?.gray) ?? _default.web.grey,
    },
  };
}

function mapPaletteColors(theme: ConfigurableTheme): ThemeColors {
  const _content: ConfigurablePalette = formatPalette(
    JSON.parse(theme.content),
  );

  return {
    ...bootstrapColors,
    screenBackgroundColor: _content.body.sidebar,
    backgroundColor: _content.body.background,
    text: _content.body.color,
    placeholderTextColor: _content.body.placeholder,
    primaryColor: extendColor(_content.colors.primary),
    secondaryColor: extendColor(_content.colors.secondary),
    secondaryColor_dark: extendColor(_content.colors.dark),
    errorColor: extendColor(_content.colors.danger),
    cautionColor: extendColor(_content.colors.warning),
    plannedColor: extendColor(_content.web.purple),
    progressColor: extendColor(_content.web.yellow),
    priorityColor: extendColor(_content.colors.info),
    defaultColor: extendColor(_content.web.grey),
    importantColor: extendColor(_content.colors.danger),
    successColor: extendColor(_content.colors.success),
    warningColor: extendColor(_content.colors.warning),
    inverseColor: extendColor(_content.web.grey),
    infoColor: extendColor(_content.colors.info),
    red: extendColor(_content.web.red),
    pink: extendColor(_content.web.pink),
    purple: extendColor(_content.web.purple),
    indigo: extendColor(_content.web.indigo),
    blue: extendColor(_content.web.blue),
    cyan: extendColor(_content.web.cyan),
    teal: extendColor(_content.web.teal),
    green: extendColor(_content.web.green),
    yellow: extendColor(_content.web.yellow),
    orange: extendColor(_content.web.orange),
    grey: extendColor(_content.web.grey),
    black: extendColor(_content.web.black),
  };
}

export function registerThemes(
  existing: Theme[],
  newThemes: (ConfigurableTheme | Theme)[],
): Theme[] {
  if (!Array.isArray(newThemes) || newThemes.length === 0) {
    return existing;
  }

  let result: Theme[] = existing.filter(_t => !_t.isCustom);

  newThemes.forEach(_theme => {
    if ((_theme as ConfigurableTheme).id != null) {
      const _t = _theme as ConfigurableTheme;
      try {
        const colors = mapPaletteColors(_t);

        result.push({
          key: _t.id,
          name: _t.label ?? _t.name,
          colors,
          isCustom: true,
        });
      } catch (error) {}
    } else {
      result.push(_theme as Theme);
    }
  });

  return result;
}
