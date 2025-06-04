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

import {FormConfigs, getTypes} from '@axelor/aos-mobile-core';
import {
  CustomerOrderLineSearchBar,
  CustomerOrderSearchBar,
  CustomerSearchBar,
  GravityPicker,
  ProductSearchBar,
  QIDetectionSearchBar,
  QIMethodAnalysisSearchBar,
  QIStepper,
  SupplierOrderLineSearchBar,
  SupplierOrderSearchBar,
  SupplierSearchBar,
  TypePicker,
} from '../components';
import {
  updateGravityForm,
  updateTypeForm,
} from '../features/qualityImprovementSlice';
import {
  supplierPartnerForm,
  updateCustomerPartnerForm,
} from '../features/partnerSlice';
import {supplierOrderPartnerForm} from '../features/purchaseOrderSlice';
import {updateCustomerOrderPartnerForm} from '../features/saleOrderSlice';

const Steps = {
  detection: 0,
  identification: 1,
  defaults: 2,
};

export const quality_formsRegister: FormConfigs = {
  quality_qualityImprovement: {
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
    fields: {
      stepper: {
        widget: 'custom',
        type: 'string',
        customComponent: QIStepper,
      },
      gravityTypeSelect: {
        titleKey: 'Quality_Gravity',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: GravityPicker,
        hideIf: ({objectState}) => objectState?.stepper !== Steps.detection,
      },
      type: {
        titleKey: 'Quality_Type',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: TypePicker,
        hideIf: ({objectState}) => objectState?.stepper !== Steps.detection,
      },
      qiDetection: {
        titleKey: 'Quality_QIDetection',
        type: 'object',
        widget: 'custom',
        customComponent: QIDetectionSearchBar,
        hideIf: ({objectState}) => objectState?.stepper !== Steps.detection,
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
        hideIf: ({objectState}) => objectState?.stepper !== Steps.detection,
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
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.supplier ||
            objectState?.stepper !== Steps.identification
          );
        },
      },
      supplierPurchaseOrder: {
        titleKey: 'Quality_SupplierOrder',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierOrderSearchBar,
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.supplier ||
            objectState?.stepper !== Steps.identification
          );
        },
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
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.supplier ||
            objectState?.stepper !== Steps.identification
          );
        },
        dependsOn: {
          supplierPurchaseOrder: ({newValue, dispatch}) => {
            dispatch(supplierOrderPartnerForm(newValue));
          },
        },
      },
      // ------- CUSTOMER CASE ------- //
      customerPartner: {
        titleKey: 'Quality_Customer',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerSearchBar,
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.customer ||
            objectState?.stepper !== Steps.identification
          );
        },
      },
      customerSaleOrder: {
        titleKey: 'Quality_CustomerOrder',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerOrderSearchBar,
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.customer ||
            objectState?.stepper !== Steps.identification
          );
        },
        dependsOn: {
          customerPartner: ({newValue, dispatch}) => {
            dispatch(updateCustomerPartnerForm(newValue));
          },
        },
      },
      customerSaleOrderLine: {
        titleKey: 'Quality_CustomerOrderLine',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerOrderLineSearchBar,
        hideIf: ({objectState}) => {
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.customer ||
            objectState?.stepper !== Steps.identification
          );
        },
        dependsOn: {
          customerSaleOrder: ({newValue, dispatch}) => {
            dispatch(updateCustomerOrderPartnerForm(newValue));
          },
        },
      },
      product: {
        titleKey: 'Quality_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        hideIf: ({objectState}) => {
          const QualityImprovement = getTypes().QualityImprovement;
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.supplier ||
            objectState?.stepper !== Steps.identification ||
            objectState?.type === QualityImprovement?.type?.System
          );
        },
      },
      nonConformingQuantity: {
        titleKey: 'Quality_NonConformingQuantity',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) => {
          const QualityImprovement = getTypes().QualityImprovement;
          const QIDetection = getTypes().QIDetection;
          return (
            objectState?.qiDetection?.origin !== QIDetection.origin.supplier ||
            objectState?.stepper !== Steps.identification ||
            objectState?.type === QualityImprovement?.type?.System
          );
        },
      },
    },
  },
};
