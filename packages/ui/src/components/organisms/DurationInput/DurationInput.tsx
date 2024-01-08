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

import React, {useEffect, useRef, useState} from 'react';
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
  readonly?: boolean;
}

const DurationInput = ({
  style,
  inputStyle,
  title,
  defaultValue,
  onChange,
  required = false,
  readonly = false,
}: DurationInputProps) => {
  const inputRefs = {
    input1: useRef(null),
    input2: useRef(null),
    input3: useRef(null),
    input4: useRef(null),
  };

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
          onValueChange={value => {
            changeFormattedDuration(0, value);
            if (value) {
              inputRefs.input1.current.focus();
            }
          }}
          onEndFocus={() =>
            !formattedDuration[0] && changeFormattedDuration(0, 0)
          }
          required={required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs.input1}
          defaultValue={formattedDuration[1]}
          onValueChange={value => {
            changeFormattedDuration(1, value);
            if (value) {
              inputRefs.input2.current.focus();
            }
          }}
          onEndFocus={() =>
            !formattedDuration[1] && changeFormattedDuration(1, 0)
          }
          required={required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs.input2}
          defaultValue={formattedDuration[2]}
          onValueChange={value => {
            changeFormattedDuration(2, value);
            if (value) {
              inputRefs.input3.current.focus();
            }
          }}
          onEndFocus={() =>
            !formattedDuration[2] && changeFormattedDuration(2, 0)
          }
          required={required}
          readonly={readonly}
        />
        <Text writingType="important" fontSize={20}>
          :
        </Text>
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs.input3}
          defaultValue={formattedDuration[3]}
          maxValue={5}
          onValueChange={value => {
            changeFormattedDuration(3, value);
            if (value) {
              inputRefs.input4.current.focus();
            }
          }}
          onEndFocus={() =>
            !formattedDuration[3] && changeFormattedDuration(3, 0)
          }
          required={required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs.input4}
          defaultValue={formattedDuration[4]}
          onValueChange={value => {
            changeFormattedDuration(4, value);
          }}
          onEndFocus={() =>
            !formattedDuration[4] && changeFormattedDuration(4, 0)
          }
          required={required}
          readonly={readonly}
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
