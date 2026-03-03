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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const purchase_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Purchase_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Requested',
            value: 2,
            title: 'Purchase_Status_Requested',
            color: 'progressColor',
          },
          {
            key: 'Accepted',
            value: 3,
            title: 'Purchase_Status_Accepted',
            color: 'plannedColor',
          },
          {
            key: 'Purchased',
            value: 4,
            title: 'Purchase_Status_Purchased',
            color: 'successColor',
          },
          {
            key: 'Refused',
            value: 5,
            title: 'Purchase_Status_Refused',
            color: 'errorColor',
          },
          {
            key: 'Canceled',
            value: 6,
            title: 'Purchase_Status_Canceled',
            color: 'cautionColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
    fields: {
      newProduct: {
        content: [
          {
            key: 'NewProduct',
            value: true,
            title: 'Purchase_NewProduct',
            color: 'plannedColor',
          },
          {
            key: 'ExistingProduct',
            value: false,
            title: 'Purchase_ExistingProduct',
            color: 'secondaryColor',
          },
        ],
      },
    },
  },
];
