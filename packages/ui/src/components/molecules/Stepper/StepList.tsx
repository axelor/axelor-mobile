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
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';
import {HorizontalRule, Icon, Text, VerticalRule} from '../../atoms';
import {Step, StepState} from './types';

interface StepListProps {
  steps: Step[];
  activeStepIndex?: number;
  translator: (key: string, values?: any) => string;
}

const StepList = ({steps, activeStepIndex = 0, translator}: StepListProps) => {
  const Colors = useThemeColor();

  const getIconName = (state: StepState) => {
    switch (state) {
      case StepState.inProgress:
        return 'record-circle';
      case StepState.completed:
        return 'check-circle';
      case StepState.error:
        return 'exclamation-circle';
      default:
        return 'circle';
    }
  };

  const getIconColor = (state: StepState) => {
    switch (state) {
      case StepState.inProgress:
        return Colors.progressColor.background;
      case StepState.completed:
        return Colors.successColor.background;
      case StepState.error:
        return Colors.errorColor.background;
      default:
        return Colors.secondaryColor.background;
    }
  };

  return (
    <View>
      <HorizontalRule
        style={styles.border}
        color={Colors.secondaryColor.background_light}
      />
      {steps.map((step, index) => (
        <View style={styles.stepWrapper} key={index}>
          <View style={styles.stepColumn}>
            <Icon
              name={getIconName(step.state)}
              color={getIconColor(step.state)}
            />
            {index < steps.length - 1 && (
              <VerticalRule
                style={styles.verticalLine}
                color={getIconColor(step.state)}
              />
            )}
          </View>
          <Text
            writingType={activeStepIndex === index ? 'important' : undefined}
            fontSize={12}>
            {translator(step.titleKey)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    marginVertical: 8,
    width: '80%',
    alignSelf: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  stepColumn: {
    alignItems: 'center',
  },
  verticalLine: {
    height: 10,
    marginVertical: 5,
  },
});

export default StepList;
