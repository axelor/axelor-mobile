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

import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  AvailableProductsSearchBar,
  CustomerDeliveryLineCreationButton,
  CustomerDeliveryLineQuantityCard,
  ProductCardInfo,
  StockLocationSearchBar,
  StockMoveHeader,
} from '../../components';
import StockMove from '../../types/stock-move';
import {fetchProductWithId} from '../../features/productSlice';

const stockLocationScanKey =
  'from-stock-location_customer-delivery-line-creation';
const itemScanKey = 'product-tracking-number_customer-delivery-line-creation';

const CREATION_STEP = {
  fromStockLocation: 1,
  product_trackingNumber: 2,
  validation: 3,
};

const CustomerDeliveryLineCreationScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);
  const {stockConfig} = useSelector(state => state.stockAppConfig);

  const [fromStockLocation, setFromStockLocation] = useState(
    customerDelivery.fromStockLocation,
  );
  const [locationLine, setLocationLine] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [currentStep, setCurrentStep] = useState(
    CREATION_STEP.product_trackingNumber,
  );

  const handleFromStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.fromStockLocation);
      } else {
        setFromStockLocation(_value);
        handleNextStep(CREATION_STEP.fromStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleStockLocationLineSelection = item => {
    if (item != null) {
      const _product = item?.product;

      dispatch(fetchProductWithId(_product?.id));
      setLocationLine(item);
      handleNextStep(CREATION_STEP.product_trackingNumber);
    } else {
      handleReset(CREATION_STEP.product_trackingNumber);
    }
  };

  const handleReset = useCallback((_step = CREATION_STEP.fromStockLocation) => {
    setCurrentStep(_step);

    if (_step <= CREATION_STEP.product_trackingNumber) {
      setLocationLine(null);
      setRealQty(0);
    }

    if (_step <= CREATION_STEP.fromStockLocation) {
      setFromStockLocation(null);
    }

    if (_step === CREATION_STEP.validation) {
      setRealQty(0);
    }
  }, []);

  const handleNextStep = useCallback(_current => {
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

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineCreationButton
          customerDelivery={customerDelivery}
          product={product}
          trackingNumber={locationLine?.trackingNumber}
          realQty={realQty}
          fromStockLocation={fromStockLocation}
          visible={currentStep >= CREATION_STEP.validation}
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
      <KeyboardAvoidingScrollView style={styles.scroll}>
        <View style={styles.stockView}>
          {stockConfig.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_FromStockLocation"
              defaultValue={fromStockLocation}
              onChange={handleFromStockLocationChange}
              scanKey={stockLocationScanKey}
              isFocus={currentStep === CREATION_STEP.fromStockLocation}
              defaultStockLocation={customerDelivery.fromStockLocation}
            />
          ) : null}
          {currentStep >= CREATION_STEP.product_trackingNumber ? (
            <AvailableProductsSearchBar
              defaultValue={locationLine}
              stockLocationId={fromStockLocation?.id}
              scanKey={itemScanKey}
              onChange={handleStockLocationLineSelection}
              isFocus={true}
              changeScreenAfter={true}
            />
          ) : null}
          {currentStep >= CREATION_STEP.validation ? (
            <>
              <ProductCardInfo
                onPress={handleShowProduct}
                picture={product?.picture}
                code={product?.code}
                name={product?.name}
                trackingNumber={locationLine?.trackingNumber?.trackingNumberSeq}
              />
              <CustomerDeliveryLineQuantityCard
                customerDelivery={customerDelivery}
                customerDeliveryLine={null}
                realQty={realQty}
                setRealQty={setRealQty}
              />
            </>
          ) : null}
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  stockView: {
    marginTop: '2%',
  },
  scroll: {
    height: null,
    flex: 1,
  },
});

export default CustomerDeliveryLineCreationScreen;
