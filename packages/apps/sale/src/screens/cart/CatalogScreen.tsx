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

import React, {useEffect, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {CatalogActionCard} from '../../components';
import {searchProduct} from '../../features/productSlice';
import {fetchActiveCart} from '../../features/cartSlice';

const catalogScanKey = 'sale_catalog_scanKey';

const CatalogScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {productList, moreLoading, isListEnd, loadingList} = useSelector(
    (state: any) => state.sale_product,
  );

  useEffect(() => {
    dispatch(
      (fetchActiveCart as any)({
        userId: user.id,
        companyId: user.activeCompany?.id,
      }),
    );
  }, [dispatch, user]);

  const sliceFunctionData = useMemo(
    () => ({
      productTypeSelect: mobileSettings?.productTypesToDisplay.map(type => ({
        value: type,
      })),
      isConfiguratorProductShown: mobileSettings?.isConfiguratorProductShown,
      isGenericProductShown: mobileSettings?.isGenericProductShown,
    }),
    [mobileSettings],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        scanKeySearch={catalogScanKey}
        list={productList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchProduct}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={displayItemName}
        searchPlaceholder={I18n.t('Base_Search')}
        expandableFilter={false}
        renderListItem={({item}) => <CatalogActionCard product={item} />}
      />
    </Screen>
  );
};

export default CatalogScreen;
