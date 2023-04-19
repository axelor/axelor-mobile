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
import {KeyboardAvoidingScrollView, Screen} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  filterSecondStockLocations,
  searchStockLocations,
} from '../../features/stockLocationSlice';
import {
  InternalMoveLineCreationButton,
  InternalMoveLineNotes,
  InternalMoveLineQuantityCard,
  ProductCardInfo,
} from '../../components';
import {StockMove} from '../../types';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';
import {searchProductTrackingNumber} from '../../features/productTrackingNumberSlice';

const originalStockLocationScanKey =
  'original-stock-location_internal-move-select-from';

const itemScanKey = 'product-tracking-number_internal-move-select-item';

const destinationStockLocationScanKey =
  'destination-stock-location_internal-move-select-to';

const CREATION_STEP = {
  original_stockLocation: 0,
  product_trackingNumber: 1,
  destination_stockLocation: 2,
  validation: 3,
};

const displayItem = _item => {
  return displayItemTrackingNumber(_item) || displayItemName(_item);
};

const InternalMoveLineCreationScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    stockLocationList: stockLocationListFirstFilter,
    stockLocationListMultiFilter: stockLocationListSecondFilter,
  } = useSelector(state => state.stockLocation);
  const {productTrackingNumberList} = useSelector(
    state => state.productTrackingNumber,
  );
  const {user} = useSelector(state => state.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  const [currentStep, setCurrentStep] = useState(
    CREATION_STEP.original_stockLocation,
  );
  const [originalStockLocation, setOriginalStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const [movedQty, setMovedQty] = useState(0);
  const [notes, setNotes] = useState('');

  const plannedQty = useMemo(
    () =>
      productIndicators.id !== product?.id
        ? 0
        : productIndicators?.availableStock,
    [product, productIndicators],
  );

  const handleFromStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.original_stockLocation);
      } else {
        setOriginalStockLocation(_value);
        handleNextStep();
      }
    },
    [handleNextStep, handleReset],
  );

  const fetchOriginalStockLocationsAPI = useCallback(
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
    if (product != null && originalStockLocation != null) {
      dispatch(
        fetchProductIndicators({
          version: product?.version,
          productId: product?.id,
          companyId: user.activeCompany?.id,
          stockLocationId: originalStockLocation?.id,
        }),
      );
    }
  }, [user.activeCompany?.id, dispatch, product, originalStockLocation]);

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.destination_stockLocation);
      } else {
        setDestinationStockLocation(_value);
        handleNextStep();
      }
    },
    [handleNextStep, handleReset],
  );

  const fetchDestinationStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        filterSecondStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  const handleReset = useCallback(
    (_step = CREATION_STEP.original_stockLocation) => {
      setCurrentStep(_step);

      if (_step <= CREATION_STEP.destination_stockLocation) {
        setDestinationStockLocation(null);
      }

      if (_step <= CREATION_STEP.product_trackingNumber) {
        setProduct(null);
        setTrackingNumber(null);
        setMovedQty(0);
      }

      if (_step <= CREATION_STEP.original_stockLocation) {
        setOriginalStockLocation(null);
      }
    },
    [],
  );

  const handleNextStep = useCallback(() => {
    setCurrentStep(_current => {
      if (_current <= CREATION_STEP.original_stockLocation) {
        return CREATION_STEP.product_trackingNumber;
      }
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.destination_stockLocation;
      }
      if (_current <= CREATION_STEP.destination_stockLocation) {
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
      fixedItems={
        <InternalMoveLineCreationButton
          onContinue={handleReset}
          hideIf={currentStep !== CREATION_STEP.validation}
          product={product}
          trackingNumber={trackingNumber}
          originalStockLocation={originalStockLocation}
          destinationStockLocation={destinationStockLocation}
          movedQty={movedQty}
          notes={notes}
        />
      }>
      <KeyboardAvoidingScrollView>
        <ScannerAutocompleteSearch
          value={originalStockLocation}
          objectList={stockLocationListFirstFilter}
          onChangeValue={handleFromStockLocationChange}
          fetchData={fetchOriginalStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={originalStockLocationScanKey}
          placeholder={I18n.t('Stock_OriginalStockLocation')}
          isFocus={currentStep === CREATION_STEP.original_stockLocation}
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
        {currentStep >= CREATION_STEP.destination_stockLocation ? (
          <>
            <ProductCardInfo
              name={product.name}
              code={product.code}
              picture={product.picture}
              trackingNumber={
                product.trackingNumberConfiguration == null ||
                trackingNumber == null
                  ? null
                  : trackingNumber.trackingNumberSeq
              }
              onPress={handleShowProduct}
            />
            <InternalMoveLineQuantityCard
              originalStockLocation={originalStockLocation}
              stockProduct={product}
              trackingNumber={trackingNumber}
              movedQty={movedQty}
              setMovedQty={setMovedQty}
              plannedQty={plannedQty}
              status={StockMove.status.Draft}
            />
            <ScannerAutocompleteSearch
              value={destinationStockLocation}
              objectList={stockLocationListSecondFilter}
              onChangeValue={handleToStockLocationChange}
              fetchData={fetchDestinationStockLocationsAPI}
              displayValue={displayItemName}
              scanKeySearch={destinationStockLocationScanKey}
              placeholder={I18n.t('Stock_DestinationStockLocation')}
              isFocus={currentStep === CREATION_STEP.destination_stockLocation}
            />
            <InternalMoveLineNotes
              notes={notes}
              setNotes={setNotes}
              status={StockMove.status.Draft}
            />
          </>
        ) : null}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveLineCreationScreen;
