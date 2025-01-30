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
import {useSelector} from '@axelor/aos-mobile-core';
import {
  AvailableProductsSearchBar,
  InternalMoveCreationHeader,
  InternalMoveLineCreationButton,
  InternalMoveLineQuantityCard,
  ProductCardInfo,
  ProductSeeStockLocationDistribution,
  StockLocationSearchBar,
} from '../../components';
import {StockMove} from '../../types';

const fromScanKey = 'from-stock-location_internal-move-line-creation';
const itemScanKey = 'product-tracking-number_internal-move-line-creation';
const toScanKey = 'to-stock-location_internal-move-line-creation';

const CREATION_STEP = {
  fromStockLocation: 0,
  line: 1,
  toStockLocation: 2,
  validation: 3,
};

const InternalMoveLineCreationScreen = ({navigation, route}) => {
  const {
    fromStockLocation: _moveFrom,
    toStockLocation: _moveTo,
    notes: _notes,
  } = route.params;

  const {stockConfig} = useSelector(state => state.stockAppConfig);
  const {user} = useSelector(state => state.user);

  const [currentStep, setStep] = useState(CREATION_STEP.line);
  const [lines, setLines] = useState([]);
  const [notes, setNotes] = useState(_notes);
  const [fromStockLocation, setFromStockLocation] = useState(_moveFrom);
  const [locationLine, setLocationLine] = useState(null);
  const [toStockLocation, setToStockLocation] = useState(_moveTo);
  const [movedQty, setMovedQty] = useState(0);

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

  const handleToProductTrackingNumberChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.line);
      } else {
        setLocationLine(_value);
        handleNextStep(CREATION_STEP.line);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.toStockLocation);
      } else {
        setToStockLocation(_value);
        handleNextStep(CREATION_STEP.toStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

  const handleReset = useCallback(
    (_step = CREATION_STEP.fromStockLocation) => {
      setStep(_step);

      if (_step === CREATION_STEP.toStockLocation) {
        setToStockLocation(null);
      }

      if (_step <= CREATION_STEP.line) {
        setLocationLine(null);
        setMovedQty(0);
      }

      if (_step <= CREATION_STEP.fromStockLocation) {
        setFromStockLocation(null);
      }

      if (_step === CREATION_STEP.validation) {
        setFromStockLocation(_moveFrom);
        setToStockLocation(_moveTo);
        setLocationLine(null);
        setMovedQty(0);
      }
    },
    [_moveFrom, _moveTo],
  );

  const handleNextStep = useCallback(
    _current => {
      setStep(() => {
        if (_current === CREATION_STEP.fromStockLocation) {
          return CREATION_STEP.line;
        }
        if (_current === CREATION_STEP.line) {
          if (toStockLocation != null) {
            return CREATION_STEP.validation;
          }

          return CREATION_STEP.toStockLocation;
        }
        if (_current === CREATION_STEP.toStockLocation) {
          return CREATION_STEP.validation;
        }
        return _current;
      });
    },
    [toStockLocation],
  );

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: locationLine?.product,
    });
  };

  const handleAddLine = useCallback(() => {
    return new Promise(resolve => {
      let _lines = null;

      setLines(_current => {
        if (
          locationLine != null &&
          movedQty > 0 &&
          fromStockLocation != null &&
          toStockLocation != null
        ) {
          _current.push({
            product: locationLine?.product,
            trackingNumber: locationLine?.trackingNumber,
            unit: locationLine?.product?.unit,
            realQty: movedQty,
            fromStockLocation: fromStockLocation,
            toStockLocation: toStockLocation,
          });
        }

        _lines = _current;
        return _current;
      });

      resolve(_lines);
    });
  }, [fromStockLocation, locationLine, movedQty, toStockLocation]);

  const handleOnContinue = useCallback(() => {
    handleReset(CREATION_STEP.validation);
  }, [handleReset]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InternalMoveLineCreationButton
          onContinue={handleOnContinue}
          onAdd={handleAddLine}
          hideAllIf={currentStep !== CREATION_STEP.validation}
          showRealize={lines.length > 0}
          moveFromStockLocation={_moveFrom}
          moveToStockLocation={_moveTo}
          notes={notes}
        />
      }>
      <KeyboardAvoidingScrollView
        keyboardOffset={{
          ios: 70,
          android: 100,
        }}>
        <InternalMoveCreationHeader
          fromStockLocation={_moveFrom}
          toStockLocation={_moveTo}
          notes={notes}
          setNotes={setNotes}
          linesSaved={lines}
        />
        {stockConfig.isManageStockLocationOnStockMoveLine ? (
          <StockLocationSearchBar
            placeholderKey="Stock_OriginalStockLocation"
            scanKey={fromScanKey}
            onChange={handleFromStockLocationChange}
            defaultValue={fromStockLocation}
            isFocus={currentStep === CREATION_STEP.fromStockLocation}
            defaultStockLocation={_moveFrom}
            isScrollViewContainer={locationLine == null}
          />
        ) : null}
        {currentStep >= CREATION_STEP.line ? (
          <AvailableProductsSearchBar
            stockLocationId={fromStockLocation?.id}
            scanKey={itemScanKey}
            onChange={handleToProductTrackingNumberChange}
            defaultValue={locationLine}
            isFocus={currentStep === CREATION_STEP.line}
            isScrollViewContainer={locationLine == null}
          />
        ) : null}
        {locationLine ? (
          <>
            <ProductCardInfo
              name={locationLine?.product?.name}
              code={locationLine?.product?.code}
              picture={locationLine?.product?.picture}
              trackingNumber={
                locationLine?.product?.trackingNumberConfiguration == null
                  ? null
                  : locationLine?.trackingNumber?.trackingNumberSeq
              }
              onPress={handleShowProduct}
            />
            <ProductSeeStockLocationDistribution
              companyId={user.activeCompany?.id}
              product={locationLine?.product}
              forceShow={true}
            />
            <InternalMoveLineQuantityCard
              originalStockLocation={fromStockLocation}
              stockProduct={locationLine?.product}
              trackingNumber={locationLine?.trackingNumber}
              movedQty={movedQty}
              setMovedQty={setMovedQty}
              plannedQty={locationLine?.currentQty}
              status={StockMove.status.Draft}
            />
          </>
        ) : null}
        {stockConfig.isManageStockLocationOnStockMoveLine &&
        (currentStep >= CREATION_STEP.toStockLocation || toStockLocation) ? (
          <StockLocationSearchBar
            placeholderKey="Stock_DestinationStockLocation"
            scanKey={toScanKey}
            onChange={handleToStockLocationChange}
            defaultValue={toStockLocation}
            isFocus={currentStep === CREATION_STEP.toStockLocation}
            secondFilter={true}
            defaultStockLocation={_moveTo}
            isScrollViewContainer={true}
          />
        ) : null}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveLineCreationScreen;
