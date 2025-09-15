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
import {
  useDispatch,
  useNavigation,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {NavigationButton} from '../../atoms';
import {
  createQualityImprovement,
  updateQualityImprovement,
} from '../../../features/qualityImprovementSlice';
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
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    const sliceFunction: any = objectState.id
      ? updateQualityImprovement
      : createQualityImprovement;

    dispatch(
      sliceFunction({
        qualityImprovement: {
          id: objectState.id,
          version: objectState.version,
          type: objectState.type,
          qiDetectionId: objectState.qiDetection?.id,
          gravityType: objectState.gravityTypeSelect,
          analysisMethodId: objectState.analysisMethod?.id,
          qiIdentification: {
            supplierPartnerId: objectState.supplierPartner?.id,
            supplierPurchaseOrderId: objectState.supplierPurchaseOrder?.id,
            supplierPurchaseOrderLineId:
              objectState.supplierPurchaseOrderLine?.id,
            customerPartnerId: objectState.customerPartner?.id,
            customerSaleOrderId: objectState.customerSaleOrder?.id,
            customerSaleOrderLineId: objectState.customerSaleOrderLine?.id,
            manufOrderId: objectState.manufOrder?.id,
            operationOrderId: objectState.operationOrder?.id,
            productId: objectState.product?.id,
            nonConformingQuantity: objectState.nonConformingQuantity,
          },
          qiResolution: {
            defects: objectState.qiResolutionDefaults?.map((item: any) => ({
              id: item._id,
              qiDefaultId: item.qiDefault?.id,
              description: item.description,
              quantity: item.qty,
              metaFiles: Array.isArray(item.files)
                ? item.files
                    .filter((f: any) => f?.id != null)
                    .map((f: any) => f.id)
                : undefined,
            })),
          },
        },
      }),
    );

    navigation.goBack();
  }, [dispatch, navigation, objectState]);

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
