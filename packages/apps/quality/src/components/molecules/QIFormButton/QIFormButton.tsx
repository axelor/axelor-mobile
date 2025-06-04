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

const Steps = {
  detection: 0,
  identification: 1,
  defaults: 2,
};

const MIN_STEP = Steps.detection;
const MAX_STEP = Steps.defaults;

interface QIFormButtonProps {}

const QIFormButton = ({}: QIFormButtonProps) => {
  const I18n = useTranslator();
  const _dispatch = useDispatch();
  const {actualSteps} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const goToPreviousStep = () => {
    if (actualSteps > MIN_STEP) {
      _dispatch(updateSteps(actualSteps - 1));
    }
  };

  const goToNextStep = () => {
    if (actualSteps < MAX_STEP) {
      _dispatch(updateSteps(actualSteps + 1));
    }
  };

  const styles = useMemo(() => {
    return getStyles(actualSteps);
  }, [actualSteps]);

  const handleRightButtonPress = () => {
    if (actualSteps < MAX_STEP) {
      goToNextStep();
    } else {
      console.log('Save');
    }
  };

  const rightButtonTitle = useMemo(() => {
    return actualSteps === MAX_STEP
      ? I18n.t('Quality_Save')
      : I18n.t('Quality_NextStep');
  }, [I18n, actualSteps]);

  return (
    <View style={styles.buttonContainer}>
      {actualSteps > MIN_STEP && (
        <NavigationButton
          style={styles.button}
          title={I18n.t('Quality_PreviousStep')}
          onPress={goToPreviousStep}
          position="left"
        />
      )}
      <NavigationButton
        style={
          actualSteps === MIN_STEP ? styles.fullWidthButton : styles.button
        }
        title={rightButtonTitle}
        onPress={handleRightButtonPress}
        position={'right'}
      />
    </View>
  );
};

const getStyles = (actualSteps: number) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginHorizontal: actualSteps > MIN_STEP ? 10 : 0,
    },
    button: {
      width: '50%',
    },
    fullWidthButton: {
      width: '100%',
    },
  });

export default QIFormButton;
