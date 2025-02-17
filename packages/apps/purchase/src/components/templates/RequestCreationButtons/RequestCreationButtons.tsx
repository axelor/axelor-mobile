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
import {useDispatch, useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {createPurchaseRequest} from '../../../features/purchaseRequestSlice';
import {RequestCreation} from '../../../types';

interface RequestCreationButtonsProps {
  step: number;
  lines: any[];
  isEditionMode?: boolean;
  disabled?: boolean;
  addLine: () => void;
  companyId: number;
  description: string;
  resetDefaultStates: () => void;
}

const RequestCreationButtons = ({
  step,
  lines,
  isEditionMode = false,
  disabled = false,
  addLine,
  companyId,
  description,
  resetDefaultStates,
}: RequestCreationButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {PurchaseRequest} = useTypes();
  const dispatch = useDispatch();

  const isValidateLineStep = useMemo(
    () => step === RequestCreation.step.validateLine,
    [step],
  );

  const handleRealizePress = useCallback(() => {
    const purchaseRequestLineList = lines.map(line => ({
      productId: line.product?.id,
      productTitle: line.productTitle,
      unitId: line.unit?.id,
      quantity: line.quantity,
    }));

    dispatch(
      (createPurchaseRequest as any)({
        companyId,
        status: PurchaseRequest?.statusSelect.Requested,
        description,
        purchaseRequestLineList,
      }),
    );
    resetDefaultStates();
  }, [
    companyId,
    description,
    dispatch,
    lines,
    PurchaseRequest?.statusSelect.Requested,
    resetDefaultStates,
  ]);

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
            disabled={disabled}
            onPress={addLine}
          />
        )}
        <Button
          title={I18n.t('Base_Realize')}
          iconName="check-lg"
          width={isValidateLineStep ? '45%' : '90%'}
          disabled={isValidateLineStep}
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
