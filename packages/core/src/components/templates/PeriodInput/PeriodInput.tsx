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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Label} from '@axelor/aos-mobile-ui';
import {DateInput} from '../../organisms';
import {getEndOfDay, getStartOfDay, hoursToMilliseconds} from '../../../utils';
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
  usePopup?: boolean;
  startDateConfig: dateInputConfig;
  endDateConfig: dateInputConfig;
  defaultIntervalHours?: number;
  onPeriodErrorChange?: (isPeriodError: boolean) => void;
}

const PeriodInput = ({
  style,
  horizontal = true,
  showTitle = true,
  usePopup = false,
  startDateConfig,
  endDateConfig,
  defaultIntervalHours = null,
  onPeriodErrorChange,
}: PeriodInputProps) => {
  const I18n = useTranslator();

  const [startDate, setStartDate] = useState(startDateConfig.date);
  const [endDate, setEndDate] = useState(endDateConfig.date);
  const [isPeriodError, setIsPeriodError] = useState(false);
  const [interval, setInterval] = useState(
    defaultIntervalHours !== null
      ? hoursToMilliseconds(defaultIntervalHours)
      : null,
  );

  useEffect(() => {
    setStartDate(startDateConfig.date);
  }, [startDateConfig.date]);

  useEffect(() => {
    setEndDate(endDateConfig.date);
  }, [endDateConfig.date]);

  useEffect(() => {
    if (interval) {
      if (startDate && !endDate) {
        const newEndDate = new Date(startDate.getTime() + interval);
        setEndDate(newEndDate);
        endDateConfig.onDateChange(newEndDate);
      } else if (endDate && !startDate) {
        const newStartDate = new Date(endDate.getTime() - interval);
        setStartDate(newStartDate);
        startDateConfig.onDateChange(newStartDate);
      }
    }
  }, [startDate, endDate, interval, startDateConfig, endDateConfig]);

  useEffect(() => {
    const _startDate =
      startDateConfig.dateInputMode === 'date'
        ? getStartOfDay(startDate)
        : startDate;
    const _endDate =
      endDateConfig.dateInputMode === 'date' ? getEndOfDay(endDate) : endDate;

    const isError = startDate && endDate && _startDate > _endDate;
    setIsPeriodError(!!isError);
    onPeriodErrorChange?.(!!isError);
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

  const updateDates = useCallback(
    (newStartDate: Date, newEndDate: Date) => {
      if (newStartDate && newEndDate) {
        const newInterval = newEndDate.getTime() - newStartDate.getTime();
        setInterval(newInterval);
      }
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      startDateConfig.onDateChange(newStartDate);
      endDateConfig.onDateChange(newEndDate);
    },
    [startDateConfig, endDateConfig],
  );

  const handleDateChange = useCallback(
    (isStartDate: boolean, date: Date) => {
      if (interval != null) {
        if (isStartDate) {
          const newEndDate = date ? new Date(date.getTime() + interval) : null;
          updateDates(date, newEndDate);
        } else {
          const newInterval =
            date && startDate instanceof Date
              ? date.getTime() - startDate.getTime()
              : null;
          setEndDate(date);
          newInterval && setInterval(newInterval);
          endDateConfig.onDateChange(date);
        }
      } else {
        if (isStartDate) {
          setStartDate(date);
          startDateConfig.onDateChange(date);
        } else {
          setEndDate(date);
          endDateConfig.onDateChange(date);
        }
      }
    },
    [interval, updateDates, startDate, startDateConfig, endDateConfig],
  );

  const renderDateInput = useCallback(
    (mode: number) => {
      const isStartDate = mode === DATE_INPUT_MODE.startDate;
      const translationKey = isStartDate ? 'Base_StartDate' : 'Base_EndDate';
      const date = isStartDate ? startDate : endDate;
      const dateConfig = isStartDate ? startDateConfig : endDateConfig;
      const nullable =
        dateConfig.nullable || dateConfig.nullable == null ? true : false;

      return (
        <DateInput
          style={styles.dateInput}
          title={showTitle && I18n.t(translationKey)}
          mode={dateConfig.dateInputMode ?? 'date'}
          nullable={nullable}
          popup={usePopup || horizontal}
          defaultDate={date}
          onDateChange={_date => handleDateChange(isStartDate, _date)}
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
      usePopup,
      horizontal,
      handleDateChange,
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
