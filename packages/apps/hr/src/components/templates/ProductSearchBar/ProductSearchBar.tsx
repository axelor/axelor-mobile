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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProduct} from '../../../features/projectSlice';

interface ProductSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const ProductSearchBarAux = ({
  style = null,
  title = 'Hr_Product',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProduct, moreLoadingProduct, isListEndProduct, productList} =
    useSelector((state: any) => state.hr_project);

  const searchProductAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchProduct as any)({
          page,
          searchValue,
        }),
      );
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={productList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchProductAPI}
      displayValue={displayItemFullname}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingProduct}
      moreLoading={moreLoadingProduct}
      isListEnd={isListEndProduct}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ProductSearchBar = ({
  style = null,
  title = 'Hr_Product',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ProductSearchBarProps) => {
  return (
    <ProductSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default ProductSearchBar;
