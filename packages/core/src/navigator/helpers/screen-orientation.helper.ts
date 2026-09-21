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

import OrientationDirector, {
  Orientation,
} from 'react-native-orientation-director';
import {Screen, ScreenOrientation} from '../../app';

export const DEFAULT_SCREEN_ORIENTATION: ScreenOrientation = 'portrait';

export const applyScreenOrientation = (orientation?: ScreenOrientation) => {
  switch (orientation ?? DEFAULT_SCREEN_ORIENTATION) {
    case 'device':
      OrientationDirector.unlock();
      break;
    case 'landscape':
      OrientationDirector.lockTo(Orientation.landscape);
      break;
    default:
      OrientationDirector.lockTo(Orientation.portrait);
      break;
  }
};

export const applyActiveScreenOrientation = (
  screens: {[key: string]: Screen},
  screenKey: string,
) => {
  applyScreenOrientation(screens?.[screenKey]?.orientation);
};
