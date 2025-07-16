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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';

export class CheckListItemType {
  static status = {
    Uncompleted: false,
    Completed: true,
  };

  static getStatusColor = (status: boolean, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Uncompleted:
        return Colors.secondaryColor;
      case this.status.Completed:
        return Colors.successColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by check list item`,
        );
        return null;
    }
  };

  static getStatusList = (Colors: ThemeColors, I18n: TranslatorProps) => {
    return Object.entries(this.status).map(([key, value]) => ({
      title: I18n.t(`Project_CheckListStatus_${key}`),
      color: this.getStatusColor(value, Colors),
      key: value,
    }));
  };
}
