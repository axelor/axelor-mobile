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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DateInput,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Alert} from '@axelor/aos-mobile-ui';
import {createTimesheet} from '../../../features/timesheetSlice';

interface TimesheetCreationAlertProps {
  isOpen: boolean;
  onCancel: () => void;
}

const TimesheetCreationAlert = ({
  isOpen,
  onCancel,
}: TimesheetCreationAlertProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {userId} = useSelector((state: any) => state.auth);
  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  const handleCancel = useCallback(() => {
    setFromDate(null);
    setToDate(null);
    onCancel();
  }, [onCancel]);

  const createTimesheetAPI = useCallback(() => {
    (dispatch as any)(
      (createTimesheet as any)({
        fromDate,
        toDate,
        userId,
      }),
    ).then(res => {
      mobileSettings?.isLineCreationOfTimesheetDetailsAllowed &&
        navigation.navigate('TimesheetDetailsScreen', {
          timesheetId: res.payload.timesheetId,
          isManualCreation: true,
        });
      handleCancel();
    });
  }, [
    dispatch,
    fromDate,
    handleCancel,
    mobileSettings,
    navigation,
    toDate,
    userId,
  ]);

  return (
    <Alert
      visible={isOpen}
      title={I18n.t('Hr_CreateTimesheet')}
      cancelButtonConfig={{onPress: handleCancel}}
      confirmButtonConfig={{
        width: 50,
        title: null,
        disabled: !fromDate,
        onPress: createTimesheetAPI,
      }}
      translator={I18n.t}>
      <View style={styles.dateIntervalContainer}>
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_StartDate')}
          mode="date"
          nullable
          popup
          defaultDate={fromDate}
          onDateChange={date => setFromDate(date)}
          required={true}
        />
        <DateInput
          style={styles.dateInput}
          title={I18n.t('Hr_EndDate')}
          mode="date"
          nullable
          popup
          defaultDate={toDate}
          onDateChange={date => setToDate(date)}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  dateIntervalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '48%',
  },
});

export default TimesheetCreationAlert;
