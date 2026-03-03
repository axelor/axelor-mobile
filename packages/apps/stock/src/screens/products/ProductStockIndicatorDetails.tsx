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
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {fetchProductWithId} from '../../features/productSlice';
import {
  fetchAvailableStockIndicator,
  fetchPurchaseOrderQtyIndicator,
  fetchSaleOrderQtyIndicator,
  fetchStockQtyIndicator,
} from '../../features/productIndicatorsSlice';
import {
  AvailableStockIndicatorCard,
  OrderQtyIndicatorCard,
  StockQtyIndicatorCard,
} from '../../components';
import {StockIndicator} from '../../types';

const ProductStockIndicatorDetails = ({route}) => {
  const {
    type: indicatorType,
    productId,
    stockLocationId,
    companyId,
  } = route?.params ?? {};
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const navigation = useNavigation();
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

    loadingAvailableStock,
    moreLoadingAvailableStock,
    isListEndAvailableStock,
    availableStockList,
  } = useSelector((state: any) => state.productIndicators);

  useEffect(() => {
    if (productId != null && productId !== product?.id) {
      dispatch((fetchProductWithId as any)(productId));
    }
  }, [dispatch, product?.id, productId]);

  const handleOnPressStockQty = useCallback(
    stockMove => {
      switch (stockMove?.typeSelect) {
        case StockMove?.typeSelect.internal:
          return navigation.popTo('InternalMoveDetailsGeneralScreen', {
            internalMoveId: stockMove?.id,
          });
        case StockMove?.typeSelect.outgoing:
          return navigation.popTo('CustomerDeliveryDetailScreen', {
            customerDeliveryId: stockMove?.id,
          });
        case StockMove?.typeSelect.incoming:
          return navigation.popTo('SupplierArrivalDetailsScreen', {
            supplierArrivalId: stockMove?.id,
          });
        default:
          return null;
      }
    },
    [StockMove, navigation],
  );

  const fetchStockQtyIndicatorAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchStockQtyIndicator as any)({
          status:
            indicatorType === StockIndicator.type.RealQty
              ? StockMove?.statusSelect.Realized
              : StockMove?.statusSelect.Planned,
          isAllocatedQty: indicatorType === StockIndicator.type.AllocatedQty,
          productId: product?.id,
          stockLocationId,
          companyId,
          page,
        }),
      );
    },
    [
      StockMove,
      companyId,
      dispatch,
      indicatorType,
      product?.id,
      stockLocationId,
    ],
  );

  const fetchIndicatorAPI = useCallback(
    (page = 0) => {
      let sliceFunction = null;
      switch (indicatorType) {
        case StockIndicator.type.SaleOrderQty:
          sliceFunction = fetchSaleOrderQtyIndicator;
          break;
        case StockIndicator.type.PurchaseOrderQty:
          sliceFunction = fetchPurchaseOrderQtyIndicator;
          break;
        case StockIndicator.type.AvailableStock:
          sliceFunction = fetchAvailableStockIndicator;
          break;
        default:
          return null;
      }

      dispatch(
        (sliceFunction as any)({productId: product?.id, companyId, page}),
      );
    },
    [dispatch, indicatorType, product?.id, companyId],
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
              onPress={() => handleOnPressStockQty(item.stockMove)}
            />
          ),
        };
      case StockIndicator.type.SaleOrderQty:
        return {
          loadingList: loadingSaleOrderQty,
          data: saleOrderQtyList,
          moreLoading: moreLoadingSaleOrderQty,
          isListEnd: isListEndSaleOrderQty,
          fetchData: fetchIndicatorAPI,
          renderItem: ({item}) => <OrderQtyIndicatorCard {...item} />,
        };
      case StockIndicator.type.PurchaseOrderQty:
        return {
          loadingList: loadingPurchaseOrderQty,
          data: purchaseOrderQtyList,
          moreLoading: moreLoadingPurchaseOrderQty,
          isListEnd: isListEndPurchaseOrderQty,
          fetchData: fetchIndicatorAPI,
          renderItem: ({item}) => <OrderQtyIndicatorCard {...item} />,
        };
      case StockIndicator.type.AvailableStock:
        return {
          loadingList: loadingAvailableStock,
          data: availableStockList,
          moreLoading: moreLoadingAvailableStock,
          isListEnd: isListEndAvailableStock,
          fetchData: fetchIndicatorAPI,
          renderItem: ({item}) => (
            <AvailableStockIndicatorCard {...item} companyId={companyId} />
          ),
        };
      default:
        return null;
    }
  }, [
    availableStockList,
    companyId,
    fetchIndicatorAPI,
    fetchStockQtyIndicatorAPI,
    handleOnPressStockQty,
    indicatorType,
    isListEndAvailableStock,
    isListEndPurchaseOrderQty,
    isListEndSaleOrderQty,
    isListEndStockQty,
    loadingAvailableStock,
    loadingPurchaseOrderQty,
    loadingSaleOrderQty,
    loadingStockQty,
    moreLoadingAvailableStock,
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
    <Screen removeSpaceOnTop>
      <ScrollList {...scrollListData} translator={I18n.t} />
    </Screen>
  );
};

export default ProductStockIndicatorDetails;
