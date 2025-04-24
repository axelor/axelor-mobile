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
import {Svg, Circle} from 'react-native-svg';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

const CIRCLE_SIZE = 80;

interface ProgressCircleProps {
  activeStep: number;
  numberOfSteps: number;
  isError: boolean;
  translator: (key: string, values?: any) => string;
}

const ProgressCircle = ({
  activeStep,
  numberOfSteps,
  isError,
  translator,
}: ProgressCircleProps) => {
  const Colors = useThemeColor();

  const progress = useMemo(
    () => activeStep / numberOfSteps,
    [activeStep, numberOfSteps],
  );

  const radius = 38;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
      <Circle
        cx={CIRCLE_SIZE / 2}
        cy={CIRCLE_SIZE / 2}
        r={radius}
        stroke={Colors.secondaryColor.background_light}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={CIRCLE_SIZE / 2}
        cy={CIRCLE_SIZE / 2}
        r={radius}
        stroke={
          isError
            ? Colors.errorColor.background
            : Colors.successColor.background
        }
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        rotation="-90"
        origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
        fill="none"
      />
      <View style={styles.textContainer}>
        <Text writingType="important">
          {translator('Base_StepOfStep', {activeStep, numberOfSteps})}
        </Text>
      </View>
    </Svg>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressCircle;
