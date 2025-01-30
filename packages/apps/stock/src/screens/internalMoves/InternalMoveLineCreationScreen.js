/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {KeyboardAvoidingScrollView, Screen} from '@axelor/aos-mobile-ui';
import {
  AvailableProductsSearchBar,
  InternalMoveLineCreationButton,
  InternalMoveLineNotes,
  InternalMoveLineQuantityCard,
  ProductCardInfo,
  StockLocationSearchBar,
} from '../../components';
import {StockMove} from '../../types';

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

const InternalMoveLineCreationScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(
    CREATION_STEP.original_stockLocation,
  );
  const [originalStockLocation, setOriginalStockLocation] = useState(null);
  const [stockLocationLine, setStockLocationLine] = useState(null);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const [movedQty, setMovedQty] = useState(0);
  const [notes, setNotes] = useState('');

  const handleFromStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.original_stockLocation);
      } else {
        setOriginalStockLocation(_value);
        handleNextStep(CREATION_STEP.original_stockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleToProductTrackingNumberChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.product_trackingNumber);
      } else {
        setStockLocationLine(_value);
        handleNextStep(CREATION_STEP.product_trackingNumber);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.destination_stockLocation);
      } else {
        setDestinationStockLocation(_value);
        handleNextStep(CREATION_STEP.destination_stockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleReset = useCallback(
    (_step = CREATION_STEP.original_stockLocation) => {
      setCurrentStep(_step);

      if (_step === CREATION_STEP.destination_stockLocation) {
        setDestinationStockLocation(null);
      }

      if (_step <= CREATION_STEP.product_trackingNumber) {
        setStockLocationLine(null);
        setMovedQty(0);
      }

      if (_step <= CREATION_STEP.original_stockLocation) {
        setOriginalStockLocation(null);
        setDestinationStockLocation(null);
      }

      if (_step === CREATION_STEP.validation) {
        setMovedQty(0);
      }
    },
    [],
  );

  const handleNextStep = useCallback(_current => {
    setCurrentStep(() => {
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
      product: stockLocationLine?.product,
    });
  };

  const handleOnContinue = useCallback(() => {
    handleReset(CREATION_STEP.validation);
  }, [handleReset]);

  return (
    <Screen
      fixedItems={
        <InternalMoveLineCreationButton
          onContinue={handleOnContinue}
          hideIf={currentStep !== CREATION_STEP.validation}
          product={stockLocationLine?.product}
          trackingNumber={stockLocationLine?.trackingNumber}
          originalStockLocation={originalStockLocation}
          destinationStockLocation={destinationStockLocation}
          movedQty={movedQty}
          notes={notes}
        />
      }>
      <KeyboardAvoidingScrollView>
        <StockLocationSearchBar
          placeholderKey="Stock_OriginalStockLocation"
          scanKey={originalStockLocationScanKey}
          onChange={handleFromStockLocationChange}
          defaultValue={originalStockLocation}
          isFocus={currentStep === CREATION_STEP.original_stockLocation}
          isScrollViewContainer={stockLocationLine == null}
        />
        {currentStep >= CREATION_STEP.product_trackingNumber ? (
          <AvailableProductsSearchBar
            stockLocationId={originalStockLocation?.id}
            scanKey={itemScanKey}
            onChange={handleToProductTrackingNumberChange}
            defaultValue={stockLocationLine}
            isFocus={currentStep === CREATION_STEP.product_trackingNumber}
            isScrollViewContainer={true}
          />
        ) : null}
        {stockLocationLine ? (
          <>
            <ProductCardInfo
              name={stockLocationLine?.product?.name}
              code={stockLocationLine?.product?.code}
              picture={stockLocationLine?.product?.picture}
              trackingNumber={
                stockLocationLine?.product?.trackingNumberConfiguration ==
                  null || stockLocationLine?.trackingNumber == null
                  ? null
                  : stockLocationLine?.trackingNumber.trackingNumberSeq
              }
              onPress={handleShowProduct}
            />
            <InternalMoveLineQuantityCard
              originalStockLocation={originalStockLocation}
              stockProduct={stockLocationLine?.product}
              trackingNumber={stockLocationLine?.trackingNumber}
              movedQty={movedQty}
              setMovedQty={setMovedQty}
              plannedQty={stockLocationLine?.currentQty}
              status={StockMove.status.Draft}
            />
          </>
        ) : null}
        {currentStep >= CREATION_STEP.destination_stockLocation ||
        destinationStockLocation ? (
          <>
            <StockLocationSearchBar
              placeholderKey="Stock_DestinationStockLocation"
              scanKey={destinationStockLocationScanKey}
              onChange={handleToStockLocationChange}
              defaultValue={destinationStockLocation}
              isFocus={currentStep === CREATION_STEP.destination_stock}
              secondFilter={true}
              isScrollViewContainer={true}
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
