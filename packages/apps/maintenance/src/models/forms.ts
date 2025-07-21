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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {ActionRadioSelect, EquipementMaintenanceSearchBar} from '../components';

export const maintenance_formsRegister: FormConfigs = {
  maintenance_maintenanceRequest: {
    modelName: 'com.axelor.apps.maintenance.db.MaintenanceRequest',
    fields: {
      equipementMaintenance: {
        titleKey: 'Maintenance_MaintenanceEquipment',
        type: 'object',
        required: true,
        widget: 'custom',
        customComponent: EquipementMaintenanceSearchBar,
      },
      expectedDate: {
        titleKey: 'Maintenance_Deadline',
        type: 'date',
        required: true,
        widget: 'date',
        options: {popup: true},
      },
      actionSelect: {
        titleKey: 'Maintenance_RequestActionType',
        type: 'number',
        widget: 'custom',
        customComponent: ActionRadioSelect,
      },
    },
  },
};
