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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ProductVariantCard} from '../../components';
import {
  fetchProductsAttributes,
  fetchProductVariants,
} from '../../features/productVariantSlice';
import {fetchProductsAvailability} from '../../features/productIndicatorsSlice';

const ProductListVariantScreen = ({route, navigation}) => {
  const product = route.params.product;
  const companyID = route.params.companyID;
  const stockLocationId = route.params.stockLocationId;
  const parentProductId = useMemo(
    () => product?.parentProduct?.id,
    [product?.parentProduct?.id],
  );
  const {
    loading,
    moreLoading,
    isListEnd,
    productListVariables,
    listProductsAttributes,
  } = useSelector(state => state.productVariant);
  const {listAvailabilty} = useSelector(state => state.productIndicators);
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

  useEffect(() => {
    if (productListVariables != null) {
      dispatch(
        fetchProductsAvailability({
          productList: productListVariables,
          companyId: companyID,
          stockLocationId: stockLocationId,
        }),
      );
      dispatch(fetchProductsAttributes({productList: productListVariables}));
    }
  }, [companyID, dispatch, productListVariables, stockLocationId]);

  const navigateToProductVariable = productVar => {
    navigation.navigate('ProductStockDetailsScreen', {product: productVar});
  };

  return (
    <Screen>
      <ScrollList
        loadingList={loading}
        data={productListVariables}
        renderItem={({item, index}) => (
          <ProductVariantCard
            style={styles.item}
            name={item.name}
            code={item.code}
            attributesList={
              listProductsAttributes ? listProductsAttributes[index] : null
            }
            key={item.id}
            picture={item.picture}
            stockAvailability={
              listAvailabilty ? listAvailabilty[index]?.availableStock : 0
            }
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

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 25,
  },
});

export default ProductListVariantScreen;
