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
import {
  DateInput,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Alert, Label, useThemeColor} from '@axelor/aos-mobile-ui';
import DraftTimesheetPicker from '../DraftTimesheetPicker/DraftTimesheetPicker';
import {fetchDraftTimesheet} from '../../../features/timesheetSlice';

const INPUT_MODE = {
  Timesheet: 0,
  DateIntervale: 1,
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

  const [timesheet, setTimesheet] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [inputMode, setInputMode] = useState(null);
  const [isAlreadyExistsError, setIsAlreadyExistsError] = useState(false);

  const {user} = useSelector((state: any) => state.user);
  const {draftTimesheetList} = useSelector((state: any) => state.timesheet);

  useEffect(() => {
    if (inputMode === INPUT_MODE.DateIntervale && fromDate && toDate) {
      dispatch(
        (fetchDraftTimesheet as any)({
          userId: user?.id,
          fromDate: fromDate,
          toDate: toDate,
        }),
      );
    }
  }, [dispatch, fromDate, inputMode, toDate, user?.id]);

  useEffect(() => console.log(draftTimesheetList), [draftTimesheetList]);

  const handleCancel = () => {
    setIsAlertVisible(false);
    setTimesheet(null);
    setFromDate(null);
    setToDate(null);
    setInputMode(null);
  };

  return (
    <Alert
      visible={isAlertVisible}
      title={I18n.t('Hr_SelectTimers')}
      cancelButtonConfig={{
        onPress: handleCancel,
      }}
      confirmButtonConfig={{
        width: 50,
        title: null,
        onPress: () => console.log('Confirm button pressed.'),
      }}
      translator={I18n.t}>
      <DraftTimesheetPicker
        style={styles.picker}
        onChange={_timesheet => {
          setTimesheet(_timesheet);
          setInputMode(INPUT_MODE.Timesheet);
        }}
        readonly={inputMode === INPUT_MODE.DateIntervale}
      />
      {isAlreadyExistsError && (
        <Label
          message={I18n.t('Hr_TimesheetAlreadyExists')}
          iconName="exclamation-triangle-fill"
          color={Colors.errorColor}
        />
      )}
      <View style={styles.dateIntervalContainer}>
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_StartDate')}
          mode="date"
          popup
          defaultDate={
            inputMode === INPUT_MODE.Timesheet && new Date(timesheet.fromDate)
          }
          onDateChange={date => {
            setFromDate(date);
            setInputMode(INPUT_MODE.DateIntervale);
          }}
          readonly={inputMode === INPUT_MODE.Timesheet}
        />
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_EndDate')}
          mode="date"
          defaultDate={
            inputMode === INPUT_MODE.Timesheet && new Date(timesheet.toDate)
          }
          onDateChange={date => {
            setToDate(date);
            setInputMode(INPUT_MODE.DateIntervale);
          }}
          readonly={inputMode === INPUT_MODE.Timesheet}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
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
});

export default TimerListAlert;
