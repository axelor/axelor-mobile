/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
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
import {fetchUnit} from '../../features/unitSlice';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchInternalMoveLine} from '../../features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {StockMove, StockMoveLine} from '../../types';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const {
    internalMove,
    internalMoveLineId,
    productId,
    fromStockLocation,
    toStockLocation,
  } = route.params;

  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {internalMoveLine, loadingInternalMoveLine} = useSelector(
    state => state.internalMoveLine,
  );

  const dispatch = useDispatch();

  const trackingNumber = useMemo(
    () => internalMoveLine?.trackingNumber ?? route.params.trackingNumber,
    [internalMoveLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      StockMove.isTrackingNumberSelectVisible(
        internalMove?.statusSelect,
        productFromId,
        trackingNumber,
      ),
    [internalMove, productFromId, trackingNumber],
  );

  useEffect(() => {
    dispatch(fetchUnit());
    dispatch(fetchProductWithId(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!isEmpty(productFromId)) {
      dispatch(
        fetchProductIndicators({
          version: productFromId?.version,
          productId: productFromId?.id,
          companyId: activeCompany?.id,
          stockLocationId:
            internalMove == null
              ? fromStockLocation.id
              : internalMove.fromStockLocation?.id,
        }),
      );
    }
  }, [
    activeCompany,
    dispatch,
    internalMove,
    productFromId,
    productId,
    fromStockLocation,
  ]);

  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [availability, setAvailabilty] = useState();
  const [originalStockLocation, setOriginalStockLocation] = useState();
  const [destinationStockLocation, setDestinationStockLocation] = useState();
  const [plannedQty, setPlannedQty] = useState();
  const [movedQty, setMovedQty] = useState();
  const [unit, setUnit] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    initVariables();
  }, [
    initVariables,
    productIndicators,
    productFromId,
    internalMove,
    internalMoveLine,
    fromStockLocation,
    toStockLocation,
  ]);

  const initVariables = useCallback(() => {
    if (internalMove == null) {
      setStatus(StockMove.status.Draft);
      setAvailabilty(null);
      setOriginalStockLocation(fromStockLocation);
      setDestinationStockLocation(toStockLocation);
      if (productIndicators.id !== productFromId?.id) {
        return;
      } else {
        setPlannedQty(productIndicators?.availableStock);
        setMovedQty(0);
      }
      setUnit(productFromId.unit);
      setNotes('');
      setSaveStatus(false);
      setLoading(false);
    } else {
      setStatus(internalMove.statusSelect);
      setAvailabilty(internalMove.availableStatusSelect);
      setOriginalStockLocation(internalMove.fromStockLocation);
      setDestinationStockLocation(internalMove.toStockLocation);
      setNotes(internalMove.note);
      if (productFromId == null || productFromId === {}) {
        setLoading(true);
      } else {
        if (internalMove.statusSelect === StockMove.status.Realized) {
          setPlannedQty(internalMoveLine.realQty ?? 0);
        } else {
          setPlannedQty(productIndicators?.availableStock);
        }
        setMovedQty(
          StockMoveLine.hideLineQty(internalMoveLine, internalMove)
            ? 0
            : internalMoveLine.realQty,
        );
        setUnit(internalMoveLine.unit);
        setLoading(false);
      }
      setSaveStatus(true);
    }
  }, [
    productIndicators,
    productFromId,
    internalMove,
    internalMoveLine,
    fromStockLocation,
    toStockLocation,
  ]);

  const handleShowProduct = useCallback(() => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: productFromId,
    });
  }, [navigation, productFromId]);

  useEffect(() => {
    if (internalMoveLineId) {
      dispatch(
        fetchInternalMoveLine({
          internalMoveLineId: internalMoveLineId,
        }),
      );
    }
  }, [dispatch, internalMoveLineId]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InternalMoveLineButtons
          internalMoveLine={internalMoveLine}
          destinationStockLocation={destinationStockLocation}
          movedQty={movedQty}
          navigation={navigation}
          originalStockLocation={originalStockLocation}
          internalMove={internalMove}
          saveStatus={saveStatus}
          stockProduct={productFromId}
          trackingNumber={trackingNumber}
          unit={unit}
          visible={!isTrackingNumberSelectVisible}
        />
      }
      loading={loading || loadingProductFromId || loadingInternalMoveLine}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={160}>
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            <StockMoveHeader
              reference={internalMove?.stockMoveSeq}
              status={status}
              date={
                internalMove
                  ? StockMove.getStockMoveDate(
                      internalMove.statusSelect,
                      internalMove,
                    )
                  : null
              }
              availability={availability}
            />
          }
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            <ProductCardInfo
              name={productFromId.name}
              code={productFromId.code}
              picture={productFromId.picture}
              trackingNumber={
                productFromId.trackingNumberConfiguration == null ||
                trackingNumber == null
                  ? null
                  : trackingNumber.trackingNumberSeq
              }
              locker={null}
              onPress={handleShowProduct}
            />
            <InternalMoveLineTrackingNumberSelect
              product={productFromId}
              internalMoveLine={internalMoveLine}
              visible={isTrackingNumberSelectVisible}
            />
            <InternalMoveLineQuantityCard
              movedQty={movedQty}
              navigation={navigation}
              originalStockLocation={originalStockLocation}
              plannedQty={plannedQty}
              setMovedQty={setMovedQty}
              setSaveStatus={setSaveStatus}
              status={status}
              stockProduct={productFromId}
              trackingNumber={trackingNumber}
            />
            <InternalMoveLinePicker
              setSaveStatus={setSaveStatus}
              setUnit={setUnit}
              status={status}
              unit={unit}
            />
            <InternalMoveLineNotes
              notes={notes}
              setNotes={setNotes}
              setSaveStatus={setSaveStatus}
              status={status}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
});

export default InternalMoveLineDetailsScreen;
