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

import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Card, Icon, ProgressCircle, Text} from '../../atoms';
import StepList from './StepList';

export enum StepState {
  draft = 'draft',
  inProgress = 'inProgress',
  completed = 'completed',
  error = 'error',
}

export interface Step {
  titleKey: string;
  state: StepState;
}

interface StepperProps {
  steps: Step[];
  activeStepIndex: number;
  isCardBackground?: boolean;
  displayDropdown?: boolean;
  translator: (key: string, values?: any) => string;
}

const Stepper = ({
  steps,
  activeStepIndex,
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

  return (
    <ContainerComponent style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={!displayDropdown}
        onPress={() => setIsStepListVisible(current => !current)}>
        <View style={styles.fixedContainer}>
          <ProgressCircle
            activeStep={activeStepIndex + 1}
            numberOfSteps={steps.length}
            isError={steps.some(_step => _step.state === 'error')}
            translator={translator}
          />
          <View style={styles.textContainer}>
            <Text writingType="title">{steps[activeStepIndex].titleKey}</Text>
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
