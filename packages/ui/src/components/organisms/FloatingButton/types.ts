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

import {Color} from '../../../theme';

export interface FloatingButtonProps {
  style?: any;
  actions: ActionProps[];
  iconName?: string;
  closeIconName?: string;
  buttonStyle?: any;
  buttonColor?: Color;
  size?: number;
  closeOnOutsideClick?: boolean;
  onGlobalPress?: () => void;
  translator: (key: string) => string;
  useCircleStyle?: boolean;
  expandable?: boolean;
  defaultOpenValue?: boolean;
}

export interface ActionProps {
  key: number | string;
  title?: string;
  iconName: string;
  color?: Color;
  hideIf?: boolean;
  disabled?: boolean;
  closeOnPress?: boolean;
  indicator?: boolean;
  onPress: () => void;
}

export const FLOATING_BUTTON_SIZE = 60;
export const ACTION_BUTTON_SIZE_PERCENTAGE = 0.7;
export const MIN_ACTION_BUTTON_WIDTH = 200;
