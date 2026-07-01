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

import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {getCommonStyles} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Icon, ProgressCircle, Text} from '../../atoms';
import {Step} from './types';
import StepList from './StepList';

interface StepperProps {
  steps: Step[];
  activeStepIndex: number;
  displayDropdown?: boolean;
  translator: (key: string, values?: any) => string;
}

const Stepper = ({
  steps,
  activeStepIndex: _activeStepIndex,
  displayDropdown = false,
  translator,
}: StepperProps) => {
  const Colors = useThemeColor();

  const [isStepListVisible, setIsStepListVisible] = useState(false);

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, false, isStepListVisible),
    [Colors, isStepListVisible],
  );

  const activeStepIndex = useMemo(() => {
    if (!_activeStepIndex || _activeStepIndex < 0) return 0;

    const maxIdx = steps?.length ?? 0;

    if (_activeStepIndex >= maxIdx) return maxIdx - 1;

    return _activeStepIndex;
  }, [_activeStepIndex, steps?.length]);

  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <View style={[commonStyles.filter, styles.container]}>
      <TouchableOpacity
        testID="stepper-dropdown"
        activeOpacity={0.9}
        disabled={!displayDropdown}
        onPress={() => setIsStepListVisible(current => !current)}>
        <View style={styles.fixedContainer}>
          <ProgressCircle
            progress={(activeStepIndex + 1) / steps.length}
            isError={steps.some(_step => _step.state === 'error')}
            innerText={translator('Base_StepOfStep', {
              activeStep: activeStepIndex + 1,
              numberOfSteps: steps.length,
            })}
          />
          <View style={styles.textContainer}>
            <Text writingType="title">
              {translator(steps[activeStepIndex].titleKey)}
            </Text>
            {activeStepIndex + 1 !== steps.length && (
              <Text>
                {`${translator('Base_Next')} : ${translator(steps[activeStepIndex + 1].titleKey)}`}
              </Text>
            )}
          </View>
          {displayDropdown && (
            <Icon
              name={isStepListVisible ? 'chevron-up' : 'chevron-down'}
              color={Colors.secondaryColor.background}
            />
          )}
        </View>
        {isStepListVisible && (
          <StepList
            steps={steps}
            translator={translator}
            activeStepIndex={activeStepIndex}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  fixedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    gap: 2,
  },
});

export default Stepper;
