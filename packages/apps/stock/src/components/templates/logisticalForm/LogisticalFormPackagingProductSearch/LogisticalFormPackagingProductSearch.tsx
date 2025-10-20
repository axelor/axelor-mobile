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

import React, {useCallback, useEffect} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchPackagingProducts} from '../../../../features/packagingSlice';

const LogisticalFormPackagingProductSearchAux = ({
  style,
  defaultValue,
  onChange,
}: {
  style?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    packagingProductList,
    loadingPackagingProducts,
    moreLoadingPackagingProducts,
    isListEndPackagingProducts,
  } = useSelector((state: any) => state.stock_packaging);

  const fetchProducts = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((fetchPackagingProducts as any)({page, searchValue}));
    },
    [dispatch],
  );

  const displayProduct = useCallback((product: any) => product?.fullName, []);

  useEffect(() => {
    fetchProducts({page: 0, searchValue: null});
  }, [fetchProducts]);

  return (
    <AutoCompleteSearch
      style={style}
      objectList={packagingProductList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchProducts}
      displayValue={displayProduct}
      placeholder={I18n.t('Stock_PackagingUsed')}
      showDetailsPopup={true}
      loadingList={loadingPackagingProducts}
      moreLoading={moreLoadingPackagingProducts}
      isListEnd={isListEndPackagingProducts}
      oneFilter={false}
      selectLastItem={false}
    />
  );
};

const LogisticalFormPackagingProductSearch = (props: any) => {
  return <LogisticalFormPackagingProductSearchAux {...props} />;
};

export default LogisticalFormPackagingProductSearch;
