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

import React, {useMemo} from 'react';
import {
  SearchListView,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen} from '@axelor/aos-mobile-ui';
import {ProductHeader, VariantProductCard} from '../../components';
import {fetchVariantProduct} from '../../features/productSlice';

const VariantProductsScreen = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {product} = useSelector((state: any) => state.sale_product);
  const {
    loadingVariantList,
    moreLoadingVariantList,
    isVariantListEnd,
    variantProductList,
  } = useSelector((state: any) => state.sale_product);

  const sliceFunctionData = useMemo(
    () => ({
      parentProductId: product?.parentProduct?.id ?? product?.id,
    }),
    [product?.id, product?.parentProduct?.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={variantProductList}
        loading={loadingVariantList}
        moreLoading={moreLoadingVariantList}
        isListEnd={isVariantListEnd}
        sliceFunction={fetchVariantProduct}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        topFixedItems={<ProductHeader />}
        expandableFilter={false}
        renderListItem={({item}) => (
          <VariantProductCard
            picture={item.picture}
            name={item.name}
            code={item.code}
            price={item.salePrice}
            unit={item.saleCurrency?.symbol}
            inAti={item.inAti}
            id={item.id}
            version={item.version}
            onPress={() =>
              navigation.navigate('ProductSaleDetailsScreen', {
                productId: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
};

export default VariantProductsScreen;
