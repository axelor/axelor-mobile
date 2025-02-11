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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Label} from '@axelor/aos-mobile-ui';
import {DateInput} from '../../organisms';
import {getEndOfDay, getStartOfDay} from '../../../utils';
import {useTranslator} from '../../../i18n';

const DATE_INPUT_MODE = {
  startDate: 0,
  endDate: 1,
};

interface dateInputConfig {
  dateInputMode?: 'date' | 'datetime' | 'time';
  nullable?: boolean;
  date?: Date;
  onDateChange: (date: Date) => void;
  readonly?: boolean;
  required?: boolean;
}

interface PeriodInputProps {
  style?: any;
  horizontal?: boolean;
  showTitle?: boolean;
  startDateConfig: dateInputConfig;
  endDateConfig: dateInputConfig;
  onPeriodErrorChange?: (isPeriodError: boolean) => void;
}

const PeriodInput = ({
  style,
  horizontal = true,
  showTitle = true,
  startDateConfig,
  endDateConfig,
  onPeriodErrorChange,
}: PeriodInputProps) => {
  const I18n = useTranslator();

  const [startDate, setStartDate] = useState(startDateConfig.date);
  const [endDate, setEndDate] = useState(endDateConfig.date);
  const [isPeriodError, setIsPeriodError] = useState(false);

  useEffect(() => {
    setStartDate(startDateConfig.date);
  }, [startDateConfig.date]);

  useEffect(() => {
    setEndDate(endDateConfig.date);
  }, [endDateConfig.date]);

  useEffect(() => {
    const _startDate =
      startDateConfig.dateInputMode === 'date'
        ? getStartOfDay(startDate)
        : startDate;
    const _endDate =
      endDateConfig.dateInputMode === 'date' ? getEndOfDay(endDate) : endDate;

    const isError = startDate && endDate && _startDate > _endDate;
    setIsPeriodError(isError);
    onPeriodErrorChange(isError);
  }, [
    startDate,
    endDate,
    startDateConfig.dateInputMode,
    endDateConfig.dateInputMode,
    onPeriodErrorChange,
  ]);

  const styles = useMemo(() => {
    return getStyles(horizontal);
  }, [horizontal]);

  const renderDateInput = useCallback(
    (mode: number) => {
      const isStartDate = mode === DATE_INPUT_MODE.startDate;
      const translationKey = isStartDate ? 'Base_StartDate' : 'Base_EndDate';
      const date = isStartDate ? startDate : endDate;
      const setDate = isStartDate ? setStartDate : setEndDate;
      const dateConfig = isStartDate ? startDateConfig : endDateConfig;
      const nullable =
        dateConfig.nullable || dateConfig.nullable == null ? true : false;

      return (
        <DateInput
          style={styles.dateInput}
          title={showTitle && I18n.t(translationKey)}
          mode={dateConfig.dateInputMode ?? 'date'}
          nullable={nullable}
          popup={horizontal}
          defaultDate={date}
          onDateChange={_date => {
            setDate(_date);
            dateConfig.onDateChange(_date);
          }}
          readonly={dateConfig.readonly}
          required={dateConfig.required}
        />
      );
    },
    [
      startDate,
      endDate,
      startDateConfig,
      endDateConfig,
      styles.dateInput,
      showTitle,
      I18n,
      horizontal,
    ],
  );

  return (
    <View style={[styles.container, style]}>
      <Label
        type="error"
        message={I18n.t('Base_PeriodError')}
        visible={isPeriodError}
      />
      <View style={styles.datesContainer}>
        {renderDateInput(DATE_INPUT_MODE.startDate)}
        {renderDateInput(DATE_INPUT_MODE.endDate)}
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
