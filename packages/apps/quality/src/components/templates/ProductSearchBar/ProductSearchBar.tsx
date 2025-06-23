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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProduct} from '../../../features/productSlice';

interface ProductSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
  objectState?: any;
}

const ProductSearchBarAux = ({
  style,
  title = 'Quality_Product',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  objectState,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProducts, moreLoadingProduct, isListEndProduct, productList} =
    useSelector((state: any) => state.quality_product);

  const productIdsList = useMemo(() => {
    const ids = new Set<number>();

    if (objectState?.supplierPurchaseOrderLine?.product?.id) {
      ids.add(objectState.supplierPurchaseOrderLine.product.id);
    }

    if (objectState?.manufOrder?.product?.id) {
      ids.add(objectState.manufOrder.product.id);
    }

    if (objectState?.manufOrder?.billOfMaterial?.product?.id) {
      const bomProductId = objectState.manufOrder.billOfMaterial.product.id;
      const moProductId = objectState.manufOrder.product?.id;
      if (bomProductId !== moProductId) {
        ids.add(bomProductId);
      }
    }

    if (objectState?.customerSaleOrderLine?.product?.id) {
      ids.add(objectState.customerSaleOrderLine.product.id);
    }

    return Array.from(ids);
  }, [objectState]);

  const searchProductAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchProduct as any)({page, searchValue, productIdsList}));
    },
    [dispatch, productIdsList],
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
