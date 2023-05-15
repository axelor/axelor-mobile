/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ManufacturingOrderHeader} from '../../../components';

const productScanKey = 'product_manufacturing-order-consumed-product-select';

const ConsumedProductSelectProductScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;

  const handleSelectProduct = product => {
    if (product != null) {
      if (product.trackingNumberConfiguration == null) {
        navigation.navigate('ConsumedProductDetailsScreen', {
          manufOrder: manufOrder,
          product: product,
        });
      } else {
        navigation.navigate('ConsumedProductSelectTrackingScreen', {
          manufOrder: manufOrder,
          product: product,
        });
      }
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
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
