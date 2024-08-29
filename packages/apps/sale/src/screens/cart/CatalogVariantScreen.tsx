/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  SearchListView,
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchVariantProduct} from '../../features/productSlice';
import {CartLineActionCard} from '../../components';
import {fetchActiveCart} from '../../features/cartSlice';

const catalogScanKey = 'sale_catalog_scanKey';

const CatalogVariantScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {userId} = useSelector((state: any) => state.auth);
  const {product} = useSelector((state: any) => state.sale_product);
  const {
    loadingVariantList,
    moreLoadingVariantList,
    isVariantListEnd,
    variantProductList,
  } = useSelector((state: any) => state.sale_product);
  const {activeCart} = useSelector((state: any) => state.sale_cart);

  useEffect(() => {
    dispatch((fetchActiveCart as any)({userId}));
  }, [dispatch, userId]);

  const sliceFunctionData = useMemo(
    () => ({
      parentProductId: product?.parentProduct?.id,
    }),
    [product?.parentProduct?.id],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        scanKeySearch={catalogScanKey}
        list={variantProductList}
        loading={loadingVariantList}
        moreLoading={moreLoadingVariantList}
        isListEnd={isVariantListEnd}
        sliceFunction={fetchVariantProduct}
        displaySearchValue={displayItemName}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        expandableFilter={false}
        renderListItem={({item}) => (
          <CartLineActionCard
            cartId={activeCart?.id}
            product={item}
            hideDelete={true}
            hideIncrement={true}
            hideVariant={true}
            addToCart={true}
          />
        )}
      />
    </Screen>
  );
};

export default CatalogVariantScreen;
