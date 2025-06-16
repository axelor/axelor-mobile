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
import {useSelector, useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {NavigationButton} from '../../atoms';
import {updateSteps} from '../../../features/qualityImprovementSlice';
import {QualityImprovement} from '../../../types';

const MIN_STEP = QualityImprovement.Steps.detection;
const MAX_STEP = QualityImprovement.Steps.defaults;

interface QIFormButtonProps {}

const QIFormButton = ({}: QIFormButtonProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {actualStep} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const goToPreviousStep = () => {
    if (actualStep > MIN_STEP) {
      dispatch(updateSteps(actualStep - 1));
    }
  };

  const goToNextStep = () => {
    if (actualStep < MAX_STEP) {
      dispatch(updateSteps(actualStep + 1));
    }
  };

  const styles = useMemo(() => {
    return getStyles(actualStep);
  }, [actualStep]);

  const handleRightButtonPress = () => {
    if (actualStep < MAX_STEP) {
      goToNextStep();
    } else {
      console.log('Save');
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {actualStep > MIN_STEP && (
        <NavigationButton
          style={styles.button}
          title={I18n.t('Quality_Previous')}
          onPress={goToPreviousStep}
          position="left"
        />
      )}
      <NavigationButton
        style={actualStep === MIN_STEP ? styles.fullWidthButton : styles.button}
        title={I18n.t(
          actualStep === MAX_STEP ? 'Quality_Save' : 'Quality_Next',
        )}
        onPress={handleRightButtonPress}
        position={'right'}
      />
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
    button: {width: '50%'},
    fullWidthButton: {width: '100%'},
  });

export default QIFormButton;
