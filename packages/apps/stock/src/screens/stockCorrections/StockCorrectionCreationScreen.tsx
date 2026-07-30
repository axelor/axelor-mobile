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
  Screen,
  KeyboardAvoidingScrollView,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTypes} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  ProductTrackingNumberSearchBar,
  StockCorrectionButtons,
  StockCorrectionHtmlInput,
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
  StockCorrectionTrackingNumberSelect,
  StockLocationSearchBar,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';

const stockLocationScanKey =
  'original-stock-location_internal-move-select-from';

const itemScanKey = 'product-tracking-number_internal-move-select-item';

const CREATION_STEP = {
  stockLocation: 0,
  product_trackingNumber: 1,
  validation: 3,
};

const DEFAULT_REASON = {name: '', id: null};

const StockCorrectionCreationScreen = ({route}: any) => {
  const {
    stockLocation: routeLocation,
    product: routeProduct,
    trackingNumber: routeTrackingNumber,
  } = route?.params ?? {};
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockCorrection} = useTypes();

  const {user} = useSelector(state => state.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  const [location, setLocation] = useState<any>(routeLocation);
  const [product, setProduct] = useState<any>(routeProduct);
  const [trackingNumber, setTrackingNumber] =
    useState<any>(routeTrackingNumber);
  const [realQty, setRealQty] = useState<number>(0);
  const [reason, setReason] = useState<any>(DEFAULT_REASON);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [comments, setComments] = useState<string | undefined>();

  const databaseQty = useMemo(() => {
    if (productIndicators?.id === product?.id) {
      setRealQty(productIndicators?.realQty);
      return productIndicators?.realQty;
    }
    return 0;
  }, [product?.id, productIndicators]);

  useEffect(() => {
    setCurrentStep(() => {
      if (routeProduct) {
        return CREATION_STEP.validation;
      }
      if (routeLocation != null) {
        return CREATION_STEP.product_trackingNumber;
      }

      return CREATION_STEP.stockLocation;
    });
  }, [routeLocation, routeProduct, routeTrackingNumber]);

  const handleReset = useCallback((_step = CREATION_STEP.stockLocation) => {
    setCurrentStep(_step);

    if (_step <= CREATION_STEP.product_trackingNumber) {
      setProduct(null);
      setTrackingNumber(null);
      setRealQty(0);
      setReason(DEFAULT_REASON);
    }

    if (_step <= CREATION_STEP.stockLocation) {
      setLocation(null);
    }
  }, []);

  const handleNextStep = useCallback((_current: number) => {
    setCurrentStep(() => {
      if (_current <= CREATION_STEP.stockLocation) {
        return CREATION_STEP.product_trackingNumber;
      }
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.validation;
      }
      return _current;
    });
  }, []);

  const handleStockLocationChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(CREATION_STEP.stockLocation);
      } else {
        setLocation(_value);
        handleNextStep(CREATION_STEP.stockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleProductTrackingNumberChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(CREATION_STEP.product_trackingNumber);
      } else {
        console.log(_value);
        if (_value?.product != null) {
          setTrackingNumber(_value);
          setProduct(_value.product);
        } else {
          setProduct(_value);
          setTrackingNumber(null);
        }
        handleNextStep(CREATION_STEP.product_trackingNumber);
      }
    },
    [handleNextStep, handleReset],
  );

  useEffect(() => {
    if (product != null && location != null) {
      dispatch(
        (fetchProductIndicators as any)({
          version: product.version,
          productId: product.id,
          companyId: user.activeCompany?.id,
          stockLocationId: location.id,
        }),
      );
    }
  }, [dispatch, user, product, location]);

  return (
    <Screen
      fixedItems={
        currentStep === CREATION_STEP.validation && (
          <StockCorrectionButtons
            reason={reason}
            product={product}
            trackingNumber={trackingNumber}
            stockLocation={location}
            realQty={realQty}
            comments={comments}
          />
        )
      }>
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 70, android: 100}}>
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <StockLocationSearchBar
            defaultValue={location}
            scanKey={stockLocationScanKey}
            onChange={handleStockLocationChange}
            isFocus={currentStep === CREATION_STEP.stockLocation}
            isScrollViewContainer={location == null}
          />
          {currentStep >= CREATION_STEP.product_trackingNumber ? (
            <ProductTrackingNumberSearchBar
              scanKey={itemScanKey}
              onChange={handleProductTrackingNumberChange}
              defaultValue={trackingNumber ?? product}
              isFocus={currentStep === CREATION_STEP.product_trackingNumber}
              isScrollViewContainer={product == null}
            />
          ) : null}
          {currentStep >= CREATION_STEP.validation ? (
            <>
              <ProductCardInfo
                product={product}
                trackingNumber={trackingNumber}
              />
              <StockCorrectionTrackingNumberSelect
                product={product}
                visible={
                  trackingNumber == null &&
                  product?.trackingNumberConfiguration != null
                }
                handleTrackingSelect={setTrackingNumber}
              />
              <StockCorrectionQuantityCard
                databaseQty={databaseQty}
                realQty={realQty}
                setRealQty={setRealQty}
                status={StockCorrection?.statusSelect.Draft}
                stockProduct={product}
              />
              <StockCorrectionReasonPicker
                reason={reason}
                setReason={setReason}
                status={StockCorrection?.statusSelect.Draft}
              />
              <StockCorrectionHtmlInput setComments={setComments} />
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

export default StockCorrectionCreationScreen;
