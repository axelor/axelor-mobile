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

import React, {useEffect} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProduct} from '../../features/productSlice';
import {CatalogActionCard} from '../../components';
import {fetchActiveCart} from '../../features/cartSlice';

const catalogScanKey = 'sale_catalog_scanKey';

const CatalogScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {userId} = useSelector((state: any) => state.auth);
  const {productList, moreLoading, isListEnd, loadingList} = useSelector(
    (state: any) => state.sale_product,
  );

  useEffect(() => {
    dispatch((fetchActiveCart as any)({userId}));
  }, [dispatch, userId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        scanKeySearch={catalogScanKey}
        list={productList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchProduct}
        displaySearchValue={displayItemName}
        searchPlaceholder={I18n.t('Base_Search')}
        expandableFilter={false}
        renderListItem={({item}) => <CatalogActionCard product={item} />}
      />
    </Screen>
  );
};

export default CatalogScreen;
