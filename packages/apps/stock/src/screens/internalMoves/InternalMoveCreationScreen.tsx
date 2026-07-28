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
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  FormHtmlInput,
  KeyboardAvoidingScrollView,
  Screen,
  useThemeColor,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {
  AvailableProductsSearchBar,
  InternalMoveCreationButtons,
  InternalMoveCreationPickingWidget,
  InternalMoveCreationQuantityCard,
  StockLocationSearchBar,
} from '../../components';

import {InternalMoveCreation} from '../../types';
import {StyleSheet, View} from 'react-native';

const fromStockLocationScanKey = 'from-stock-location_internal-move-creation';
const massScanKey = 'product-massScan-internal-move-creation';
const itemScanKey = 'product-tracking-number_internal-move-creation';
const toStockLocationScanKey = 'to-stock-location_internal-move-creation';

const InternalMoveCreationScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [step, setCurrentStep] = useState(
    InternalMoveCreation.step.fromStockLocation,
  );
  const [fromStockLocation, setFromStockLocation] = useState<any>();
  const [toStockLocation, setToStockLocation] = useState<any>();
  const [lines, setLines] = useState<any[]>([]);
  const [newLine, setNewLine] = useState<any>();
  const [movedQty, setMovedQty] = useState<number>(0);
  const [description, setDescription] = useState<string | undefined>('');

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const indexLine = newLines.findIndex(line => line.id === newLine?.id);

      if (indexLine >= 0) {
        if (isEditionMode) {
          newLines[indexLine].realQty = movedQty;
          newLines[indexLine].description = description;
        } else {
          newLines[indexLine].realQty += movedQty;
        }
      } else {
        newLines.push({
          product: newLine?.product,
          trackingNumber: newLine?.trackingNumber,
          realQty: movedQty,
          currentQty: newLine?.currentQty,
          unit: newLine?.product?.unit,
          id: newLine?.id,
          description: description,
        });
      }

      return newLines;
    });
    handleProductChange(null);
  };

  const handleEditLine = useCallback((line: any) => {
    setNewLine(line);
    setMovedQty(line.realQty);
    setDescription(line.description || '');
    setCurrentStep(InternalMoveCreation.step.validateLine);
  }, []);

  const handleReset = useCallback(
    (_step = InternalMoveCreation.step.fromStockLocation) => {
      setCurrentStep(_step);

      if (_step === InternalMoveCreation.step.fromStockLocation) {
        setFromStockLocation(null);
      }

      if (_step === InternalMoveCreation.step.addLine) {
        setMovedQty(0);
        setNewLine(null);
        setDescription('');
      }

      if (_step === InternalMoveCreation.step.toStockLocation) {
        setToStockLocation(null);
      }
    },
    [],
  );

  const handleFromStockLocationChange = useCallback(
    (_value: any) => {
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
    (_value: any) => {
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
    (_value: any) => {
      if (_value == null) {
        handleReset(InternalMoveCreation.step.toStockLocation);
      } else {
        setToStockLocation(_value);
        setCurrentStep(InternalMoveCreation.step.toStockLocation);
      }
    },
    [handleReset],
  );

  useEffect(() => {
    if (
      lines.length === 0 &&
      step >= InternalMoveCreation.step.toStockLocation
    ) {
      setCurrentStep(InternalMoveCreation.step.addLine);
    }
  }, [step, lines]);

  const isEditionMode = useMemo(
    () =>
      newLine?.realQty > 0 && lines.find(({id}) => id === newLine.id) != null,
    [lines, newLine],
  );

  return (
    <Screen
      fixedItems={
        <InternalMoveCreationButtons
          step={step}
          setStep={setCurrentStep}
          fromStockLocation={fromStockLocation}
          lines={lines}
          toStockLocation={toStockLocation}
          movedQty={movedQty}
          isEditionMode={isEditionMode}
          addLine={handleAddLine}
        />
      }>
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 70, android: 100}}>
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <StockLocationSearchBar
            placeholderKey="Stock_OriginalStockLocation"
            scanKey={fromStockLocationScanKey}
            onChange={handleFromStockLocationChange}
            defaultValue={fromStockLocation}
            isFocus={step === InternalMoveCreation.step.fromStockLocation}
            isScrollViewContainer
          />
          {step >= InternalMoveCreation.step.addLine && (
            <ViewAllEditList
              title={I18n.t('Stock_Products')}
              lines={lines.map(line => ({
                ...line,
                name: line.product?.name,
                nameDetails: line.trackingNumber?.trackingNumberSeq,
                qty: line.realQty,
                unitName: line.unit?.name,
              }))}
              currentLineId={isEditionMode ? newLine.id : null}
              setLines={_lines =>
                setLines(_lines.map(line => ({...line, realQty: line.qty})))
              }
              handleEditLine={handleEditLine}
              isFormWrapper
              translator={I18n.t}
            />
          )}
          {step === InternalMoveCreation.step.addLine && (
            <InternalMoveCreationPickingWidget
              scanKey={massScanKey}
              stockLocationId={fromStockLocation?.id}
              setLines={setLines}
              handleEditLine={handleEditLine}
            />
          )}
          {step === InternalMoveCreation.step.addLine && (
            <AvailableProductsSearchBar
              stockLocationId={fromStockLocation?.id}
              scanKey={itemScanKey}
              onChange={handleProductChange}
              defaultValue={newLine}
              isFocus={step === InternalMoveCreation.step.addLine}
              isScrollViewContainer
            />
          )}
          {step === InternalMoveCreation.step.validateLine && (
            <>
              <InternalMoveCreationQuantityCard
                movedQty={movedQty}
                setMovedQty={setMovedQty}
                cancelMove={() => handleProductChange(null)}
                productName={newLine?.product?.name}
                trackingNumber={newLine?.trackingNumber?.trackingNumberSeq}
                availableQty={newLine?.currentQty}
                productUnit={newLine?.product?.unit?.name}
              />
              <FormHtmlInput
                title={I18n.t('Base_Description')}
                defaultValue={description}
                onChange={setDescription}
              />
            </>
          )}
          {step >= InternalMoveCreation.step.toStockLocation && (
            <StockLocationSearchBar
              placeholderKey="Stock_DestinationStockLocation"
              scanKey={toStockLocationScanKey}
              onChange={handleToStockLocationChange}
              defaultValue={toStockLocation}
              isFocus={step === InternalMoveCreation.step.toStockLocation}
              secondFilter
              isScrollViewContainer
            />
          )}
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

export default InternalMoveCreationScreen;
