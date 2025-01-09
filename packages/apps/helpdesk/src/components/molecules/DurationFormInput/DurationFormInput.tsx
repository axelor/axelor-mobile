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

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FormInput, checkNullString} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  MAX_HOUR_REGEX,
  NEED_SPACER_REGEX,
  PERFECT_REGEX,
  SPACER,
  formatDuration,
  formatDurationFromSeconds,
  parseDuration,
} from './duration.helpers';

interface DurationFormInputProps {
  style?: any;
  titleKey?: string;
  duration: number;
  onChange: (value: number) => void;
}

const DurationFormInput = ({
  style,
  titleKey = 'Helpdesk_Duration',
  duration,
  onChange,
}: DurationFormInputProps) => {
  const I18n = useTranslator();

  const [formattedDuration, setFormattedDuration] = useState(
    formatDurationFromSeconds(duration),
  );

  const handleDurationChange = (value: string) => {
    if (NEED_SPACER_REGEX.test(value)) {
      handleResult(`${value.slice(0, 3)}${SPACER}${value.slice(3)}`);
    } else if (MAX_HOUR_REGEX.test(value)) {
      handleResult(`${value}${SPACER}`);
    } else if (PERFECT_REGEX.test(value)) {
      handleResult(value);
    } else {
      handleResult(value);
    }
  };

  const handleEndFocus = () => {
    let hours, minutes;

    if (checkNullString(formattedDuration)) {
      hours = 0;
      minutes = 0;
    } else if (formattedDuration.includes(SPACER)) {
      const splitDuraction = formattedDuration.split(SPACER);
      hours = parseInt(splitDuraction[0], 10);
      minutes = splitDuraction[1] ? parseInt(splitDuraction[1], 10) : 0;
    } else {
      hours = parseInt(formattedDuration, 10);
      minutes = 0;
    }

    const result = formatDuration(hours, minutes);
    handleResult(result);
  };

  const handleResult = (value: string) => {
    setFormattedDuration(value);
    onChange(parseDuration(value));
  };

  useEffect(() => {
    setFormattedDuration(formatDurationFromSeconds(duration ?? 0));
  }, [duration]);

  return (
    <FormInput
      style={[styles.input, style]}
      title={I18n.t(titleKey)}
      onChange={handleDurationChange}
      onEndFocus={handleEndFocus}
      defaultValue={formattedDuration}
      multiline={false}
      keyboardType="numeric"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
});
export default DurationFormInput;
