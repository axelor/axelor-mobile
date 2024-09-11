/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

interface Item {
  iconName: string;
  color?: Color;
  title?: string;
  order?: number;
  hidden?: boolean;
  disabled?: boolean;
  indicator?: number;
  key?: string;
}

export interface ViewItem extends Item {
  viewComponent: React.ReactNode;
}

interface ActionItem extends Item {
  onPress: () => void;
}

export type BottomBarItem = ViewItem | ActionItem;
