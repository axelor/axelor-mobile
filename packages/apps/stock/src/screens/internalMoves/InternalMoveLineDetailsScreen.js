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
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchInternalMoveLine} from '../../features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {StockMove, StockMoveLine} from '../../types';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const {internalMove, internalMoveLineId} = route.params;
  const dispatch = useDispatch();

  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {productFromId: product} = useSelector(state => state.product);
  const {internalMoveLine, loadingInternalMoveLine} = useSelector(
    state => state.internalMoveLine,
  );

  const [saveStatus, setSaveStatus] = useState(true);
  const [movedQty, setMovedQty] = useState(
    StockMoveLine.hideLineQty(internalMoveLine, internalMove)
      ? 0
      : internalMoveLine.realQty,
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
      return internalMoveLine.realQty;
    } else {
      return productIndicators?.availableStock;
    }
  }, [
    internalMove.statusSelect,
    internalMoveLine.realQty,
    productIndicators?.availableStock,
  ]);

  useEffect(() => {
    if (internalMoveLineId) {
      dispatch(
        fetchInternalMoveLine({
          internalMoveLineId: internalMoveLineId,
        }),
      );
    }
  }, [dispatch, internalMoveLineId]);

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
      setSaveStatus(true);
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
          saveStatus={saveStatus}
          movedQty={movedQty}
          unit={unit}
          visible={!isTrackingNumberSelectVisible}
        />
      }
      loading={loadingInternalMoveLine}>
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
      <KeyboardAvoidingScrollView>
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
          setSaveStatus={setSaveStatus}
          status={internalMove.statusSelect}
          stockProduct={product}
          trackingNumber={internalMoveLine.trackingNumber}
        />
        <InternalMoveLinePicker
          setSaveStatus={setSaveStatus}
          setUnit={setUnit}
          status={internalMove.statusSelect}
          unit={unit}
        />
        <InternalMoveLineNotes
          notes={internalMove.note}
          status={internalMove.statusSelect}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveLineDetailsScreen;
