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
import {useSelector} from '@axelor/aos-mobile-core';
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

const trackingNumberScanKey =
  'tracking-number_manufacturing-order-consumed-product-select';

const ConsumedProductSelectTrackingScreen = ({route, navigation}) => {
  const {manufOrder, operationOrderId, product} = route?.params ?? {};

  const {operationOrder} = useSelector(state => state.operationOrder);

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      navigation.navigate('ConsumedProductDetailsScreen', {
        manufOrderId: manufOrder.id,
        operationOrderId,
        product,
        trackingNumber: item,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          operationOrderId != null ? (
            <OperationOrderHeader
              manufOrderRef={manufOrder?.manufOrderSeq}
              name={operationOrder?.operationName}
              status={operationOrder?.statusSelect}
              priority={operationOrder?.priority}
            />
          ) : (
            <ManufacturingOrderHeader
              parentMO={manufOrder?.parentMO}
              reference={manufOrder?.manufOrderSeq}
              status={manufOrder?.statusSelect}
              priority={manufOrder?.prioritySelect}
            />
          )
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
