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
  GravityPicker,
  ProductSearchBar,
  QIDetectionSearchBar,
  QIMethodAnalysisSearchBar,
  SupplierOrderLineSearchBar,
  SupplierOrderSearchBar,
  SupplierSearchBar,
  TypePicker,
} from '../components';
import {
  updateGravityForm,
  updateTypeForm,
} from '../features/qualityImprovementSlice';
import {supplierPartnerForm} from '../features/partnerSlice';
import {supplierOrderPartnerForm} from '../features/purchaseOrderSlice';

export const quality_formsRegister: FormConfigs = {
  quality_qualityImprovement: {
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
    fields: {
      gravityTypeSelect: {
        titleKey: 'Quality_Gravity',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: GravityPicker,
      },
      type: {
        titleKey: 'Quality_Type',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: TypePicker,
      },
      qiDetection: {
        titleKey: 'Quality_QIDetection',
        type: 'object',
        widget: 'custom',
        customComponent: QIDetectionSearchBar,
        dependsOn: {
          type: ({newValue, dispatch}) => {
            dispatch(updateTypeForm(newValue));
          },
        },
      },
      analysisMethod: {
        titleKey: 'Quality_QIMethodAnalysis',
        type: 'object',
        widget: 'custom',
        customComponent: QIMethodAnalysisSearchBar,
        dependsOn: {
          type: ({newValue, dispatch}) => {
            dispatch(updateTypeForm(newValue));
          },
          gravityTypeSelect: ({newValue, dispatch}) => {
            dispatch(updateGravityForm(newValue));
          },
        },
      },
      // ------- SUPPLIER CASE ------- //
      supplierPartner: {
        titleKey: 'Quality_Supplier',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierSearchBar,
        hideIf: ({objectState}) => objectState?.qiDetection?.origin !== 1,
      },
      supplierPurchaseOrder: {
        titleKey: 'Quality_SupplierOrder',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierOrderSearchBar,
        hideIf: ({objectState}) => objectState?.qiDetection?.origin !== 1,
        dependsOn: {
          supplierPartner: ({newValue, dispatch}) => {
            dispatch(supplierPartnerForm(newValue));
          },
        },
      },
      supplierPurchaseOrderLine: {
        titleKey: 'Quality_SupplierOrderLine',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierOrderLineSearchBar,
        hideIf: ({objectState}) => objectState?.qiDetection?.origin !== 1,
        dependsOn: {
          supplierPurchaseOrder: ({newValue, dispatch}) => {
            dispatch(supplierOrderPartnerForm(newValue));
          },
        },
      },
      product: {
        titleKey: 'Quality_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        hideIf: ({objectState}) => objectState?.qiDetection?.origin !== 1,
      },
      nonConformingQuantity: {
        titleKey: 'Quality_NonConformingQuantity',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) => objectState?.qiDetection?.origin !== 1,
      },
    },
  },
};
