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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const crm_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.crm.db.Event',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Planned',
            value: 1,
            title: 'Crm_Status_Planned',
            color: 'secondaryColor',
          },
          {
            key: 'Realized',
            value: 2,
            title: 'Crm_Status_Realized',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 3,
            title: 'Crm_Status_Canceled',
            color: 'cautionColor',
          },
        ],
      },
      typeSelect: {
        useWebContent: true,
        content: [
          {
            key: 'Event',
            value: 0,
            title: 'Crm_Event_Category_Event',
            color: 'plannedColor',
          },
          {
            key: 'Call',
            value: 1,
            title: 'Crm_Event_Category_Call',
            color: 'priorityColor',
          },
          {
            key: 'Meeting',
            value: 2,
            title: 'Crm_Event_Category_Meeting',
            color: 'primaryColor',
          },
          {
            key: 'Task',
            value: 3,
            title: 'Crm_Event_Category_Task',
            color: 'progressColor',
          },
          {
            key: 'Leave',
            value: 4,
            title: 'Crm_Event_Category_Leave',
            color: 'secondaryColor',
          },
          {
            key: 'Note',
            value: 5,
            title: 'Crm_Event_Category_Note',
            color: 'importantColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.base.db.Partner',
    fields: {
      partnerTypeSelect: {
        content: [
          {
            key: 'Company',
            value: 1,
            title: 'Crm_PartnerType_Company',
          },
          {
            key: 'Individual',
            value: 2,
            title: 'Crm_PartnerType_Individual',
          },
        ],
      },
      titleSelect: {
        useWebContent: true,
        content: [
          {
            key: 'M',
            value: 1,
            title: 'Crm_Civility_M',
          },
          {
            key: 'Ms',
            value: 2,
            title: 'Crm_Civility_Ms',
          },
          {
            key: 'Mx',
            value: 3,
            title: 'Crm_Civility_Mx',
          },
        ],
      },
    },
  },
];
