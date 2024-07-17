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

import React, {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList, Text} from '@axelor/aos-mobile-ui';
import {
  fetchPurchaseOrderQtyIndicator,
  fetchSaleOrderQtyIndicator,
  fetchStockQtyIndicator,
} from '../../features/productIndicatorsSlice';
import {StockQtyIndicatorCard} from '../../components';
import {StockIndicator} from '../../types';

const ProductStockIndicatorDetails = ({route}) => {
  const indicatorType = route?.params?.type;
  const stockLocationId = route?.params?.stockLocationId;
  const companyId = route?.params?.companyId;
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);
  const {
    loadingStockQty,
    moreLoadingStockQty,
    isListEndStockQty,
    stockQtyList,

    loadingSaleOrderQty,
    moreLoadingSaleOrderQty,
    isListEndSaleOrderQty,
    saleOrderQtyList,

    loadingPurchaseOrderQty,
    moreLoadingPurchaseOrderQty,
    isListEndPurchaseOrderQty,
    purchaseOrderQtyList,
  } = useSelector((state: any) => state.productIndicators);

  const stockQtyStatus = useMemo(
    () =>
      indicatorType === StockIndicator.type.RealQty
        ? StockMove?.statusSelect.Realized
        : StockMove?.statusSelect.Planned,
    [indicatorType, StockMove?.statusSelect],
  );

  const fetchStockQtyIndicatorAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchStockQtyIndicator as any)({
          status: stockQtyStatus,
          isAllocatedQty: indicatorType === StockIndicator.type.AllocatedQty,
          productId: product?.id,
          stockLocationId,
          companyId,
          page,
        }),
      );
    },
    [
      companyId,
      dispatch,
      indicatorType,
      product?.id,
      stockLocationId,
      stockQtyStatus,
    ],
  );

  const fetchQtyIndicatorAPI = useCallback(
    (page = 0) => {
      const sliceFunction =
        indicatorType === StockIndicator.type.SaleOrderQty
          ? fetchSaleOrderQtyIndicator
          : fetchPurchaseOrderQtyIndicator;
      dispatch((sliceFunction as any)({productId: product?.id, page}));
    },
    [dispatch, indicatorType, product?.id],
  );

  const scrollListData = useMemo(() => {
    switch (indicatorType) {
      case StockIndicator.type.RealQty:
      case StockIndicator.type.FutureQty:
      case StockIndicator.type.AllocatedQty:
        return {
          loadingList: loadingStockQty,
          data: stockQtyList,
          moreLoading: moreLoadingStockQty,
          isListEnd: isListEndStockQty,
          fetchData: fetchStockQtyIndicatorAPI,
          renderItem: ({item}) => (
            <StockQtyIndicatorCard
              indicatorType={indicatorType}
              {...item}
              onPress={() => console.log('TEST')}
            />
          ),
        };
      case StockIndicator.type.SaleOrderQty:
        return {
          loadingList: loadingSaleOrderQty,
          data: saleOrderQtyList,
          moreLoading: moreLoadingSaleOrderQty,
          isListEnd: isListEndSaleOrderQty,
          fetchData: fetchQtyIndicatorAPI,
          renderItem: ({item}) => <Text>{item.saleOrder?.saleOrderSeq}</Text>,
        };
      case StockIndicator.type.PurchaseOrderQty:
        return {
          loadingList: loadingPurchaseOrderQty,
          data: purchaseOrderQtyList,
          moreLoading: moreLoadingPurchaseOrderQty,
          isListEnd: isListEndPurchaseOrderQty,
          fetchData: fetchQtyIndicatorAPI,
          renderItem: ({item}) => (
            <Text>{item.purchaseOrder?.purchaseOrderSeq}</Text>
          ),
        };
      default:
        return null;
    }
  }, [
    fetchQtyIndicatorAPI,
    fetchStockQtyIndicatorAPI,
    indicatorType,
    isListEndPurchaseOrderQty,
    isListEndSaleOrderQty,
    isListEndStockQty,
    loadingPurchaseOrderQty,
    loadingSaleOrderQty,
    loadingStockQty,
    moreLoadingPurchaseOrderQty,
    moreLoadingSaleOrderQty,
    moreLoadingStockQty,
    purchaseOrderQtyList,
    saleOrderQtyList,
    stockQtyList,
  ]);

  if (scrollListData == null) {
    return null;
  }

  return (
    <Screen>
      <ScrollList {...scrollListData} translator={I18n.t} />
    </Screen>
  );
};

export default ProductStockIndicatorDetails;
