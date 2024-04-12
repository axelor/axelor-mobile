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

import React, {useCallback, useEffect, useState} from 'react';
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

const InternalMoveCreationScreen = () => {
  const [currentStep, setCurrentStep] = useState(
    InternalMoveCreation.step.fromStockLocation,
  );
  const [fromStockLocation, setFromStockLocation] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);
  const [toStockLocation, setToStockLocation] = useState(null);
  const [movedQty, setMovedQty] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const indexLine = newLines.findIndex(line => line.id === newLine?.id);

      if (indexLine >= 0) {
        const prevLineQty = newLines[indexLine].realQty;
        newLines[indexLine].realQty =
          newLine.realQty > 0 ? movedQty : prevLineQty + movedQty;
      } else {
        newLines.push({
          product: newLine?.product,
          trackingNumber: newLine?.trackingNumber,
          realQty: movedQty,
          unit: newLine?.product?.unit,
          id: newLine?.id,
        });
      }

      return newLines;
    });
    handleProductChange(null);
  };

  const handleEditLine = line => {
    setNewLine(line);
    setMovedQty(line.realQty);
    setCurrentStep(InternalMoveCreation.step.validateLine);
  };

  const handleFromStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.fromStockLocation);
      } else {
        setFromStockLocation(_value);
        setCurrentStep(InternalMoveCreation.step.addLine);
      }
    },
    [handleReset],
  );

  const handleProductChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.addLine);
      } else {
        setNewLine(_value);
        setCurrentStep(InternalMoveCreation.step.validateLine);
      }
    },
    [handleReset],
  );

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.toStockLocation);
      } else {
        setToStockLocation(_value);
        setCurrentStep(InternalMoveCreation.step.toStockLocation);
      }
    },
    [handleReset],
  );

  const handleReset = useCallback(
    (_step = InternalMoveCreation.step.fromStockLocation) => {
      setCurrentStep(_step);

      if (_step === InternalMoveCreation.step.fromStockLocation) {
        setFromStockLocation(null);
      }

      if (_step === InternalMoveCreation.step.addLine) {
        setMovedQty(0);
        setNewLine(null);
      }

      if (_step === InternalMoveCreation.step.toStockLocation) {
        setToStockLocation(null);
      }
    },
    [],
  );

  useEffect(() => {
    if (
      lines.length === 0 &&
      currentStep >= InternalMoveCreation.step.toStockLocation
    ) {
      setCurrentStep(InternalMoveCreation.step.addLine);
    }
  }, [currentStep, lines]);

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
          addLine={handleAddLine}
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
            handleEditLine={handleEditLine}
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
          lines={lines}
          setLines={setLines}
          handleEditLine={handleEditLine}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveCreationScreen;
