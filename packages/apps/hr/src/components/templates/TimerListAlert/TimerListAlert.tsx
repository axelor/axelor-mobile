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
  useNavigation,
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
import {
  addTimerTimesheet,
  createTimesheet,
} from '../../../features/timesheetSlice';
import {fetchDraftTimesheet} from '../../../api/timesheet-api';
import {formatSecondsToHours} from '../../../utils';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    timerDateIntervalList,
    loadingTimerDateInterval,
    moreLoadingTimerDateInterval,
    isListEndTimerDateInterval,
  } = useSelector((state: any) => state.hr_timer);
  const {userId} = useSelector((state: any) => state.auth);

  const [timesheet, setTimesheet] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [errorKey, setErrorKey] = useState(null);
  const [selectedTimers, setSelectedTimers] = useState([]);

  const isConfirmButtonDisabled = useMemo(
    () => errorKey || selectedTimers.length === 0,
    [errorKey, selectedTimers],
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
    if (timesheet == null && fromDate && toDate) {
      if (getStartOfDay(fromDate) <= getEndOfDay(toDate)) {
        fetchDraftTimesheet({
          userId: userId,
          fromDate: fromDate,
          toDate: toDate,
          isOverlapAllowed: false,
        }).then(res => {
          setErrorKey(null);
          res.data?.data?.length > 0 &&
            setErrorKey('Hr_TimesheetAlreadyExists');
        });
      } else {
        setErrorKey('Hr_DateIntervalError');
      }
    }
  }, [fromDate, timesheet, toDate, userId]);

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
    setTimesheet(null);
    setFromDate(null);
    setToDate(new Date());
    setErrorKey(null);
    setSelectedTimers([]);
  };

  const handleConfirm = () => {
    const timerIdList = selectedTimers.map(timer => timer.id);
    if (timesheet) {
      dispatch(
        (addTimerTimesheet as any)({
          timesheetId: timesheet?.id,
          version: timesheet?.version,
          timerIdList,
        }),
      );
    } else {
      dispatch(
        (createTimesheet as any)({
          fromDate,
          toDate,
          timerIdList,
          userId,
        }),
      );
    }
    navigation.navigate('TimesheetListScreen');
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
        onPress: handleConfirm,
      }}
      translator={I18n.t}>
      {(timesheet || !(fromDate && toDate)) && (
        <DraftTimesheetPicker
          style={styles.picker}
          onChange={_timesheet => {
            setSelectedTimers([]);
            setTimesheet(_timesheet);
            setFromDate(new Date(_timesheet.fromDate));
            setToDate(new Date(_timesheet.toDate));
          }}
        />
      )}
      {errorKey && (
        <Label
          message={I18n.t(errorKey)}
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
          }}
          readonly={timesheet}
          required={timesheet == null}
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
          }}
          readonly={timesheet}
          required={timesheet == null}
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
