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

import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {HeaderContainer, Picker, Screen} from '@axelor/aos-mobile-ui';
import {
  getFromList,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  InternalMoveLineDetailsFixedItems,
  InternalMoveLineNotes,
  InternalMoveLineDetailsQuantityCard,
} from '../../components';
import {fetchUnit} from '../../features/unitSlice';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockMove from '../../types/stock-move';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const I18n = useTranslator();
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const {unitList} = useSelector(state => state.unit);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (
      route.params.internalMove != null &&
      route.params.internalMoveLine != null
    ) {
      dispatch(fetchInternalMoveLines(route.params.internalMove.id));
      dispatch(fetchProductWithId(route.params.internalMoveLine.product.id));
    }
  }, [dispatch, route.params]);

  useEffect(() => {
    if (
      route.params.internalMove != null &&
      route.params.internalMoveLine != null
    ) {
      dispatch(
        fetchProductIndicators({
          version: route.params.internalMoveLine.product.$version,
          productId: route.params.internalMoveLine.product.id,
          companyId: activeCompany?.id,
          stockLocationId: route.params.internalMove.fromStockLocation.id,
        }),
      );
    } else if (route.params.internalMove == null) {
      dispatch(
        fetchProductIndicators({
          version: route.params.stockProduct.version,
          productId: route.params.stockProduct.id,
          companyId: activeCompany?.id,
          stockLocationId: route.params.fromStockLocation.id,
        }),
      );
    }
  }, [activeCompany?.id, dispatch, route.params]);

  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [availability, setAvailabilty] = useState();
  const [originalStockLocation, setOriginalStockLocation] = useState();
  const [destinationStockLocation, setDestinationStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [plannedQty, setPlannedQty] = useState();
  const [movedQty, setMovedQty] = useState();
  const [unit, setUnit] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    initVariables();
  }, [route.params, productFromId, productIndicators, initVariables]);

  const initVariables = useCallback(() => {
    if (route.params.internalMove == null) {
      setStatus(StockMove.status.Draft);
      setAvailabilty(null);
      setOriginalStockLocation(route.params.fromStockLocation);
      setDestinationStockLocation(route.params.toStockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      if (productIndicators.id !== route.params.stockProduct.id) {
        return;
      } else {
        setPlannedQty(productIndicators?.availableStock);
        setMovedQty(0);
      }
      setUnit(route.params.stockProduct.unit);
      setNotes('');
      setSaveStatus(false);
      setLoading(false);
    } else {
      setStatus(route.params.internalMove.statusSelect);
      setAvailabilty(route.params.internalMove.availableStatusSelect);
      setOriginalStockLocation(route.params.internalMove.fromStockLocation);
      setDestinationStockLocation(route.params.internalMove.toStockLocation);
      setNotes(route.params.internalMove.note);
      if (productFromId == null || productFromId === {}) {
        setLoading(true);
      } else {
        const internalMoveLine = route.params.internalMoveLine;
        setStockProduct(productFromId);
        setTrackingNumber(internalMoveLine.trackingNumber);
        if (
          route.params.internalMove.statusSelect === StockMove.status.Realized
        ) {
          setPlannedQty(internalMoveLine.realQty);
        } else {
          setPlannedQty(productIndicators?.availableStock);
        }
        setMovedQty(internalMoveLine.realQty);
        setUnit(internalMoveLine.unit);
        setLoading(false);
      }
      setSaveStatus(true);
    }
  }, [productIndicators, productFromId, route.params]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  const handleUnitChange = unitId => {
    if (unitId === null) {
      setUnit({name: '', id: null});
    } else {
      setUnit(getFromList(unitList, 'id', unitId));
    }
    setSaveStatus(false);
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InternalMoveLineDetailsFixedItems
          destinationStockLocation={destinationStockLocation}
          movedQty={movedQty}
          navigation={navigation}
          originalStockLocation={originalStockLocation}
          route={route}
          saveStatus={saveStatus}
          stockProduct={stockProduct}
          trackingNumber={trackingNumber}
          unit={unit}
        />
      }
      loading={loading || loadingProductFromId}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={160}>
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            <StockMoveHeader
              reference={route.params.internalMove?.stockMoveSeq}
              status={status}
              date={
                route.params.internalMove?.statusSelect ===
                StockMove.status.Draft
                  ? route.params.internalMove?.createdOn
                  : route.params.internalMove?.statusSelect ===
                    StockMove.status.Planned
                  ? route.params.internalMove?.estimatedDate
                  : route.params.internalMove?.realDate
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
              name={stockProduct.name}
              code={stockProduct.code}
              picture={stockProduct.picture}
              trackingNumber={
                stockProduct.trackingNumberConfiguration == null ||
                trackingNumber == null
                  ? null
                  : trackingNumber.trackingNumberSeq
              }
              locker={null}
              onPress={handleShowProduct}
            />
            <InternalMoveLineDetailsQuantityCard
              movedQty={movedQty}
              navigation={navigation}
              originalStockLocation={originalStockLocation}
              plannedQty={plannedQty}
              setMovedQty={setMovedQty}
              setSaveStatus={setSaveStatus}
              status={status}
              stockProduct={stockProduct}
              trackingNumber={trackingNumber}
            />
            <Picker
              styleTxt={unit?.id === null ? styles.picker_empty : null}
              title={I18n.t('Stock_Unit')}
              onValueChange={handleUnitChange}
              defaultValue={unit?.id}
              listItems={unitList}
              labelField="name"
              valueField="id"
              disabled={
                status === StockMove.status.Realized ||
                status === StockMove.status.Canceled
              }
              disabledValue={unit?.name}
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
  content: {
    marginTop: '3%',
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  picker_empty: {
    color: 'red',
  },
  text: {
    fontSize: 16,
  },
  containerKeyboard: {
    flex: 1,
  },
});

export default InternalMoveLineDetailsScreen;
