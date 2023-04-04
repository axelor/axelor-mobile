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
import {Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  StockCorrectionCreationButton,
  StockCorrectionProductCardInfo,
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockCorrection from '../../types/stock-corrrection';
import {displayItemTrackingNumber} from '../../utils/displayers';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {searchProductTrackingNumber} from '../../features/productTrackingNumberSlice';

const stockLocationScanKey =
  'original-stock-location_internal-move-select-from';

const itemScanKey = 'product-tracking-number_internal-move-select-item';

const CREATION_STEP = {
  stockLocation: 0,
  product_trackingNumber: 1,
  validation: 3,
};

const displayItem = _item => {
  return displayItemTrackingNumber(_item) || displayItemName(_item);
};

const DEFAULT_REASON = {name: '', id: null};

const StockCorrectionCreationScreen = ({route}) => {
  const routeLocation = route?.params?.stockLocation;
  const routeProduct = route?.params?.product;
  const routeTrackingNumber = route?.params?.trackingNumber;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productTrackingNumberList} = useSelector(
    state => state.productTrackingNumber,
  );

  const [location, setLocation] = useState(routeLocation);
  const [product, setProduct] = useState(routeProduct);
  const [trackingNumber, setTrackingNumber] = useState(routeTrackingNumber);
  const [realQty, setRealQty] = useState(0);
  const [reason, setReason] = useState(DEFAULT_REASON);
  const [currentStep, setCurrentStep] = useState();

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

  const handleStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.stockLocation);
      } else {
        setLocation(_value);
        handleNextStep();
      }
    },
    [handleNextStep, handleReset],
  );

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  const searchProductTrackingNumberAPI = useCallback(
    filterValue => {
      dispatch(
        searchProductTrackingNumber({
          searchValue: filterValue,
        }),
      );
    },
    [dispatch],
  );

  const handleToProductTrackingNumberChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.product_trackingNumber);
      } else {
        if (_value?.product != null) {
          setTrackingNumber(_value);
          setProduct(_value.product);
        } else {
          setProduct(_value);
          setTrackingNumber(null);
        }
        handleNextStep();
      }
    },
    [handleNextStep, handleReset],
  );

  useEffect(() => {
    if (product != null && location != null) {
      dispatch(
        fetchProductIndicators({
          version: product.version,
          productId: product.id,
          companyId: user.activeCompany?.id,
          stockLocationId: location.id,
        }),
      );
    }
  }, [dispatch, user, product, location]);

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

  const handleNextStep = useCallback(() => {
    setCurrentStep(_current => {
      if (_current <= CREATION_STEP.stockLocation) {
        return CREATION_STEP.product_trackingNumber;
      }
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.validation;
      }
      return _current;
    });
  }, []);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        currentStep === CREATION_STEP.validation && (
          <StockCorrectionCreationButton
            reason={reason}
            product={product}
            trackingNumber={trackingNumber}
            stockLocation={location}
            realQty={realQty}
          />
        )
      }>
      <ScrollView>
        <ScannerAutocompleteSearch
          value={location}
          objectList={stockLocationList}
          onChangeValue={handleStockLocationChange}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
          isFocus={currentStep === CREATION_STEP.stockLocation}
        />
        {currentStep >= CREATION_STEP.product_trackingNumber ? (
          <ScannerAutocompleteSearch
            value={trackingNumber || product}
            objectList={productTrackingNumberList}
            onChangeValue={handleToProductTrackingNumberChange}
            fetchData={searchProductTrackingNumberAPI}
            displayValue={displayItem}
            scanKeySearch={itemScanKey}
            placeholder={I18n.t('Stock_ProductTrackingNumber')}
            isFocus={currentStep === CREATION_STEP.product_trackingNumber}
          />
        ) : null}
        {currentStep >= CREATION_STEP.validation ? (
          <>
            <StockCorrectionProductCardInfo
              stockProduct={product}
              trackingNumber={trackingNumber}
            />
            <StockCorrectionQuantityCard
              databaseQty={databaseQty}
              realQty={realQty}
              setRealQty={setRealQty}
              status={StockCorrection.status.Draft}
              stockProduct={product}
            />
            <StockCorrectionReasonPicker
              reason={reason}
              setReason={setReason}
              status={StockCorrection.status.Draft}
            />
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
};

export default StockCorrectionCreationScreen;
