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

import {deepCopy} from '../../utils/objects';
import {Theme, ThemeColors} from './themes';

export const getActiveTheme = (
  defaultTheme: Theme,
  themeColorsConfig: ThemeColors,
) => {
  const activeTheme = deepCopy(defaultTheme);
  Object.assign(activeTheme.colors, themeColorsConfig);
  return activeTheme;
};
