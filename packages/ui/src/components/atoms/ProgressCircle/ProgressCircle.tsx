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

interface ProgressCircleProps {
  circleSize?: number;
  strokeWidth?: number;
  activeStep: number;
  numberOfSteps: number;
  isError?: boolean;
  translator: (key: string, values?: any) => string;
}

const ProgressCircle = ({
  circleSize = 80,
  strokeWidth = 4,
  activeStep,
  numberOfSteps,
  isError = false,
  translator,
}: ProgressCircleProps) => {
  const Colors = useThemeColor();

  const progress = useMemo(
    () => activeStep / numberOfSteps,
    [activeStep, numberOfSteps],
  );

  const {radius, circumference, strokeDashoffset} = useMemo(() => {
    const _radius = circleSize / 2 - strokeWidth / 2;
    const _circumference = 2 * Math.PI * _radius;

    return {
      radius: _radius,
      circumference: _circumference,
      strokeDashoffset: _circumference - _circumference * progress,
    };
  }, [circleSize, progress, strokeWidth]);

  return (
    <Svg width={circleSize} height={circleSize}>
      <Circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        stroke={Colors.secondaryColor.background_light}
        strokeWidth={strokeWidth}
        fill="none"
        testID="internal-circle"
      />
      <Circle
        cx={circleSize / 2}
        cy={circleSize / 2}
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
        origin={`${circleSize / 2}, ${circleSize / 2}`}
        fill="none"
        testID="progress-circle"
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
