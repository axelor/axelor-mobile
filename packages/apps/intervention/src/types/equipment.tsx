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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';

class EquipmentType {
  static status = {
    InService: true,
    NotInService: false,
  };

  static type = {
    equipment: 'equipment',
    place: 'place',
  };

  static mode = {
    intervention: 'intervention',
    client: 'client',
  };

  static generateTypeList = () => {
    return Object.entries(this.type).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  };

  static getStatusColor = (status: boolean, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.InService:
        return Colors.successColor;
      case this.status.NotInService:
      case null:
        return Colors.cautionColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by equipment`,
        );
        return null;
    }
  };

  static getStatusKey = (
    status: boolean,
    I18n: {t: (key: string) => string},
  ): string => {
    switch (status) {
      case this.status.InService:
        return I18n.t('Intervention_EquipmentStatus_InService');
      case this.status.NotInService:
      case null:
        return I18n.t('Intervention_EquipmentStatus_NotInService');
      default:
        console.warn(
          `Status provided with value ${status} is not supported by equipment`,
        );
        return null;
    }
  };

  static getStatusList = (
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    return Object.values(this.status).map(value => ({
      title: this.getStatusKey(value, I18n),
      key: value,
      color: this.getStatusColor(value, Colors),
    }));
  };
}

export default EquipmentType;
