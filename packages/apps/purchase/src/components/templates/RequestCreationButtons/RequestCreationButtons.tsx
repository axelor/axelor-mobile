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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {RequestCreation} from '../../../types';

interface RequestCreationButtonsProps {
  step: number;
  setStep: (step: number) => void;
  lines: any[];
  movedQty: number;
  isEditionMode: boolean;
  unit: any;
  addLine: () => void;
}

const RequestCreationButtons = ({
  step,
  setStep,
  lines,
  movedQty,
  unit,
  isEditionMode,
  addLine,
}: RequestCreationButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const isValidateLineStep = useMemo(
    () => step === RequestCreation.step.validateLine,
    [step],
  );

  const handleFinishPress = () => {
    if (isValidateLineStep) {
      addLine();
    }
    setStep(RequestCreation.step.finish);
  };

  const handleRealizePress = () => {};

  if (
    (step === RequestCreation.step.addLine && lines.length >= 1) ||
    isValidateLineStep
  ) {
    return (
      <View style={styles.container}>
        {isValidateLineStep && (
          <Button
            title={I18n.t(isEditionMode ? 'Base_Save' : 'Base_Add')}
            iconName={isEditionMode ? 'floppy-fill' : 'plus-lg'}
            color={Colors.progressColor}
            width="45%"
            disabled={movedQty === 0 || unit == null}
            onPress={addLine}
          />
        )}
        <Button
          title={I18n.t('Base_Finish')}
          iconName="check-lg"
          width={isValidateLineStep ? '45%' : '90%'}
          disabled={isValidateLineStep && !unit}
          onPress={handleFinishPress}
        />
      </View>
    );
  }

  if (step === RequestCreation.step.finish) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Base_Add')}
          iconName="arrow-left"
          color={Colors.progressColor}
          width={'45%'}
          onPress={() => {
            setStep(RequestCreation.step.addLine);
          }}
        />
        <Button
          title={I18n.t('Base_Realize')}
          iconName="check-lg"
          width="45%"
          onPress={handleRealizePress}
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RequestCreationButtons;
