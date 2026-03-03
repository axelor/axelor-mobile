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
import {Icon, Text} from '../../atoms';
import {Step, StepState} from './types';

interface StepListProps {
  steps: Step[];
  translator: (key: string, values?: any) => string;
}

const StepList = ({steps, translator}: StepListProps) => {
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
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View style={styles.stepWrapper} key={index}>
          <View style={styles.stepColumn}>
            <Icon
              name={getIconName(step.state)}
              color={getIconColor(step.state)}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.verticalLine,
                  {backgroundColor: getIconColor(step.state)},
                ]}
              />
            )}
          </View>
          <Text>{translator(step.titleKey)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  stepWrapper: {
    flexDirection: 'row',
  },
  stepColumn: {
    alignItems: 'center',
    marginRight: 15,
  },
  verticalLine: {
    width: 1,
    height: 10,
    marginVertical: 5,
  },
});

export default StepList;
