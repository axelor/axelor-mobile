/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Label, useThemeColor} from '@axelor/aos-mobile-ui';
import {DateInput} from '../../organisms';
import {getEndOfDay, getStartOfDay} from '../../../utils';
import {useTranslator} from '../../../i18n';

interface dateInputConfig {
  date?: Date;
  onDateChange: (date: Date) => void;
  readonly?: boolean;
  required?: boolean;
}

interface PeriodInputProps {
  startDateConfig: dateInputConfig;
  endDateConfig: dateInputConfig;
  horizontal?: boolean;
  style?: any;
}

const PeriodInput = ({
  startDateConfig,
  endDateConfig,
  horizontal = true,
  style,
}: PeriodInputProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [fromDate, setFromDate] = useState(startDateConfig.date);
  const [toDate, setToDate] = useState(endDateConfig.date);
  const [isPeriodError, setIsPeriodError] = useState(false);

  useEffect(() => {
    setFromDate(startDateConfig.date);
  }, [startDateConfig.date]);

  useEffect(() => {
    setToDate(endDateConfig.date);
  }, [endDateConfig.date]);

  useEffect(() => {
    setIsPeriodError(
      fromDate && toDate && getStartOfDay(fromDate) > getEndOfDay(toDate),
    );
  }, [fromDate, toDate]);

  const styles = useMemo(() => {
    return getStyles(horizontal);
  }, [horizontal]);

  return (
    <View style={[styles.container, style]}>
      {isPeriodError && (
        <Label
          message={I18n.t('Base_PeriodError')}
          iconName="exclamation-triangle-fill"
          color={Colors.errorColor}
        />
      )}
      <View style={styles.datesContainer}>
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Base_StartDate')}
          mode="date"
          nullable
          popup={horizontal}
          defaultDate={fromDate}
          onDateChange={date => {
            setFromDate(date);
            startDateConfig.onDateChange(date);
          }}
          readonly={startDateConfig.readonly}
          required={startDateConfig.required}
        />
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Base_EndDate')}
          mode="date"
          nullable
          popup={horizontal}
          defaultDate={toDate}
          onDateChange={date => {
            setToDate(date);
            endDateConfig.onDateChange(date);
          }}
          readonly={endDateConfig.readonly}
          required={endDateConfig.required}
        />
      </View>
    </View>
  );
};

const getStyles = (horizontal: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
    },
    datesContainer: {
      flexDirection: horizontal ? 'row' : 'column',
      justifyContent: 'space-between',
    },
    dateInput: {
      width: horizontal ? '48%' : '100%',
    },
  });

export default PeriodInput;
