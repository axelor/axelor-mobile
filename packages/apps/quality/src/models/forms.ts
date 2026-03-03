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

import {FormConfigs, getTypes} from '@axelor/aos-mobile-core';
import {
  CustomerOrderLineSearchBar,
  CustomerOrderSearchBar,
  CustomerSearchBar,
  DefectViewAllList,
  GravityPicker,
  ManufOrderSearchBar,
  OperationLineSearchBar,
  ProductSearchBar,
  QIDetectionSearchBar,
  QIAnalysisMethodSearchBar,
  QIStepper,
  SupplierOrderLineSearchBar,
  SupplierOrderSearchBar,
  SupplierSearchBar,
  TypePicker,
} from '../components';
import {QualityImprovement as QI_Type} from '../types';

const Steps = QI_Type.Steps;

const isStep = (state: any, wantedStep: number) =>
  state?.stepper === wantedStep;

const isType = (state: any, wantedTypeKey: string) =>
  state?.type === getTypes().QualityImprovement?.type?.[wantedTypeKey];

const isOrigin = (state: any, wantedOriginKey: string) => {
  const _origin = state?.detectionOrigin ?? state?.qiDetection?.origin;
  return _origin === getTypes().QIDetection?.origin?.[wantedOriginKey];
};

export const quality_formsRegister: FormConfigs = {
  quality_qualityImprovement: {
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
    panels: {
      header: {direction: 'row', colSpan: 12},
      headerLeft: {direction: 'column', colSpan: 6, parent: 'header'},
      headerRight: {direction: 'column', colSpan: 6, parent: 'header'},
    },
    fields: {
      stepper: {widget: 'custom', type: 'number', customComponent: QIStepper},
      type: {
        titleKey: 'Quality_Type',
        widget: 'custom',
        type: 'number',
        customComponent: TypePicker,
        hideIf: ({objectState}) => !isStep(objectState, Steps.detection),
        parentPanel: 'headerLeft',
      },
      gravityTypeSelect: {
        titleKey: 'Quality_Gravity',
        widget: 'custom',
        type: 'number',
        customComponent: GravityPicker,
        hideIf: ({objectState}) => !isStep(objectState, Steps.detection),
        parentPanel: 'headerRight',
      },
      qiDetection: {
        titleKey: 'Quality_Detection',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: QIDetectionSearchBar,
        hideIf: ({objectState}) => !isStep(objectState, Steps.detection),
        dependsOn: {type: () => null},
      },
      analysisMethod: {
        titleKey: 'Quality_AnalysisMethod',
        type: 'object',
        widget: 'custom',
        customComponent: QIAnalysisMethodSearchBar,
        hideIf: ({objectState}) => !isStep(objectState, Steps.detection),
        dependsOn: {type: () => null, gravityTypeSelect: () => null},
      },
      supplierPartner: {
        titleKey: 'Quality_Supplier',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Supplier') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Supplier')
              ? undefined
              : objectState.supplierPartner,
          supplierPurchaseOrder: ({newValue, objectState}) =>
            objectState?.supplierPartner ?? newValue?.supplierPartner,
        },
      },
      supplierPurchaseOrder: {
        titleKey: 'Quality_SupplierOrder',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierOrderSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Supplier') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          supplierPartner: () => null,
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Supplier')
              ? undefined
              : objectState.supplierPurchaseOrder,
        },
      },
      supplierPurchaseOrderLine: {
        titleKey: 'Quality_SupplierOrderLine',
        type: 'object',
        widget: 'custom',
        customComponent: SupplierOrderLineSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Supplier') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          supplierPurchaseOrder: () => null,
          supplierPartner: () => null,
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Supplier')
              ? undefined
              : objectState.supplierPurchaseOrderLine,
        },
      },
      customerPartner: {
        titleKey: 'Quality_Customer',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerSearchBar,
        hideIf: ({objectState}) =>
          !(
            isOrigin(objectState, 'Customer') ||
            isOrigin(objectState, 'Internal')
          ) || !isStep(objectState, Steps.identification),
        dependsOn: {
          qiDetection: ({objectState}) =>
            !(
              isOrigin(objectState, 'Customer') ||
              isOrigin(objectState, 'Internal')
            )
              ? undefined
              : objectState.customerPartner,
          customerSaleOrder: ({newValue, objectState}) =>
            objectState?.customerPartner ?? newValue?.clientPartner,
        },
      },
      customerSaleOrder: {
        titleKey: 'Quality_CustomerOrder',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerOrderSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Customer') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          customerPartner: () => null,
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Customer')
              ? undefined
              : objectState.customerSaleOrder,
        },
      },
      customerSaleOrderLine: {
        titleKey: 'Quality_CustomerOrderLine',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerOrderLineSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Customer') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          customerSaleOrder: () => null,
          customerPartner: () => null,
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Customer')
              ? undefined
              : objectState.customerSaleOrderLine,
        },
      },
      manufOrder: {
        titleKey: 'Quality_ManufOrder',
        type: 'object',
        widget: 'custom',
        customComponent: ManufOrderSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Internal') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Internal')
              ? undefined
              : objectState.manufOrder,
        },
      },
      operationOrder: {
        titleKey: 'Quality_OperationLine',
        type: 'object',
        widget: 'custom',
        customComponent: OperationLineSearchBar,
        hideIf: ({objectState}) =>
          !isOrigin(objectState, 'Internal') ||
          !isStep(objectState, Steps.identification),
        dependsOn: {
          manufOrder: () => null,
          qiDetection: ({objectState}) =>
            !isOrigin(objectState, 'Internal')
              ? undefined
              : objectState.operationOrder,
        },
      },
      product: {
        titleKey: 'Quality_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        hideIf: ({objectState}) =>
          !isStep(objectState, Steps.identification) ||
          isType(objectState, 'System'),
        dependsOn: {
          manufOrder: () => null,
          customerSaleOrderLine: () => null,
          supplierPurchaseOrderLine: () => null,
        },
      },
      nonConformingQuantity: {
        titleKey: 'Quality_NonConformingQuantity',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) =>
          !isStep(objectState, Steps.identification) ||
          isType(objectState, 'System'),
      },
      qiResolutionDefaults: {
        titleKey: 'Quality_Defaults',
        type: 'array',
        widget: 'custom',
        customComponent: DefectViewAllList,
        hideIf: ({objectState}) => !isStep(objectState, Steps.defaults),
      },
    },
  },
};
