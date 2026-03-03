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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProduct} from '../../../features/productSlice';
import {searchBoMLines} from '../../../features/manufOrderSlice';

interface ProductSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange: (value: any) => void;
  objectState?: any;
  readonly?: boolean;
  required?: boolean;
}

const ProductSearchBarAux = ({
  style,
  title = 'Quality_Product',
  defaultValue,
  onChange,
  objectState,
  readonly = false,
  required = false,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProducts, moreLoadingProduct, isListEndProduct, productList} =
    useSelector((state: any) => state.quality_product);
  const {bomLineList} = useSelector((state: any) => state.quality_manufOrder);

  useEffect(() => {
    dispatch(
      (searchBoMLines as any)({
        bomId: objectState?.manufOrder?.billOfMaterial?.id,
      }),
    );
  }, [dispatch, objectState?.manufOrder?.billOfMaterial?.id]);

  const productSet = useMemo(() => {
    return [
      objectState?.supplierPurchaseOrderLine?.product,
      objectState?.customerSaleOrderLine?.product,
      objectState?.manufOrder?.product,
      ...(bomLineList?.map(({product}) => product) ?? []),
    ]
      .filter(_p => !!_p)
      .filter(({id}, idx, self) => self.findIndex(_i => _i?.id === id) === idx);
  }, [
    bomLineList,
    objectState?.customerSaleOrderLine?.product,
    objectState?.manufOrder?.product,
    objectState?.supplierPurchaseOrderLine?.product,
  ]);

  useEffect(() => {
    if (!defaultValue) {
      onChange(productSet.length === 1 ? productSet[0] : undefined);
    }
  }, [defaultValue, onChange, productSet]);

  const searchProductAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchProduct as any)({
          page,
          searchValue,
          productIds: productSet.map(_p => _p.id),
        }),
      );
    },
    [dispatch, productSet],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={productList}
      loadingList={loadingProducts}
      moreLoading={moreLoadingProduct}
      isListEnd={isListEndProduct}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchProductAPI}
      displayValue={displayItemFullname}
      required={required}
      readonly={readonly}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ProductSearchBar = (props: ProductSearchBarProps) => {
  return <ProductSearchBarAux {...props} />;
};

export default ProductSearchBar;
