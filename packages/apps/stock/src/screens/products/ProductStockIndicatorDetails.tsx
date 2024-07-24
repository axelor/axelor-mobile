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
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {
  fetchAvailableStockIndicator,
  fetchPurchaseOrderQtyIndicator,
  fetchSaleOrderQtyIndicator,
  fetchStockQtyIndicator,
} from '../../features/productIndicatorsSlice';
import {
  OrderQtyIndicatorCard,
  ProductStockLocationCard,
  StockQtyIndicatorCard,
} from '../../components';
import {StockIndicator} from '../../types';

const ProductStockIndicatorDetails = ({route}) => {
  const indicatorType = route?.params?.type;
  const stockLocationId = route?.params?.stockLocationId;
  const companyId = route?.params?.companyId;
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
  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const handleOnPressStockQty = useCallback(
    stockMove => {
      switch (stockMove?.typeSelect) {
        case StockMove?.typeSelect.internal:
          return navigation.navigate('InternalMoveDetailsGeneralScreen', {
            internalMoveId: stockMove?.id,
          });
        case StockMove?.typeSelect.outgoing:
          return navigation.navigate('CustomerDeliveryDetailScreen', {
            customerDeliveryId: stockMove?.id,
          });
        case StockMove?.typeSelect.incoming:
          return navigation.navigate('SupplierArrivalDetailsScreen', {
            supplierArrivalId: stockMove?.id,
          });
        default:
          return null;
      }
    },
    [
      StockMove?.typeSelect.internal,
      StockMove?.typeSelect.outgoing,
      StockMove?.typeSelect.incoming,
      navigation,
    ],
  );

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
            <ProductStockLocationCard
              stockLocationName={item.stockLocation?.name}
              realQty={item.currentQty}
              futureQty={item.futureQty}
              reservedQty={
                supplychainConfig?.manageStockReservation && item.reservedQty
              }
              availability={3}
              unit={item.unit?.name}
            />
          ),
        };
      default:
        return null;
    }
  }, [
    availableStockList,
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
    supplychainConfig?.manageStockReservation,
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
