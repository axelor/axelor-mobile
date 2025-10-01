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
import {Screen, ScrollView, HeaderContainer} from '@axelor/aos-mobile-ui';
import {ProductSearchBar} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  OperationOrderHeader,
} from '../../../components';
import {
  CONSUMED_PRODUCT_CONTEXT,
  getConsumedProductScreenNames,
} from '../../../utils/consumedProductConsts';

const MANUF_ORDER_PRODUCT_SCAN_KEY =
  'product_manufacturing-order-consumed-product-select';
const OPERATION_ORDER_PRODUCT_SCAN_KEY =
  'product_operation-order-consumed-product-select';

const ConsumedProductSelectProductScreen = ({route, navigation}) => {
  const context =
    route?.params?.context ?? CONSUMED_PRODUCT_CONTEXT.MANUF_ORDER;
  const isOperationOrderContext =
    context === CONSUMED_PRODUCT_CONTEXT.OPERATION_ORDER;
  const manufOrder = route?.params?.manufOrder;
  const operationOrder = route?.params?.operationOrder;
  const screenNames = getConsumedProductScreenNames(context);
  const productScanKey = isOperationOrderContext
    ? OPERATION_ORDER_PRODUCT_SCAN_KEY
    : MANUF_ORDER_PRODUCT_SCAN_KEY;

  const handleSelectProduct = product => {
    if (product != null) {
      const baseParams = {
        context,
        product,
        manufOrder,
        manufOrderId: manufOrder?.id,
      };

      if (isOperationOrderContext) {
        baseParams.operationOrder = operationOrder;
        baseParams.operationOrderId = operationOrder?.id;
      }

      if (product.trackingNumberConfiguration == null) {
        navigation.navigate(screenNames.details, baseParams);
      } else {
        navigation.navigate(screenNames.selectTracking, baseParams);
      }
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
        <ProductSearchBar
          scanKey={productScanKey}
          onChange={handleSelectProduct}
          isFocus={true}
        />
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductSelectProductScreen;
