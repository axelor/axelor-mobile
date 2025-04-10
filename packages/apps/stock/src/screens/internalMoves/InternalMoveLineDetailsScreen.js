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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {isEmpty, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  InternalMoveLineButtons,
  InternalMoveLineNotes,
  InternalMoveLineQuantityCard,
  InternalMoveLinePicker,
  InternalMoveLineTrackingNumberSelect,
  StockLocationSearchBar,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchInternalMoveLine} from '../../features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {StockMove, StockMoveLine} from '../../types';

const fromScanKey = 'from-stock-location_internal-move-line-update';
const toScanKey = 'to-stock-location_internal-move-line-update';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const {internalMove, internalMoveLineId} = route.params;
  const dispatch = useDispatch();

  const {activeCompany} = useSelector(state => state.user.user);
  const {stockConfig} = useSelector(state => state.stockAppConfig);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {productFromId: product} = useSelector(state => state.product);
  const {internalMoveLine, loadingInternalMoveLine} = useSelector(
    state => state.internalMoveLine,
  );

  const [fromStockLocation, setFromStockLocation] = useState(
    internalMoveLine?.fromStockLocation,
  );
  const [toStockLocation, setToStockLocation] = useState(
    internalMoveLine?.toStockLocation,
  );
  const [movedQty, setMovedQty] = useState(
    StockMoveLine.hideLineQty(internalMoveLine, internalMove)
      ? 0
      : internalMoveLine?.realQty,
  );
  const [unit, setUnit] = useState(internalMoveLine?.unit);

  const trackingNumber = useMemo(
    () => internalMoveLine?.trackingNumber ?? route.params.trackingNumber,
    [internalMoveLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      StockMove.isTrackingNumberSelectVisible(
        internalMove?.statusSelect,
        product,
        trackingNumber,
      ),
    [internalMove, product, trackingNumber],
  );

  const plannedQty = useMemo(() => {
    if (internalMove.statusSelect === StockMove.status.Realized) {
      return internalMoveLine?.realQty;
    } else {
      return productIndicators?.availableStock;
    }
  }, [
    internalMove.statusSelect,
    internalMoveLine.realQty,
    productIndicators?.availableStock,
  ]);

  const getInternalMoveLine = useCallback(() => {
    dispatch(
      fetchInternalMoveLine({
        internalMoveLineId: internalMoveLineId,
      }),
    );
  }, [dispatch, internalMoveLineId]);

  useEffect(() => {
    getInternalMoveLine();
  }, [getInternalMoveLine]);

  useEffect(() => {
    if (!isEmpty(internalMoveLine)) {
      dispatch(fetchProductWithId(internalMoveLine?.product?.id));
    }
  }, [dispatch, internalMoveLine]);

  useEffect(() => {
    if (!isEmpty(product)) {
      dispatch(
        fetchProductIndicators({
          version: product?.version,
          productId: product?.id,
          companyId: activeCompany?.id,
          stockLocationId: internalMove.fromStockLocation?.id,
        }),
      );
    }
  }, [activeCompany, dispatch, internalMove, product]);

  useEffect(() => {
    if (!isEmpty(internalMoveLine)) {
      setMovedQty(
        StockMoveLine.hideLineQty(internalMoveLine, internalMove)
          ? 0
          : internalMoveLine.realQty,
      );
      setUnit(internalMoveLine.unit);
      setFromStockLocation(internalMoveLine.fromStockLocation);
      setToStockLocation(internalMoveLine.toStockLocation);
    }
  }, [internalMoveLine, internalMove]);

  const handleShowProduct = useCallback(() => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  }, [navigation, product]);

  if (internalMoveLine?.id !== internalMoveLineId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InternalMoveLineButtons
          internalMove={internalMove}
          internalMoveLine={internalMoveLine}
          movedQty={movedQty}
          unit={unit}
          fromStockLocation={fromStockLocation}
          toStockLocation={toStockLocation}
          visible={!isTrackingNumberSelectVisible}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={StockMove.getStockMoveDate(
              internalMove.statusSelect,
              internalMove,
            )}
            availability={internalMove.availableStatusSelect}
          />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{
          loading: loadingInternalMoveLine,
          fetcher: getInternalMoveLine,
        }}>
        {stockConfig?.isManageStockLocationOnStockMoveLine ? (
          <StockLocationSearchBar
            placeholderKey="Stock_OriginalStockLocation"
            scanKey={fromScanKey}
            onChange={setFromStockLocation}
            defaultValue={fromStockLocation}
            defaultStockLocation={internalMove.fromStockLocation}
            readOnly={internalMove.statusSelect !== StockMove.status.Planned}
          />
        ) : null}
        <ProductCardInfo
          name={product?.name}
          code={product?.code}
          picture={product?.picture}
          trackingNumber={
            product?.trackingNumberConfiguration == null
              ? null
              : internalMoveLine.trackingNumber?.trackingNumberSeq
          }
          onPress={handleShowProduct}
        />
        <InternalMoveLineTrackingNumberSelect
          product={product}
          internalMoveLine={internalMoveLine}
          visible={isTrackingNumberSelectVisible}
        />
        <InternalMoveLineQuantityCard
          movedQty={movedQty}
          originalStockLocation={internalMove.fromStockLocation}
          plannedQty={plannedQty}
          setMovedQty={setMovedQty}
          status={internalMove.statusSelect}
          stockProduct={product}
          trackingNumber={internalMoveLine.trackingNumber}
        />
        <InternalMoveLinePicker
          setUnit={setUnit}
          status={internalMove.statusSelect}
          unit={unit}
          isScrollViewContainer={true}
        />
        {stockConfig?.isManageStockLocationOnStockMoveLine ? (
          <StockLocationSearchBar
            placeholderKey="Stock_DestinationStockLocation"
            scanKey={toScanKey}
            onChange={setToStockLocation}
            defaultValue={toStockLocation}
            secondFilter={true}
            defaultStockLocation={internalMove.toStockLocation}
            isScrollViewContainer={true}
            readOnly={internalMove.statusSelect !== StockMove.status.Planned}
          />
        ) : null}
        <InternalMoveLineNotes
          notes={internalMove.note}
          status={internalMove.statusSelect}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveLineDetailsScreen;
