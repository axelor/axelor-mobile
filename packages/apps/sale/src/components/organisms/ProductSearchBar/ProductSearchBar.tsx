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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProduct} from '../../../features/productSlice';
import {useSellableByCompany} from '../../../hooks/use-product-by-company';

interface ProductSearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  isScrollViewContainer?: boolean;
}

const ProductSearchBar = ({
  style = null,
  title = 'Sale_Product',
  showTitle = false,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  isScrollViewContainer = false,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isSellableByCompany = useSellableByCompany();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {loadingList, moreLoading, isListEnd, productList} = useSelector(
    state => state.sale_product,
  );

  const searchProductAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchProduct as any)({
          useCompanySellable: isSellableByCompany,
          companyId: user.activeCompany?.id,
          page,
          searchValue,
          productTypeSelect: mobileSettings?.productTypesToDisplay.map(
            type => ({value: type}),
          ),
          isConfiguratorProductShown:
            mobileSettings?.isConfiguratorProductShown,
        }),
      );
    },
    [
      dispatch,
      isSellableByCompany,
      mobileSettings?.isConfiguratorProductShown,
      mobileSettings?.productTypesToDisplay,
      user.activeCompany?.id,
    ],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={productList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchProductAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default ProductSearchBar;
