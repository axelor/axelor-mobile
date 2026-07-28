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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FormHtmlInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {StockMove as StockMoveType} from '../../types';
import {
  ProductCardInfo,
  ProductTrackingNumberSearchBar,
  StockLocationSearchBar,
  StockMoveHeader,
  SupplierArrivalLineCreationButton,
  SupplierArrivalLineQuantityCard,
  SupplierProductInfo,
} from '../../components';

const stockLocationScanKey = 'to-stock-location_supplier-arrival-line-creation';
const itemScanKey = 'product-tracking-number_supplier-arrival-line-creation';

const CREATION_STEP = {
  product_trackingNumber: 1,
  toStockLocation: 2,
  validation: 3,
};

const SupplierArrivalLineCreationScreen = ({route}: any) => {
  const {supplierArrival} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {getSelectionItems, getItemTitle} = useTypeHelpers();

  const {productFromId: product} = useSelector(state => state.product);
  const {stock: stockConfig} = useSelector(state => state.appConfig);

  const [step, setCurrentStep] = useState<number>(
    CREATION_STEP.product_trackingNumber,
  );
  const [_product, setProduct] = useState<any>();
  const [trackingNumber, setTrackingNumber] = useState<any>();
  const [toStockLocation, setToStockLocation] = useState<any>(
    supplierArrival.toStockLocation,
  );
  const [realQty, setRealQty] = useState<number>(0);
  const [description, setDescription] = useState<string | undefined>('');
  const [conformity, setConformity] = useState<any>({
    title: getItemTitle(
      StockMove?.conformitySelect,
      StockMove?.conformitySelect.None,
    ),
    value: StockMove?.conformitySelect.None,
  });

  const handleReset = useCallback(
    (_step = CREATION_STEP.product_trackingNumber) => {
      setCurrentStep(_step);

      if (_step <= CREATION_STEP.toStockLocation) {
        setToStockLocation(null);
      }

      if (_step <= CREATION_STEP.product_trackingNumber) {
        setProduct(null);
        setTrackingNumber(null);
        setRealQty(0);
        setDescription('');
      }

      if (_step === CREATION_STEP.validation) {
        setRealQty(0);
        setDescription('');
      }
    },
    [],
  );

  const handleNextStep = useCallback((_current: number) => {
    setCurrentStep(() => {
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.toStockLocation;
      }
      if (_current <= CREATION_STEP.toStockLocation) {
        return CREATION_STEP.validation;
      }
      return _current;
    });
  }, []);

  const handleProductTrackingNumberChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(CREATION_STEP.product_trackingNumber);
      } else {
        const selectedProduct = _value?.product ?? _value;
        const selectedTrackingNumber = _value?.product != null ? _value : null;
        setProduct(selectedProduct);
        setTrackingNumber(selectedTrackingNumber);

        dispatch((fetchProductWithId as any)(selectedProduct?.id));
        dispatch(
          (fetchProductForSupplier as any)({
            supplierId: supplierArrival?.partner?.id,
            productId: selectedProduct?.id,
          }),
        );

        handleNextStep(CREATION_STEP.product_trackingNumber);
      }
    },
    [dispatch, handleNextStep, handleReset, supplierArrival?.partner?.id],
  );

  const handleToStockLocationChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(CREATION_STEP.toStockLocation);
      } else {
        setToStockLocation(_value);
        handleNextStep(CREATION_STEP.toStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

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

  const conformityList = useMemo(() => {
    const conformityToDisplay = [
      StockMove?.conformitySelect.Compliant,
      StockMove?.conformitySelect.Non_Compliant,
    ];

    return getSelectionItems(StockMove?.conformitySelect).filter(({value}) =>
      conformityToDisplay.includes(value),
    );
  }, [StockMove?.conformitySelect, getSelectionItems]);

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <SupplierArrivalLineCreationButton
          supplierArrival={supplierArrival}
          product={product}
          trackingNumber={trackingNumber}
          toStockLocation={toStockLocation}
          realQty={realQty}
          conformity={conformity}
          description={description}
          visible={_product != null}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={StockMoveType.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 70, android: 100}}>
        {step >= CREATION_STEP.toStockLocation && (
          <>
            <ProductCardInfo
              product={product}
              trackingNumber={trackingNumber}
            />
            <SupplierProductInfo />
          </>
        )}
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <ProductTrackingNumberSearchBar
            defaultValue={trackingNumber ?? _product}
            scanKey={itemScanKey}
            onChange={handleProductTrackingNumberChange}
            isFocus
            isScrollViewContainer={product != null}
          />
          {step >= CREATION_STEP.toStockLocation ? (
            <>
              <SupplierArrivalLineQuantityCard
                realQty={realQty}
                setRealQty={setRealQty}
              />
              {stockConfig?.isManageStockLocationOnStockMoveLine ? (
                <StockLocationSearchBar
                  placeholderKey="Stock_ToStockLocation"
                  defaultValue={toStockLocation}
                  onChange={handleToStockLocationChange}
                  scanKey={stockLocationScanKey}
                  isFocus={step === CREATION_STEP.toStockLocation}
                  defaultStockLocation={supplierArrival.toStockLocation}
                />
              ) : null}
              <Picker
                title={I18n.t('Stock_Conformity')}
                onValueChange={handleConformityChange}
                defaultValue={conformity?.value}
                listItems={conformityList}
                labelField="title"
                valueField="value"
                readonly={
                  supplierArrival?.statusSelect ===
                  StockMove?.statusSelect.Realized
                }
                isScrollViewContainer
              />
              <FormHtmlInput
                title={I18n.t('Base_Description')}
                defaultValue={description}
                onChange={setDescription}
              />
            </>
          ) : null}
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

export default SupplierArrivalLineCreationScreen;
