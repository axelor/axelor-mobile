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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateInput, useTranslator} from '@axelor/aos-mobile-core';
import {Alert, Label, useThemeColor} from '@axelor/aos-mobile-ui';
import DraftTimesheetPicker from '../DraftTimesheetPicker/DraftTimesheetPicker';

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

  return (
    <Alert
      visible={isAlertVisible}
      title={I18n.t('Hr_SelectTimers')}
      cancelButtonConfig={{onPress: () => setIsAlertVisible(false)}}
      confirmButtonConfig={{
        width: 50,
        title: null,
        onPress: () => console.log('Confirm button pressed.'),
      }}
      translator={I18n.t}>
      <DraftTimesheetPicker
        style={styles.picker}
        onChange={timesheet => console.log(timesheet)}
      />
      <Label
        message={I18n.t('Hr_TimesheetAlreadyExists')}
        iconName="exclamation-triangle-fill"
        color={Colors.errorColor}
      />
      <View style={styles.dateIntervalContainer}>
        <DateInput
          style={styles.dateInput}
          title={'Hr_StartDate'}
          mode="date"
          onDateChange={date => console.log(date)}
        />
        <DateInput
          style={styles.dateInput}
          title={'Hr_EndDate'}
          mode="date"
          onDateChange={date => console.log(date)}
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
