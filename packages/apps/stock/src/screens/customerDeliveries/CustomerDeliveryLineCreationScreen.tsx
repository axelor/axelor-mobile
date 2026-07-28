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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FormHtmlInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {useProductByCompany} from '../../hooks';
import {StockMove} from '../../types';
import {
  AvailableProductsSearchBar,
  CustomerDeliveryLineCreationButton,
  CustomerDeliveryLineQuantityCard,
  ProductCardInfo,
  StockLocationSearchBar,
  StockMoveHeader,
} from '../../components';

const stockLocationScanKey =
  'from-stock-location_customer-delivery-line-creation';
const itemScanKey = 'product-tracking-number_customer-delivery-line-creation';

const CREATION_STEP = {
  fromStockLocation: 1,
  product_trackingNumber: 2,
  validation: 3,
};

const CustomerDeliveryLineCreationScreen = ({route}: any) => {
  const {customerDelivery} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {stock: stockConfig} = useSelector(state => state.appConfig);

  const [step, setCurrentStep] = useState<number>(
    CREATION_STEP.product_trackingNumber,
  );
  const [fromStockLocation, setFromStockLocation] = useState<any>(
    customerDelivery.fromStockLocation,
  );
  const [locationLine, setLocationLine] = useState<any>();
  const [productId, setProductId] = useState<number>();
  const [realQty, setRealQty] = useState<number>(0);
  const [description, setDescription] = useState<string | undefined>('');

  const product = useProductByCompany(productId);

  const handleReset = useCallback((_step = CREATION_STEP.fromStockLocation) => {
    setCurrentStep(_step);

    if (_step <= CREATION_STEP.product_trackingNumber) {
      setLocationLine(null);
      setRealQty(0);
      setDescription('');
    }

    if (_step <= CREATION_STEP.fromStockLocation) {
      setFromStockLocation(null);
    }

    if (_step === CREATION_STEP.validation) {
      setRealQty(0);
      setDescription('');
    }
  }, []);

  const handleNextStep = useCallback((_current: number) => {
    setCurrentStep(() => {
      if (_current <= CREATION_STEP.fromStockLocation) {
        return CREATION_STEP.product_trackingNumber;
      }
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.validation;
      }
      return _current;
    });
  }, []);

  const handleFromStockLocationChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(CREATION_STEP.fromStockLocation);
      } else {
        setFromStockLocation(_value);
        handleNextStep(CREATION_STEP.fromStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleStockLocationLineSelection = useCallback(
    (item: any) => {
      if (item == null) {
        handleReset(CREATION_STEP.product_trackingNumber);
      } else {
        setProductId(item?.product?.id);
        setLocationLine(item);
        handleNextStep(CREATION_STEP.product_trackingNumber);
      }
    },
    [handleNextStep, handleReset],
  );

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <CustomerDeliveryLineCreationButton
          customerDelivery={customerDelivery}
          product={product}
          trackingNumber={locationLine?.trackingNumber}
          realQty={realQty}
          description={description}
          fromStockLocation={fromStockLocation}
          visible={step >= CREATION_STEP.validation}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            date={StockMove.getStockMoveDate(
              customerDelivery.statusSelect,
              customerDelivery,
            )}
            availability={customerDelivery.availableStatusSelect}
          />
        }
      />
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 70, android: 100}}>
        {step >= CREATION_STEP.validation && (
          <ProductCardInfo
            product={product}
            trackingNumber={locationLine?.trackingNumber}
          />
        )}
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_FromStockLocation"
              defaultValue={fromStockLocation}
              onChange={handleFromStockLocationChange}
              scanKey={stockLocationScanKey}
              isFocus={step === CREATION_STEP.fromStockLocation}
              defaultStockLocation={customerDelivery.fromStockLocation}
              isScrollViewContainer={locationLine == null}
            />
          ) : null}
          {step >= CREATION_STEP.product_trackingNumber ? (
            <AvailableProductsSearchBar
              defaultValue={locationLine}
              stockLocationId={fromStockLocation?.id}
              scanKey={itemScanKey}
              onChange={handleStockLocationLineSelection}
              isFocus
              changeScreenAfter
              isScrollViewContainer={locationLine == null}
            />
          ) : null}
          {step >= CREATION_STEP.validation ? (
            <>
              <CustomerDeliveryLineQuantityCard
                customerDeliveryLine={null}
                realQty={realQty}
                setRealQty={setRealQty}
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

export default CustomerDeliveryLineCreationScreen;
