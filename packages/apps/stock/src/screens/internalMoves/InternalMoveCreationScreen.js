/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  InternalMoveCreationAlert,
  InternalMoveCreationButtons,
  InternalMoveCreationQuantityCard,
  InternalMoveCreationViewAll,
  StockLocationSearchBar,
} from '../../components';

import {InternalMoveCreation} from '../../types';

const fromStockLocationScanKey = 'from-stock-location_internal-move-creation';
const itemScanKey = 'product-tracking-number_internal-move-creation';
const toStockLocationScanKey = 'to-stock-location_internal-move-creation';

const InternalMoveCreationScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(
    InternalMoveCreation.step.fromStockLocation,
  );
  const [fromStockLocation, setFromStockLocation] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);
  const [toStockLocation, setToStockLocation] = useState(null);
  const [movedQty, setMovedQty] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleFromStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.fromStockLocation);
      } else {
        setFromStockLocation(_value);
        handleNextStep(InternalMoveCreation.step.fromStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleProductChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.addLine);
      } else {
        setNewLine(_value);
        handleNextStep(InternalMoveCreation.step.validateLine);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.toStockLocation);
      } else {
        setToStockLocation(_value);
        handleNextStep(InternalMoveCreation.step.toStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleReset = useCallback(
    (_step = InternalMoveCreation.step.fromStockLocation) => {
      setCurrentStep(_step);

      if (_step === InternalMoveCreation.step.fromStockLocation) {
        setFromStockLocation(null);
      }

      if (_step === InternalMoveCreation.step.addLine) {
        setNewLine(null);
      }

      if (_step === InternalMoveCreation.step.toStockLocation) {
        setToStockLocation(null);
      }
    },
    [],
  );

  const handleNextStep = useCallback(_current => {
    setCurrentStep(() => {
      if (_current === InternalMoveCreation.step.fromStockLocation) {
        return InternalMoveCreation.step.addLine;
      }
      return _current;
    });
  }, []);

  return (
    <Screen
      fixedItems={
        <InternalMoveCreationButtons
          step={currentStep}
          setStep={setCurrentStep}
          fromStockLocation={fromStockLocation}
          lines={lines}
          toStockLocation={toStockLocation}
          movedQty={movedQty}
          addLine={() => {
            setLines(prevLines => {
              prevLines.push({
                product: newLine?.product,
                trackingNumber: newLine?.trackingNumber,
                realQty: movedQty,
                unit: newLine?.product?.unit,
              });
              return prevLines;
            });
            setMovedQty(0);
            handleProductChange(null);
          }}
        />
      }>
      <KeyboardAvoidingScrollView keyboardOffset={{android: 100}}>
        <StockLocationSearchBar
          placeholderKey="Stock_OriginalStockLocation"
          scanKey={fromStockLocationScanKey}
          onChange={handleFromStockLocationChange}
          defaultValue={fromStockLocation}
          isFocus={currentStep === InternalMoveCreation.step.fromStockLocation}
          isScrollViewContainer={true}
        />
        {currentStep >= InternalMoveCreation.step.addLine && (
          <InternalMoveCreationViewAll
            lines={lines}
            setLines={setLines}
            setIsAlertVisible={setIsAlertVisible}
          />
        )}
        {currentStep === InternalMoveCreation.step.addLine && (
          <AvailableProductsSearchBar
            stockLocationId={fromStockLocation?.id}
            scanKey={itemScanKey}
            onChange={handleProductChange}
            defaultValue={newLine}
            isFocus={currentStep === InternalMoveCreation.step.addLine}
            isScrollViewContainer={true}
          />
        )}
        {currentStep === InternalMoveCreation.step.validateLine && (
          <InternalMoveCreationQuantityCard
            movedQty={movedQty}
            setMovedQty={setMovedQty}
            cancelMove={() => handleProductChange(null)}
            productName={newLine?.product?.name}
            trackingNumber={newLine?.trackingNumber?.trackingNumberSeq}
            availableQty={newLine?.product?.currentQty}
            productUnit={newLine?.product?.unit?.name}
          />
        )}
        {currentStep >= InternalMoveCreation.step.toStockLocation && (
          <StockLocationSearchBar
            placeholderKey="Stock_DestinationStockLocation"
            scanKey={toStockLocationScanKey}
            onChange={handleToStockLocationChange}
            defaultValue={toStockLocation}
            isFocus={currentStep === InternalMoveCreation.step.toStockLocation}
            secondFilter={true}
            isScrollViewContainer={true}
          />
        )}
        <InternalMoveCreationAlert
          isAlertVisible={isAlertVisible}
          setIsAlertVisible={setIsAlertVisible}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveCreationScreen;
