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
import {Slider, Text} from '../../atoms';
import {Color, useThemeColor} from '../../../theme';
import {getCommonStyles} from '../../../utils';

interface FormSliderProps {
  style?: any;
  title: string;
  color?: Color;
  minValue?: number;
  minLimit?: number;
  maxValue?: number;
  maxLimit?: number;
  step?: number;
  displayStepNumber?: boolean;
  defaultValue: number;
  displaySliderValue?: boolean;
  readonly?: boolean;
  onChange: (value: number) => void;
}

const FormSlider = ({
  style,
  title,
  color,
  minValue,
  minLimit,
  maxValue,
  maxLimit,
  step,
  displayStepNumber,
  defaultValue,
  displaySliderValue,
  readonly,
  onChange,
}: FormSliderProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const styles = useMemo(
    () => getStyles(Colors.secondaryColor.background),
    [Colors],
  );

  return (
    <View testID="formSliderContainer" style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
        ]}>
        <Slider
          color={color}
          minValue={minValue}
          minLimit={minLimit}
          maxValue={maxValue}
          maxLimit={maxLimit}
          step={step}
          displayStepNumber={displayStepNumber}
          defaultValue={defaultValue}
          displaySliderValue={displaySliderValue}
          disabled={readonly}
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      width: '90%',
      minHeight: 62,
      alignSelf: 'center',
    },
    title: {
      marginLeft: 10,
    },
    content: {
      justifyContent: 'space-around',
      width: '100%',
      marginHorizontal: 0,
      paddingHorizontal: 4,
      borderWidth: 1,
      borderColor: color,
    },
  });

export default FormSlider;
