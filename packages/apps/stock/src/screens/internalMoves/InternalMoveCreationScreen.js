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
import {
  HalfLabelCard,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {InternalMoveLineNotes, StockLocationSearchBar} from '../../components';
import {StockMove} from '../../types';
import {StyleSheet} from 'react-native';

const fromStockLocationScanKey = 'from-stock-location_internal-move-creation';
const toStockLocationScanKey = 'to-stock-location_internal-move-creation';

const CREATION_STEP = {
  fromStockLocation: 0,
  toStockLocation: 1,
  lines: 2,
};

const InternalMoveCreationScreen = ({navigation}) => {
  const I18n = useTranslator();

  const [currentStep, setStep] = useState(CREATION_STEP.fromStockLocation);
  const [fromStockLocation, setFromStockLocation] = useState(null);
  const [toStockLocation, setToStockLocation] = useState(null);
  const [notes, setNotes] = useState(null);

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

  const handleReset = useCallback((_step = CREATION_STEP.fromStockLocation) => {
    setStep(_step);

    if (_step === CREATION_STEP.toStockLocation) {
      setToStockLocation(null);
    }

    if (_step === CREATION_STEP.fromStockLocation) {
      setFromStockLocation(null);
    }
  }, []);

  const handleNextStep = useCallback(
    _current => {
      setStep(() => {
        if (_current === CREATION_STEP.fromStockLocation) {
          if (toStockLocation != null) {
            return CREATION_STEP.lines;
          } else {
            return CREATION_STEP.toStockLocation;
          }
        }
        if (_current <= CREATION_STEP.toStockLocation) {
          return CREATION_STEP.lines;
        }
        return _current;
      });
    },
    [toStockLocation],
  );

  const handleCompleteLines = useCallback(() => {
    navigation.navigate('InternalMoveLineCreationScreen', {
      fromStockLocation,
      toStockLocation,
      notes,
    });
  }, [fromStockLocation, navigation, notes, toStockLocation]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView keyboardOffset={{android: 100}}>
        <StockLocationSearchBar
          placeholderKey="Stock_OriginalStockLocation"
          scanKey={fromStockLocationScanKey}
          onChange={handleFromStockLocationChange}
          defaultValue={fromStockLocation}
          isFocus={currentStep === CREATION_STEP.fromStockLocation}
          isScrollViewContainer={true}
        />
        {currentStep >= CREATION_STEP.toStockLocation || toStockLocation ? (
          <>
            <StockLocationSearchBar
              placeholderKey="Stock_DestinationStockLocation"
              scanKey={toStockLocationScanKey}
              onChange={handleToStockLocationChange}
              defaultValue={toStockLocation}
              isFocus={currentStep === CREATION_STEP.toStockLocation}
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
        {currentStep >= CREATION_STEP.lines && (
          <HalfLabelCard
            style={styles.button}
            iconName="sitemap"
            title={I18n.t('Stock_DefineLines')}
            onPress={handleCompleteLines}
          />
        )}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginRight: 18,
  },
});

export default InternalMoveCreationScreen;
