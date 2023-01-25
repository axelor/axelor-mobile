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

import React, {useCallback} from 'react';
import {Screen, ScrollView, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader} from '../../../components/organisms';
import {searchProducts} from '@axelor/aos-mobile-stock';

const productScanKey = 'product_manufacturing-order-produced-product-select';

const ProducedProductSelectProductScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {productList} = useSelector(state => state.product);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleSelectProduct = product => {
    if (product != null) {
      if (product.trackingNumberConfiguration == null) {
        navigation.navigate('ProducedProductDetailsScreen', {
          manufOrder: manufOrder,
          product: product,
        });
      } else {
        navigation.navigate('ProducedProductSelectTrackingScreen', {
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
        <ScannerAutocompleteSearch
          objectList={productList}
          onChangeValue={handleSelectProduct}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          placeholder={I18n.t('Manufacturing_Product')}
          scanKeySearch={productScanKey}
          isFocus={true}
          changeScreenAfter={true}
        />
      </ScrollView>
    </Screen>
  );
};

export default ProducedProductSelectProductScreen;
