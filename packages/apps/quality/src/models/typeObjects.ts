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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const quality_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.quality.db.ControlEntry',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Quality_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'InProgress',
            value: 2,
            title: 'Quality_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'Completed',
            value: 3,
            title: 'Quality_Status_Completed',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 4,
            title: 'Quality_Status_Canceled',
            color: 'errorColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.quality.db.ControlEntrySample',
    fields: {
      resultSelect: {
        content: [
          {
            key: 'NotControlled',
            value: 1,
            title: 'Quality_ControlResult_NotControlled',
            color: 'secondaryColor',
          },
          {
            key: 'Compliant',
            value: 2,
            title: 'Quality_ControlResult_Compliant',
            color: 'successColor',
          },
          {
            key: 'NotCompliant',
            value: 3,
            title: 'Quality_ControlResult_NotCompliant',
            color: 'errorColor',
          },
        ],
      },
    },
  },
];
