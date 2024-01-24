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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DateInput,
  getEndOfDay,
  getStartOfDay,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Alert,
  CheckboxScrollList,
  Label,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import DraftTimesheetPicker from '../DraftTimesheetPicker/DraftTimesheetPicker';
import {TimeDetailCard} from '../../molecules';
import {fetchTimerDateInterval} from '../../../features/timerSlice';
import {fetchDraftTimesheet} from '../../../api/timesheet-api';
import {formatSecondsToHours} from '../../../utils';

const INPUT_MODE = {
  Timesheet: 0,
  DateInterval: 1,
};

interface TimerListAlertProps {
  isAlertVisible: boolean;
  setIsAlertVisible: (visible: boolean) => void;
}

const TimerListAlert = ({
  isAlertVisible,
  setIsAlertVisible,
}: TimerListAlertProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {
    timerDateIntervalList,
    loadingTimerDateInterval,
    moreLoadingTimerDateInterval,
    isListEndTimerDateInterval,
  } = useSelector((state: any) => state.hr_timer);
  const {userId} = useSelector((state: any) => state.auth);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [inputMode, setInputMode] = useState(null);
  const [isTimesheetError, setIsTimesheetError] = useState(false);
  const [isDateIntervalError, setIsDateIntervalError] = useState(false);
  const [selectedTimers, setSelectedTimers] = useState([]);

  const isTimesheetMode = useMemo(
    () => inputMode === INPUT_MODE.Timesheet,
    [inputMode],
  );

  const isDateIntervalMode = useMemo(
    () => inputMode === INPUT_MODE.DateInterval,
    [inputMode],
  );

  const isConfirmButtonDisabled = useMemo(
    () =>
      isTimesheetError || isDateIntervalError || selectedTimers.length === 0,
    [isDateIntervalError, isTimesheetError, selectedTimers],
  );

  const fetchTimerDateIntervalAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchTimerDateInterval as any)({
          userId: userId,
          fromDate: fromDate,
          toDate: toDate,
          page: page,
        }),
      );
    },
    [dispatch, fromDate, toDate, userId],
  );

  useEffect(() => {
    if (isDateIntervalMode && fromDate && toDate) {
      if (getStartOfDay(fromDate) <= getEndOfDay(toDate)) {
        fetchDraftTimesheet({
          userId: userId,
          fromDate: fromDate,
          toDate: toDate,
          isOverlapAllowed: false,
        }).then(res => {
          setIsDateIntervalError(false);
          setIsTimesheetError(res.data?.data?.length > 0);
        });
      } else {
        setIsTimesheetError(false);
        setIsDateIntervalError(true);
      }
    }
  }, [dispatch, fromDate, isDateIntervalMode, toDate, userId]);

  const renderChexboxItem = ({item}) => {
    return (
      <TimeDetailCard
        statusSelect={item.statusSelect}
        project={item.project?.name}
        date={item.startDateTime}
        duration={formatSecondsToHours(item.duration)}
        durationUnit="hours"
        isSmallCard
        isActions={false}
      />
    );
  };

  const handleCancel = () => {
    setIsAlertVisible(false);
    setFromDate(null);
    setToDate(new Date());
    setInputMode(null);
    setIsTimesheetError(false);
    setIsDateIntervalError(false);
    setSelectedTimers([]);
  };

  return (
    <Alert
      style={styles.alert}
      visible={isAlertVisible}
      title={I18n.t('Hr_SelectTimers')}
      cancelButtonConfig={{
        onPress: handleCancel,
      }}
      confirmButtonConfig={{
        width: 50,
        title: null,
        disabled: isConfirmButtonDisabled,
        onPress: () => console.log(selectedTimers),
      }}
      translator={I18n.t}>
      {!isDateIntervalMode && (
        <DraftTimesheetPicker
          style={styles.picker}
          onChange={timesheet => {
            setSelectedTimers([]);
            setFromDate(new Date(timesheet.fromDate));
            setToDate(new Date(timesheet.toDate));
            setInputMode(INPUT_MODE.Timesheet);
          }}
        />
      )}
      {isTimesheetError && (
        <Label
          message={I18n.t('Hr_TimesheetAlreadyExists')}
          iconName="exclamation-triangle-fill"
          color={Colors.errorColor}
        />
      )}
      {isDateIntervalError && (
        <Label
          message={I18n.t('Hr_DateIntervalError')}
          iconName="exclamation-triangle-fill"
          color={Colors.errorColor}
        />
      )}
      <View style={styles.dateIntervalContainer}>
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_StartDate')}
          mode="date"
          nullable
          popup
          defaultDate={fromDate}
          onDateChange={date => {
            setSelectedTimers([]);
            setFromDate(date);
            setInputMode(INPUT_MODE.DateInterval);
          }}
          readonly={isTimesheetMode}
          required={isDateIntervalMode}
        />
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_EndDate')}
          mode="date"
          nullable
          popup
          defaultDate={toDate}
          onDateChange={date => {
            setSelectedTimers([]);
            setToDate(date);
            setInputMode(INPUT_MODE.DateInterval);
          }}
          readonly={isTimesheetMode}
          required={isDateIntervalMode}
        />
      </View>
      <CheckboxScrollList
        styleTopCheckbox={styles.topCheckbox}
        loadingList={loadingTimerDateInterval}
        data={timerDateIntervalList}
        onCheckedChange={setSelectedTimers}
        renderItem={renderChexboxItem}
        fetchData={fetchTimerDateIntervalAPI}
        moreLoading={moreLoadingTimerDateInterval}
        isListEnd={isListEndTimerDateInterval}
        translator={I18n.t}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  alert: {
    height: '80%',
  },
  picker: {
    width: '100%',
  },
  dateIntervalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '48%',
  },
  topCheckbox: {
    marginTop: 5,
  },
});

export default TimerListAlert;
