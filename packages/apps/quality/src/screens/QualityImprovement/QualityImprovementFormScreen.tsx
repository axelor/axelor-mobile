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

import React from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {NavigationButton} from '../../components';
import {StyleSheet, View} from 'react-native';
import {updateSteps} from '../../features/qualityImprovementSlice';

const Steps = {
  detection: 0,
  identification: 1,
  defaults: 2,
};

const MIN_STEP = Steps.detection;
const MAX_STEP = Steps.defaults;

const QualityImprovementFormScreen = ({}) => {
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

  return (
    <Screen removeSpaceOnTop={true}>
      <FormView
        formKey="quality_qualityImprovement"
        defaultEditMode
        floatingTools={false}
        actions={[
          {
            key: 'create-qi',
            type: 'create',
            needValidation: true,
            needRequiredFields: true,
            customAction: ({dispatch, objectState}) => {},
            // createCatalogAPI(objectState, dispatch),
          },
          {
            key: 'navigation-button',
            type: 'custom',
            customComponent: (
              <View style={styles.buttinContainer}>
                <NavigationButton
                  icon={'dash-lg'}
                  disabled={actualSteps === MIN_STEP}
                  onPress={goToPreviousStep}
                  position={'left'}
                />
                <NavigationButton
                  disabled={actualSteps === MAX_STEP}
                  icon={'plus'}
                  onPress={goToNextStep}
                  position={'right'}
                />
              </View>
            ),
          },
        ]}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 18,
  },
});

export default QualityImprovementFormScreen;
