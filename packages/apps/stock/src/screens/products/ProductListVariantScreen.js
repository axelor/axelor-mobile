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

import React, {useCallback, useMemo} from 'react';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ProductVariantCard} from '../../components';
import {fetchProductVariants} from '../../features/productVariantSlice';

const ProductListVariantScreen = ({route, navigation}) => {
  const product = route.params.product;
  const companyID = route.params.companyID;
  const stockLocationId = route.params.stockLocationId;
  const parentProductId = useMemo(
    () => product?.parentProduct?.id,
    [product?.parentProduct?.id],
  );
  const {loadingProductList, moreLoading, isListEnd, productListVariables} =
    useSelector(state => state.productVariant);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchVariantsAPI = useCallback(
    page => {
      if (parentProductId) {
        dispatch(
          fetchProductVariants({
            productVariantParentId: parentProductId,
            page: page,
          }),
        );
      }
    },
    [dispatch, parentProductId],
  );

  const navigateToProductVariable = productVar => {
    navigation.popTo('ProductStockDetailsScreen', {product: productVar});
  };

  return (
    <Screen>
      <ScrollList
        loadingList={loadingProductList}
        data={productListVariables}
        renderItem={({item}) => (
          <ProductVariantCard
            key={item.id}
            name={item.name}
            code={item.code}
            productId={item.id}
            productVersion={item.version}
            availabiltyData={{stockLocationId, companyId: companyID}}
            picture={item.picture}
            onPress={() => navigateToProductVariable(item)}
          />
        )}
        fetchData={fetchVariantsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ProductListVariantScreen;
