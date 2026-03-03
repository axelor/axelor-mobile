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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {createInternalMove} from '../../../../features/internalMoveSlice';
import {InternalMoveCreation} from '../../../../types';

interface InternalMoveCreationButtonsProps {
  step: number;
  setStep: (step: number) => void;
  fromStockLocation: any;
  lines: any[];
  toStockLocation: any;
  movedQty: number;
  isEditionMode: boolean;
  addLine: () => void;
}

const InternalMoveCreationButtons = ({
  step,
  setStep,
  fromStockLocation,
  lines,
  toStockLocation,
  movedQty,
  isEditionMode,
  addLine,
}: InternalMoveCreationButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state.user);

  const handleFinishPress = () => {
    if (step === InternalMoveCreation.step.validateLine) {
      addLine();
    }
    setStep(InternalMoveCreation.step.toStockLocation);
  };

  const handleRealizePress = () => {
    dispatch(
      (createInternalMove as any)({
        companyId: user?.activeCompany?.id,
        fromStockLocationId: fromStockLocation.id,
        toStockLocationId: toStockLocation.id,
        lineItems: lines,
      }),
    );
    navigation.popToTop();
  };

  if (
    (step === InternalMoveCreation.step.addLine && lines.length >= 1) ||
    step === InternalMoveCreation.step.validateLine
  ) {
    return (
      <View style={styles.container}>
        {step === InternalMoveCreation.step.validateLine && (
          <Button
            title={I18n.t(isEditionMode ? 'Base_Save' : 'Base_Add')}
            iconName={isEditionMode ? null : 'plus-lg'}
            color={Colors.progressColor}
            width="45%"
            disabled={movedQty === 0}
            onPress={addLine}
          />
        )}
        <Button
          title={I18n.t('Base_Finish')}
          iconName="check-lg"
          width={
            step === InternalMoveCreation.step.validateLine ? '45%' : '90%'
          }
          onPress={handleFinishPress}
        />
      </View>
    );
  }

  if (step === InternalMoveCreation.step.toStockLocation) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Base_Add')}
          iconName="arrow-left"
          color={Colors.progressColor}
          width={toStockLocation ? '45%' : '90%'}
          onPress={() => {
            setStep(InternalMoveCreation.step.addLine);
          }}
        />
        {toStockLocation && (
          <Button
            title={I18n.t('Base_Realize')}
            iconName="check"
            width="45%"
            onPress={handleRealizePress}
          />
        )}
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

export default InternalMoveCreationButtons;
