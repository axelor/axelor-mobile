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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import NumberChevronInput, {
  INPUT_CHANGE_TYPE,
} from '../../molecules/NumberChevronInput/NumberChevronInput';
import {Text} from '../../atoms';
import {
  formatDurationArrayToSeconds,
  formatDurationSecondsToArray,
} from './duration.helpers';
import {checkNullString} from '../../../utils';

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
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [formattedDuration, setFormattedDuration] = useState(
    formatDurationSecondsToArray(defaultValue ?? 0),
  );

  useEffect(() => {
    setFormattedDuration(formatDurationSecondsToArray(defaultValue ?? 0));
  }, [defaultValue]);

  const _required = useMemo(
    () => required && formatDurationArrayToSeconds(formattedDuration) === 0,
    [formattedDuration, required],
  );

  const changeFormattedDuration = useCallback(
    (index: number, value: number) => {
      setFormattedDuration(duration => {
        const durationCopy = duration.slice();
        durationCopy[index] = value;
        onChange(formatDurationArrayToSeconds(durationCopy));
        return durationCopy;
      });
    },
    [onChange],
  );

  const changeFocusedInput = (
    inputIndex: number,
    value: number,
    inputChangeType: number,
  ) => {
    if (value && inputChangeType === INPUT_CHANGE_TYPE.keyboard) {
      inputRefs[inputIndex].current.focus();
    }
  };

  return (
    <View style={[styles.container, style]} testID="durationInputContainer">
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <View style={styles.inputContainer}>
        <NumberChevronInput
          style={inputStyle}
          defaultValue={formattedDuration[0]}
          onValueChange={(value, inputChangeType) => {
            changeFormattedDuration(0, value);
            changeFocusedInput(0, value, inputChangeType);
          }}
          onEndFocus={() =>
            !formattedDuration[0] && changeFormattedDuration(0, 0)
          }
          required={_required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs[0]}
          defaultValue={formattedDuration[1]}
          onValueChange={(value, inputChangeType) => {
            changeFormattedDuration(1, value);
            changeFocusedInput(1, value, inputChangeType);
          }}
          onEndFocus={() =>
            !formattedDuration[1] && changeFormattedDuration(1, 0)
          }
          required={_required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs[1]}
          defaultValue={formattedDuration[2]}
          onValueChange={(value, inputChangeType) => {
            changeFormattedDuration(2, value);
            changeFocusedInput(2, value, inputChangeType);
          }}
          onEndFocus={() =>
            !formattedDuration[2] && changeFormattedDuration(2, 0)
          }
          required={_required}
          readonly={readonly}
        />
        <Text writingType="important" fontSize={20}>
          :
        </Text>
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs[2]}
          defaultValue={formattedDuration[3]}
          maxValue={5}
          onValueChange={(value, inputChangeType) => {
            changeFormattedDuration(3, value);
            changeFocusedInput(3, value, inputChangeType);
          }}
          onEndFocus={() =>
            !formattedDuration[3] && changeFormattedDuration(3, 0)
          }
          required={_required}
          readonly={readonly}
        />
        <NumberChevronInput
          style={inputStyle}
          inputRef={inputRefs[3]}
          defaultValue={formattedDuration[4]}
          onValueChange={value => {
            changeFormattedDuration(4, value);
          }}
          onEndFocus={() =>
            !formattedDuration[4] && changeFormattedDuration(4, 0)
          }
          required={_required}
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
