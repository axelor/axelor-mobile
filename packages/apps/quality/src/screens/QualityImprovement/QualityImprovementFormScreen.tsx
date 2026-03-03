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

import React, {useEffect, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  FormView,
  useDispatch,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {QIFormButton} from '../../components';
import {fetchQualityImprovement} from '../../features/qualityImprovementSlice';
import {
  fetchStockMove,
  fetchStockMoveLine,
} from '../../features/stockMoveSlice';
import {fetchManufOrder} from '../../features/manufOrderSlice';
import {fetchOperationOrder} from '../../features/operationOrderSlice';
import {QualityImprovement as QualityImprovementType} from '../../types';
import {fetchQIDetection} from '../../features/qiDetectionSlice';

const QualityImprovementFormScreen = ({route}) => {
  const {
    qualityImprovementId: qiId,
    stockMoveId,
    stockMoveLineId,
    manufOrderId,
    operationOrderId,
  } = route.params ?? {};
  const dispatch = useDispatch();
  const {QualityImprovement, QIDetection} = useTypes();

  const {qualityImprovement} = useSelector(
    state => state.quality_qualityImprovement,
  );
  const {stockMove, stockMoveLine} = useSelector(
    state => state.quality_stockMove,
  );
  const {manufOrder} = useSelector(state => state.quality_manufOrder);
  const {operationOrder} = useSelector(state => state.quality_operationOrder);
  const {qiDetection} = useSelector(state => state.quality_qiDetection);
  const {mobileSettings} = useSelector(state => state.appConfig);

  useEffect(() => {
    mobileSettings?.defaultQiDetectionId &&
      dispatch(
        (fetchQIDetection as any)({
          id: mobileSettings?.defaultQiDetectionId,
        }),
      );
    qiId && dispatch((fetchQualityImprovement as any)({id: qiId}));
    stockMoveId && dispatch((fetchStockMove as any)({id: stockMoveId}));
    stockMoveLineId &&
      dispatch((fetchStockMoveLine as any)({id: stockMoveLineId}));
    manufOrderId && dispatch((fetchManufOrder as any)({id: manufOrderId}));
    operationOrderId &&
      dispatch((fetchOperationOrder as any)({id: operationOrderId}));
  }, [
    dispatch,
    manufOrderId,
    mobileSettings?.defaultQiDetectionId,
    operationOrderId,
    qiId,
    stockMoveId,
    stockMoveLineId,
  ]);

  const _defaultValue = useMemo(() => {
    let baseValue: any = {
      stepper: QualityImprovementType.Steps.detection,
      type: QualityImprovement?.type.Product,
    };

    if (mobileSettings?.defaultQiDetectionId) {
      baseValue.qiDetection = qiDetection;
      baseValue.type = qiDetection?.isProductOrigin
        ? QualityImprovement?.type.Product
        : QualityImprovement?.type.System;
    }

    if (stockMoveId) {
      if (stockMove?.purchaseOrderSet) {
        baseValue.purchaseOrderIdList = stockMove?.purchaseOrderSet?.map(
          ({id}) => id,
        );
        baseValue.detectionOrigin = QIDetection?.origin.Supplier;
      } else if (stockMove?.saleOrderSet) {
        baseValue.saleOrderIdList = stockMove?.saleOrderSet?.map(({id}) => id);
        baseValue.detectionOrigin = QIDetection?.origin.Customer;
      }
    }

    if (stockMoveLineId) {
      if (stockMoveLine?.purchaseOrderLine) {
        baseValue.supplierPartner =
          stockMoveLine?.purchaseOrderLine?.purchaseOrder?.supplierPartner;
        baseValue.supplierPurchaseOrder =
          stockMoveLine?.purchaseOrderLine?.purchaseOrder;
        baseValue.supplierPurchaseOrderLine = stockMoveLine?.purchaseOrderLine;
        baseValue.detectionOrigin = QIDetection?.origin.Supplier;
      } else if (stockMoveLine?.saleOrderLine) {
        baseValue.customerPartner =
          stockMoveLine?.saleOrderLine?.saleOrder?.clientPartner;
        baseValue.customerSaleOrder = stockMoveLine?.saleOrderLine?.saleOrder;
        baseValue.customerSaleOrderLine = stockMoveLine?.saleOrderLine;
        baseValue.detectionOrigin = QIDetection?.origin.Customer;
      }
    }

    if (manufOrderId) {
      baseValue.manufOrder = manufOrder;
      baseValue.detectionOrigin = QIDetection?.origin.Internal;
    }

    if (operationOrderId) {
      baseValue.operationOrder = operationOrder;
      baseValue.manufOrder = operationOrder?.manufOrder;
      baseValue.detectionOrigin = QIDetection?.origin.Internal;
    }

    if (!qiId || qualityImprovement?.id !== qiId) {
      return baseValue;
    }

    const {qiIdentification, qiResolution} = qualityImprovement;

    return {
      ...baseValue,
      ...qiIdentification,
      ...qualityImprovement,
      qiResolutionDefaults:
        qiResolution?.qiResolutionDefaultsList?.map(
          ({id, name, qiDefault, quantity, description}, idx: number) => ({
            id: `qiDefault-${qiDefault.id}.${idx}`,
            _id: id,
            name,
            qiDefault,
            qty: parseFloat(quantity),
            description,
          }),
        ) ?? [],
    };
  }, [
    QIDetection?.origin,
    QualityImprovement?.type,
    manufOrder,
    manufOrderId,
    operationOrder,
    operationOrderId,
    qiDetection,
    qiId,
    qualityImprovement,
    mobileSettings?.defaultQiDetectionId,
    stockMove,
    stockMoveId,
    stockMoveLine,
    stockMoveLineId,
  ]);

  return (
    <Screen>
      <FormView
        defaultValue={_defaultValue}
        formKey="quality_qualityImprovement"
        defaultEditMode
        floatingTools={false}
        actions={[
          {
            key: 'navigation-button',
            type: 'custom',
            customComponent: <QIFormButton />,
          },
        ]}
      />
    </Screen>
  );
};

export default QualityImprovementFormScreen;
