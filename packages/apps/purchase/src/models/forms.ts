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
import {
  HorizontalOrRuleText,
  ProductSearchBar,
  UnitSearchBar,
} from '../components';

export const purchase_formsRegister: FormConfigs = {
  purchase_purchaseRequestLine: {
    modelName: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
    fields: {
      product: {
        titleKey: 'Purchase_Product',
        type: 'object',
        widget: 'custom',
        requiredIf: ({objectState}) => {
          return objectState?.productTitle == null;
        },
        customComponent: ProductSearchBar,
        options: {showTitle: true},
      },
      orRule: {
        titleKey: 'Purchase_Product',
        type: 'object',
        widget: 'custom',
        readonly: true,
        customComponent: HorizontalOrRuleText,
      },
      productTitle: {
        titleKey: 'Purchase_ProductTitle',
        type: 'string',
        readonlyIf: ({objectState}) => {
          return objectState?.product != null;
        },
        requiredIf: ({objectState}) => {
          return objectState?.product == null;
        },
        dependsOn: {
          product: ({newValue}) => {
            return newValue?.name;
          },
        },
      },
      quantity: {
        titleKey: 'Purchase_Quantity',
        type: 'number',
        widget: 'increment',
        required: true,
      },
      unit: {
        titleKey: 'Purchase_Unit',
        type: 'object',
        widget: 'custom',
        customComponent: UnitSearchBar,
        options: {showTitle: true},
      },
    },
  },
};
