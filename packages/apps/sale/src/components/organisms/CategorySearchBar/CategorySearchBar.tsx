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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomerCategory} from '../../../features/customerSlice';

interface CategorySearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const CategorySearchBar = ({
  style = null,
  title = 'Sale_Category',
  showTitle = false,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: CategorySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingCategoryList,
    moreLoadingCategoryList,
    isCategoryListEnd,
    customerCategoryList,
  } = useSelector((state: any) => state.sale_customer);

  const searchCustomerCategoryAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchCustomerCategory as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={customerCategoryList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchCustomerCategoryAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingCategoryList}
      moreLoading={moreLoadingCategoryList}
      isListEnd={isCategoryListEnd}
      navigate={false}
      oneFilter={false}
    />
  );
};

export default CategorySearchBar;
