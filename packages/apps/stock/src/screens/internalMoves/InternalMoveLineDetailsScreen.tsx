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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FormHtmlInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchInternalMoveLine} from '../../features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {StockMove as StockMoveType, StockMoveLine} from '../../types';
import {useLineWithRack, useProductByCompany} from '../../hooks';
import {
  ProductCardInfo,
  StockMoveHeader,
  InternalMoveLineButtons,
  InternalMoveLineQuantityCard,
  InternalMoveLineTrackingNumberSelect,
  StockLocationSearchBar,
  UnitPicker,
} from '../../components';

const fromScanKey = 'from-stock-location_internal-move-line-update';
const toScanKey = 'to-stock-location_internal-move-line-update';

const InternalMoveLineDetailsScreen = ({route}: any) => {
  const {internalMove, internalMoveLineId} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {activeCompany} = useSelector(state => state.user.user);
  const {stock: stockConfig} = useSelector(state => state.appConfig);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {internalMoveLine, loadingInternalMoveLine} = useSelector(
    state => state.internalMoveLine,
  );

  const product = useProductByCompany(internalMoveLine?.product?.id);

  const locker = useLineWithRack(
    internalMove?.fromStockLocation?.id,
    internalMoveLine,
  );

  const [fromStockLocation, setFromStockLocation] = useState<any>();
  const [toStockLocation, setToStockLocation] = useState<any>();
  const [movedQty, setMovedQty] = useState<number>();
  const [unit, setUnit] = useState<any>();
  const [description, setDescription] = useState<string>();

  const trackingNumber = useMemo(
    () => internalMoveLine?.trackingNumber ?? route.params.trackingNumber,
    [internalMoveLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      StockMoveType.isTrackingNumberSelectVisible(
        internalMove?.statusSelect,
        product,
        trackingNumber,
      ),
    [internalMove, product, trackingNumber],
  );

  const plannedQty = useMemo(
    () =>
      internalMove.statusSelect === StockMove?.statusSelect.Realized
        ? internalMoveLine?.realQty
        : productIndicators?.availableStock,
    [
      StockMove?.statusSelect.Realized,
      internalMove.statusSelect,
      internalMoveLine?.realQty,
      productIndicators?.availableStock,
    ],
  );

  const getInternalMoveLine = useCallback(() => {
    dispatch((fetchInternalMoveLine as any)({internalMoveLineId}));
  }, [dispatch, internalMoveLineId]);

  useEffect(() => {
    getInternalMoveLine();
  }, [getInternalMoveLine]);

  useEffect(() => {
    if (!isEmpty(product)) {
      dispatch(
        (fetchProductIndicators as any)({
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
      setDescription(internalMoveLine.description ?? '');
    }
  }, [internalMoveLine, internalMove]);

  const isReadonly = useMemo(
    () =>
      readonly || internalMove.statusSelect !== StockMove?.statusSelect.Planned,
    [StockMove?.statusSelect.Planned, internalMove.statusSelect, readonly],
  );

  if (internalMoveLine?.id !== internalMoveLineId) return null;

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <InternalMoveLineButtons
          internalMove={internalMove}
          internalMoveLine={internalMoveLine}
          movedQty={movedQty}
          unit={unit}
          fromStockLocation={fromStockLocation}
          toStockLocation={toStockLocation}
          visible={!readonly && !isTrackingNumberSelectVisible}
          description={description}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={StockMoveType.getStockMoveDate(
              internalMove.statusSelect,
              internalMove,
            )}
            availability={internalMoveLine?.availableStatusSelect}
            stockMoveLineId={internalMoveLine?.id}
          />
        }
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={{
          loading: loadingInternalMoveLine,
          fetcher: getInternalMoveLine,
        }}>
        <ProductCardInfo
          product={product}
          trackingNumber={
            product?.trackingNumberConfiguration == null
              ? null
              : internalMoveLine.trackingNumber
          }
          locker={locker}
        />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_OriginalStockLocation"
              scanKey={fromScanKey}
              onChange={setFromStockLocation}
              defaultValue={fromStockLocation}
              defaultStockLocation={internalMove.fromStockLocation}
              readonly={isReadonly}
            />
          ) : null}
          <InternalMoveLineTrackingNumberSelect
            product={product}
            internalMoveLine={internalMoveLine}
            visible={!isReadonly && isTrackingNumberSelectVisible}
          />
          <InternalMoveLineQuantityCard
            movedQty={movedQty!}
            originalStockLocation={internalMove.fromStockLocation}
            plannedQty={plannedQty}
            setMovedQty={setMovedQty}
            stockProduct={product}
            trackingNumber={internalMoveLine.trackingNumber}
            totalNetMass={internalMoveLine.totalNetMass}
            readonly={isReadonly}
          />
          <UnitPicker
            setUnit={setUnit}
            unit={unit}
            isScrollViewContainer
            readonly={isReadonly}
          />
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_DestinationStockLocation"
              scanKey={toScanKey}
              onChange={setToStockLocation}
              defaultValue={toStockLocation}
              secondFilter
              defaultStockLocation={internalMove.toStockLocation}
              isScrollViewContainer
              readonly={isReadonly}
            />
          ) : null}
          <FormHtmlInput
            title={I18n.t('Stock_NotesOnStockMove')}
            defaultValue={internalMove.note}
            readonly={true}
            hideIfNull
          />
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={setDescription}
            defaultValue={description}
            readonly={isReadonly}
          />
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 125,
  },
});

export default InternalMoveLineDetailsScreen;
