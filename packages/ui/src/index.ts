/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

export * from './components';
export * from './theme';
export {getCommonStyles} from './utils/commons-styles';
export {sliceString} from './utils/strings';
export {default as File} from './types/file';
export {ConfigProvider, useConfig} from './config/ConfigContext';
export {
  OutsideAlerterProvider,
  useClickOutside,
  OUTSIDE_INDICATOR,
} from './hooks/use-click-outside';
export {animationUtil} from './tools/AnimationUtil';
export {formatNumber, unformatNumber} from './utils/formatters';
