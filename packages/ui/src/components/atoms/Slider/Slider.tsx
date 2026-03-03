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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {default as RNSlider} from '@react-native-community/slider';
import {Color, useThemeColor} from '../../../theme';
import {useDigitFormat} from '../../../hooks/use-digit-format';
import {Text} from '../../atoms';

const STEPS_LENGTH_LIMIT = 12;

interface SliderProps {
  style?: any;
  color?: Color;
  minValue?: number;
  minLimit?: number;
  maxValue?: number;
  maxLimit?: number;
  step?: number;
  displayStepNumber?: boolean;
  defaultValue: number;
  displaySliderValue?: boolean;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const Slider = ({
  style,
  color,
  minValue = 0,
  minLimit = null,
  maxValue = 100,
  maxLimit = null,
  step = null,
  displayStepNumber = false,
  defaultValue,
  displaySliderValue = true,
  disabled = false,
  onChange,
}: SliderProps) => {
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();

  const [value, setValue] = useState(defaultValue);

  const _color = useMemo(
    () => (disabled ? Colors.secondaryColor : (color ?? Colors.primaryColor)),
    [disabled, Colors, color],
  );

  const displaySteps = useMemo(
    () => step > 0 && displayStepNumber,
    [displayStepNumber, step],
  );

  const stepNumberList = useMemo(() => {
    if (displaySteps) {
      const numberOfSteps = Math.floor((maxValue - minValue) / step) + 1;

      if (numberOfSteps < STEPS_LENGTH_LIMIT) {
        return Array.from(
          {length: numberOfSteps},
          (_, k) => minValue + k * step,
        );
      }
    }

    return [];
  }, [displaySteps, maxValue, minValue, step]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <View testID="sliderContainer" style={[styles.container, style]}>
      <View
        testID="sliderWrapper"
        style={styles.sliderContainer}
        pointerEvents={disabled ? 'none' : 'auto'}>
        <RNSlider
          testID="slider"
          thumbTintColor={_color.background}
          minimumTrackTintColor={_color.background}
          maximumTrackTintColor={_color.background_light}
          minimumValue={minValue}
          lowerLimit={minLimit}
          maximumValue={maxValue}
          upperLimit={maxLimit}
          step={step}
          value={value}
          onValueChange={setValue}
          onSlidingComplete={_value => {
            setValue(_value);
            onChange(Number(formatNumber(_value)));
          }}
        />
        {displaySteps && (
          <View
            testID="sliderStepsContainer"
            style={styles.stepNumberContainer}>
            {stepNumberList?.map((_value, index) => (
              <Text style={styles.stepNumber} fontSize={10} key={index}>
                {_value}
              </Text>
            ))}
          </View>
        )}
      </View>
      {displaySliderValue && (
        <Text style={styles.sliderValue}>{formatNumber(value)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  sliderContainer: {
    flex: 1,
  },
  stepNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  stepNumber: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 20,
  },
  sliderValue: {
    textAlign: 'right',
    width: '20%',
    paddingRight: 12,
  },
});

export default Slider;
