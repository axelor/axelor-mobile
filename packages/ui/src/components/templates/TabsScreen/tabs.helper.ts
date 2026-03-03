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

export interface Tab {
  key: number;
  title: string;
  view?: React.JSX.Element;
  hidden?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  count?: number;
  showBadge?: boolean;
}

export interface TabProps {
  style?: any;
  title: string;
  onPress: () => void;
  isActive?: boolean;
  disabled?: boolean;
  count?: number;
  showBadge?: boolean;
}

export interface TabsScreenProps {
  style?: any;
  viewStyle?: any;
  position?: TabsPosition;
  tabHeight?: number;
  items?: Tab[];
}

export enum TabsPosition {
  Bottom = 'bottom',
  Top = 'top',
}

export const BADGE_SIZE = 27;

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
