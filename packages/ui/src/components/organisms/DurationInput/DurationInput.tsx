/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NumberChevronInput} from '../../molecules';
import {Text} from '../../atoms';
import {
  formatDurationArrayToSeconds,
  formatDurationSecondsToArray,
} from './duration.helpers';

interface DurationInputProps {
  style?: any;
  inputStyle?: any;
  title?: string;
  defaultValue: number;
  onChange: (value: number) => void;
  required?: boolean;
}

const DurationInput = ({
  style,
  inputStyle,
  title,
  defaultValue,
  onChange,
  required = false,
}: DurationInputProps) => {
  const [formattedDuration, setFormattedDuration] = useState(
    formatDurationSecondsToArray(defaultValue),
  );

  useEffect(() => {
    setFormattedDuration(formatDurationSecondsToArray(defaultValue ?? 0));
  }, [defaultValue]);

  useEffect(() => {
    onChange(formatDurationArrayToSeconds(formattedDuration));
  }, [formattedDuration, onChange]);

  const changeFormattedDuration = (index: number, value: number) => {
    setFormattedDuration(duration => {
      const durationCopy = duration.slice();
      durationCopy[index] = value;
      return durationCopy;
    });
  };

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.inputContainer}>
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[0]}
          onValueChange={value => changeFormattedDuration(0, value)}
          required={required}
        />
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[1]}
          onValueChange={value => changeFormattedDuration(1, value)}
          required={required}
        />
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[2]}
          onValueChange={value => changeFormattedDuration(2, value)}
          required={required}
        />
        <Text writingType="important" fontSize={20}>
          :
        </Text>
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[3]}
          maxValue={5}
          onValueChange={value => changeFormattedDuration(3, value)}
          required={required}
        />
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[4]}
          onValueChange={value => changeFormattedDuration(4, value)}
          required={required}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  title: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DurationInput;
