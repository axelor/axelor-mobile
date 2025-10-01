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

import React from 'react';
import {
  ClearableCard,
  Screen,
  ScrollView,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {TrackingNumberSearchBar} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  OperationOrderHeader,
} from '../../../components';
import {
  CONSUMED_PRODUCT_CONTEXT,
  getConsumedProductScreenNames,
} from '../../../utils/consumedProductConsts';

const MANUF_ORDER_TRACKING_SCAN_KEY =
  'tracking-number_manufacturing-order-consumed-product-select';
const OPERATION_ORDER_TRACKING_SCAN_KEY =
  'tracking-number_operation-order-consumed-product-select';

const ConsumedProductSelectTrackingScreen = ({route, navigation}) => {
  const context =
    route?.params?.context ?? CONSUMED_PRODUCT_CONTEXT.MANUF_ORDER;
  const isOperationOrderContext =
    context === CONSUMED_PRODUCT_CONTEXT.OPERATION_ORDER;
  const manufOrder = route?.params?.manufOrder;
  const operationOrder = route?.params?.operationOrder;
  const product = route?.params?.product;
  const screenNames = getConsumedProductScreenNames(context);
  const trackingNumberScanKey = isOperationOrderContext
    ? OPERATION_ORDER_TRACKING_SCAN_KEY
    : MANUF_ORDER_TRACKING_SCAN_KEY;

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      const params = {
        context,
        manufOrder,
        manufOrderId: manufOrder?.id,
        product,
        trackingNumber: item,
      };

      if (isOperationOrderContext) {
        params.operationOrder = operationOrder;
        params.operationOrderId = operationOrder?.id;
      }

      navigation.navigate(screenNames.details, params);
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            {!isOperationOrderContext && manufOrder != null && (
              <ManufacturingOrderHeader
                parentMO={manufOrder?.parentMO}
                reference={manufOrder?.manufOrderSeq}
                status={manufOrder?.statusSelect}
                priority={manufOrder?.prioritySelect}
              />
            )}
            {isOperationOrderContext && operationOrder != null && (
              <OperationOrderHeader
                manufOrderRef={manufOrder?.manufOrderSeq}
                name={operationOrder?.operationName}
                status={operationOrder?.statusSelect}
                priority={operationOrder?.priority}
              />
            )}
          </>
        }
      />
      <ScrollView>
        <ClearableCard valueTxt={product.name} clearable={false} />
        <TrackingNumberSearchBar
          scanKey={trackingNumberScanKey}
          onChange={handleTrackingNumberSelection}
          isFocus={true}
          changeScreenAfter={true}
          product={product}
        />
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductSelectTrackingScreen;
