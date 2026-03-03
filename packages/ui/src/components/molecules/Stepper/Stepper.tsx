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
import {useThemeColor} from '../../../theme';
import {Card, Icon, ProgressCircle, Text} from '../../atoms';
import {Step} from './types';
import StepList from './StepList';

interface StepperProps {
  steps: Step[];
  activeStepIndex: number;
  isCardBackground?: boolean;
  displayDropdown?: boolean;
  translator: (key: string, values?: any) => string;
}

const Stepper = ({
  steps,
  activeStepIndex: _activeStepIndex,
  isCardBackground = false,
  displayDropdown = false,
  translator,
}: StepperProps) => {
  const Colors = useThemeColor();

  const [isStepListVisible, setIsStepListVisible] = useState(false);

  const _isCardBackground = useMemo(
    () => isCardBackground || displayDropdown,
    [displayDropdown, isCardBackground],
  );

  const ContainerComponent = useMemo(
    () => (_isCardBackground ? Card : View),
    [_isCardBackground],
  );

  const styles = useMemo(
    () => getStyles(_isCardBackground, Colors.secondaryColor.background),
    [Colors.secondaryColor.background, _isCardBackground],
  );

  const activeStepIndex = useMemo(() => {
    if (!_activeStepIndex || _activeStepIndex < 0) {
      return 0;
    }

    const maxIdx = steps?.length ?? 0;

    if (_activeStepIndex >= maxIdx) {
      return maxIdx - 1;
    }

    return _activeStepIndex;
  }, [_activeStepIndex, steps?.length]);

  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <ContainerComponent style={styles.container}>
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
              style={styles.chevronIcon}
            />
          )}
        </View>
        {isStepListVisible && (
          <StepList steps={steps} translator={translator} />
        )}
      </TouchableOpacity>
    </ContainerComponent>
  );
};

const getStyles = (isBorder: boolean, borderColor: string) =>
  StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 3,
      paddingRight: null,
      borderWidth: isBorder ? 1 : 0,
      borderColor: borderColor,
    },
    fixedContainer: {
      flexDirection: 'row',
      gap: 15,
    },
    textContainer: {
      justifyContent: 'center',
      gap: 5,
    },
    chevronIcon: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  });

export default Stepper;
