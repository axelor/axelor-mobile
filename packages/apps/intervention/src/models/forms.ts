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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {
  ClientProspectSearchBar,
  ContractSearchBar,
  EquipmentFamilySearchBar,
  //PlaceEquipmentSearchBar,
  TypePicker,
} from '../components';

export const intervention_formsRegister: FormConfigs = {
  intervention_equipment: {
    modelName: 'com.axelor.apps.intervention.db.Equipment',
    fields: {
      partner: {
        titleKey: 'Intervention_Customer',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: ClientProspectSearchBar,
        options: {
          showTitle: true,
        },
      },
      /*parentEquipment: {
        titleKey: 'Intervention_ParentPlace',
        type: 'object',
        widget: 'custom',
        customComponent: PlaceEquipmentSearchBar,
        options: {
          showTitle: true,
          inService: null,
          customerId: null,
        },
      },*/
      code: {
        titleKey: 'Intervention_Code',
        type: 'string',
        widget: 'default',
      },
      name: {
        titleKey: 'Intervention_Designation',
        type: 'string',
        widget: 'default',
        required: true,
      },
      typeSelect: {
        titleKey: 'Intervention_Type',
        type: 'string',
        widget: 'custom',
        customComponent: TypePicker,
        required: true,
      },
      inService: {
        titleKey: 'Intervention_Status_InService',
        type: 'boolean',
        widget: 'checkbox',
      },
      commissioningDate: {
        titleKey: 'Intervention_CommissioningDate',
        type: 'date',
        widget: 'date',
      },
      customerWarrantyOnPartEndDate: {
        titleKey: 'Intervention_CustomerWarrantyOnPartEndDate',
        type: 'date',
        widget: 'date',
      },
      equipmentFamily: {
        titleKey: 'Intervention_EquipmentFamily',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: EquipmentFamilySearchBar,
      },
      scheduleOfOperation: {
        titleKey: 'Intervention_ScheduleOfOperation',
        type: 'string',
        widget: 'default',
      },
      specificAccessSchedule: {
        titleKey: 'Intervention_SpecificAccessSchedule',
        type: 'string',
        widget: 'default',
      },
      contract: {
        titleKey: 'Intervention_Contract',
        type: 'object',
        widget: 'custom',
        customComponent: ContractSearchBar,
      },
      comments: {
        titleKey: 'Intervention_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 100, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
};
