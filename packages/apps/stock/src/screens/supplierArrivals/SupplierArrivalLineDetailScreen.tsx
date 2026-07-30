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
  HeaderContainer,
  Picker,
  Screen,
  KeyboardAvoidingScrollView,
  FormHtmlInput,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {fetchSupplierArrivalLine} from '../../features/supplierArrivalLineSlice';
import {updateStockMoveLineTrackingNumber} from '../../features/trackingNumberSlice';
import {StockMove as StockMoveType, StockMoveLine} from '../../types';
import {useLineWithRack, useProductByCompany} from '../../hooks';
import {
  StockMoveHeader,
  ProductCardInfo,
  SupplierArrivalLineButtons,
  SupplierArrivalLineQuantityCard,
  SupplierProductInfo,
  StockLocationSearchBar,
  SupplierArrivalTrackingNumberSelect,
  SupplierArrivalOriginInput,
} from '../../components';

const stockLocationScanKey = 'to-stock-location_supplier-arrival-line-update';

const SupplierArrivalLineDetailScreen = ({route}: any) => {
  const {supplierArrival, supplierArrivalLineId, productId} =
    route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {getSelectionItems, getItemTitle} = useTypeHelpers();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });
  useContextRegister({
    models: [
      {
        model: 'com.axelor.apps.stock.db.StockMoveLine',
        id: supplierArrivalLineId,
      },
    ],
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);
  const {loadingSupplierArrivalLine, supplierArrivalLine} = useSelector(
    state => state.supplierArrivalLine,
  );

  const product = useProductByCompany(
    supplierArrivalLine?.product?.id ?? productId,
  );

  const locker = useLineWithRack(
    supplierArrival?.toStockLocation?.id,
    supplierArrivalLine,
  );

  const [toStockLocation, setToStockLocation] = useState<any>();
  const [realQty, setRealQty] = useState<number>(0);
  const [origin, setOrigin] = useState<string>();
  const [description, setDescription] = useState<string | undefined>('');
  const [conformity, setConformity] = useState<any>({
    title: getItemTitle(
      StockMove?.conformitySelect,
      StockMove?.conformitySelect.None,
    ),
    value: StockMove?.conformitySelect.None,
  });

  const trackingNumber = useMemo(
    () => supplierArrivalLine?.trackingNumber,
    [supplierArrivalLine],
  );

  const isReadonly = useMemo(
    () =>
      readonly ||
      supplierArrival?.statusSelect !== StockMove?.statusSelect.Planned,
    [StockMove?.statusSelect.Planned, readonly, supplierArrival?.statusSelect],
  );

  useEffect(() => {
    setRealQty(
      StockMoveLine.hideLineQty(supplierArrivalLine, supplierArrival)
        ? 0
        : supplierArrivalLine?.realQty || 0,
    );
    const _conformityValue =
      supplierArrivalLine?.conformitySelect ?? StockMove?.conformitySelect.None;
    setConformity({
      title: getItemTitle(StockMove?.conformitySelect, _conformityValue),
      value: _conformityValue,
    });
    setDescription(supplierArrivalLine?.description ?? '');
    setToStockLocation(supplierArrivalLine?.toStockLocation);
  }, [
    supplierArrivalLine,
    I18n,
    supplierArrival,
    getItemTitle,
    StockMove?.conformitySelect,
  ]);

  useEffect(() => {
    setOrigin(trackingNumber?.origin);
  }, [trackingNumber?.origin]);

  useEffect(() => {
    dispatch(
      (fetchProductForSupplier as any)({
        supplierId: supplierArrival?.partner?.id,
        productId: supplierArrivalLine?.product?.id ?? productId,
      }),
    );
  }, [dispatch, productId, supplierArrival, supplierArrivalLine]);

  const getSupplierArrivalLine = useCallback(() => {
    dispatch((fetchSupplierArrivalLine as any)({supplierArrivalLineId}));
  }, [dispatch, supplierArrivalLineId]);

  useEffect(() => {
    getSupplierArrivalLine();
  }, [getSupplierArrivalLine]);

  const handleConformityChange = useCallback(
    (item: any) => {
      const _value = item ?? StockMove?.conformitySelect.None;

      setConformity({
        title: getItemTitle(StockMove?.conformitySelect, _value),
        value: _value,
      });
    },
    [StockMove?.conformitySelect, getItemTitle],
  );

  const handleTrackingNumberSelection = useCallback(
    (item: any) => {
      if (item != null) {
        dispatch(
          (updateStockMoveLineTrackingNumber as any)({
            trackingNumber: item,
            stockMoveLineId: supplierArrivalLine.id,
            stockMoveLineVersion: supplierArrivalLine.version,
          }),
        );
      }
    },
    [dispatch, supplierArrivalLine],
  );

  const conformityList = useMemo(() => {
    const conformityToDisplay = [
      StockMove?.conformitySelect.Compliant,
      StockMove?.conformitySelect.Non_Compliant,
    ];

    return getSelectionItems(StockMove?.conformitySelect).filter(({value}) =>
      conformityToDisplay.includes(value),
    );
  }, [StockMove?.conformitySelect, getSelectionItems]);

  if (supplierArrivalLine?.id !== supplierArrivalLineId) return null;

  return (
    <Screen
      fixedItems={
        <SupplierArrivalLineButtons
          conformity={conformity}
          realQty={realQty}
          toStockLocation={toStockLocation}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
          trackingNumber={trackingNumber}
          origin={origin}
          description={description}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            lineRef={supplierArrivalLine?.name}
            date={StockMoveType.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={{
          loading: loadingSupplierArrivalLine,
          fetcher: getSupplierArrivalLine,
        }}>
        <ProductCardInfo
          product={product}
          trackingNumber={trackingNumber}
          locker={locker}
        />
        <SupplierProductInfo />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          {trackingNumber != null && (
            <SupplierArrivalOriginInput
              setOrigin={setOrigin}
              trackingNumber={trackingNumber}
              readonly={isReadonly}
            />
          )}
          {product?.trackingNumberConfiguration != null &&
            trackingNumber == null && (
              <SupplierArrivalTrackingNumberSelect
                supplierArrival={supplierArrival}
                supplierArrivalLine={supplierArrivalLine}
                handleTrackingNumberSelection={handleTrackingNumberSelection}
                product={product}
              />
            )}
          <SupplierArrivalLineQuantityCard
            realQty={realQty}
            setRealQty={setRealQty}
            supplierArrivalLine={supplierArrivalLine}
            readonly={isReadonly}
          />
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_ToStockLocation"
              defaultValue={toStockLocation}
              onChange={setToStockLocation}
              scanKey={stockLocationScanKey}
              isFocus
              defaultStockLocation={supplierArrival.toStockLocation}
              readonly={isReadonly}
            />
          ) : null}
          <Picker
            title={I18n.t('Stock_Conformity')}
            onValueChange={handleConformityChange}
            defaultValue={conformity?.value}
            listItems={conformityList}
            labelField="title"
            valueField="value"
            readonly={isReadonly}
            isScrollViewContainer
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

export default SupplierArrivalLineDetailScreen;
