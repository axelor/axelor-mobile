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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {NavigationButton} from '../../atoms';
import {QualityImprovement as QI_Type} from '../../../types';

type SetterFunction<T> = (value: T | ((_current: T) => T)) => void;

const Steps = QI_Type.Steps;

const MIN_STEP = Steps.detection;
const MAX_STEP = Steps.defaults;

interface QIFormButtonProps {
  objectState?: any;
  handleObjectChange?: SetterFunction<any>;
}

const QIFormButton = ({objectState, handleObjectChange}: QIFormButtonProps) => {
  const I18n = useTranslator();
  const {QualityImprovement, QIDetection} = useTypes();

  const handleStepUpdate = useCallback(
    (_value: number) =>
      handleObjectChange((_current: any) => ({..._current, stepper: _value})),
    [handleObjectChange],
  );

  const currentStep = useMemo(
    () => objectState?.stepper,
    [objectState?.stepper],
  );

  const skipIdentification = useMemo(() => {
    const isAnalysis =
      objectState?.qiDetection?.origin === QIDetection.origin?.None;
    const isSystem = objectState?.type === QualityImprovement.type?.System;

    return isAnalysis && isSystem;
  }, [
    QIDetection.origin?.None,
    QualityImprovement.type?.System,
    objectState?.qiDetection?.origin,
    objectState?.type,
  ]);

  const handlePrevious = useCallback(() => {
    if (currentStep === Steps.defaults) {
      if (skipIdentification) {
        handleStepUpdate(Steps.detection);
      } else {
        handleStepUpdate(Steps.identification);
      }
    } else if (currentStep === Steps.identification) {
      handleStepUpdate(Steps.detection);
    }
  }, [currentStep, handleStepUpdate, skipIdentification]);

  const handleNext = useCallback(() => {
    if (currentStep === Steps.detection) {
      if (skipIdentification) {
        handleStepUpdate(Steps.defaults);
      } else {
        handleStepUpdate(Steps.identification);
      }
    } else if (currentStep === Steps.identification) {
      handleStepUpdate(Steps.defaults);
    }
  }, [currentStep, handleStepUpdate, skipIdentification]);

  const styles = useMemo(() => getStyles(currentStep), [currentStep]);

  const handleSave = useCallback(() => {
    console.log('Save');
  }, []);

  return (
    <View style={styles.buttonContainer}>
      {currentStep > MIN_STEP && (
        <NavigationButton
          style={styles.button}
          title={I18n.t('Quality_Previous')}
          onPress={handlePrevious}
          position="left"
        />
      )}
      {currentStep !== MAX_STEP ? (
        <NavigationButton
          style={styles.button}
          title={I18n.t('Quality_Next')}
          onPress={handleNext}
          position="right"
        />
      ) : (
        <Button
          title={I18n.t('Quality_Send')}
          onPress={handleSave}
          width="50%"
        />
      )}
    </View>
  );
};

const getStyles = (actualStep: number) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginHorizontal: actualStep > MIN_STEP ? 10 : 0,
    },
    button: {
      width: actualStep === MIN_STEP ? '100%' : '50%',
    },
  });

export default QIFormButton;
