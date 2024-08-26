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

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {PeriodInput} from '@axelor/aos-mobile-core';
import {KeyboardAvoidingScrollView, Screen} from '@axelor/aos-mobile-ui';
import {LeaveStartEndOn} from '../../components';

const CompleteRequestScreen = ({}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [startOn, setStartOn] = useState(null);
  const [endOn, setEndOn] = useState(null);

  return (
    <Screen>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        style={styles.scroll}>
        <PeriodInput
          startDateConfig={{
            date: fromDate,
            onDateChange: date => setFromDate(date),
          }}
          endDateConfig={{
            date: toDate,
            onDateChange: date => setToDate(date),
          }}
        />
        <LeaveStartEndOn
          onStartOnChange={setStartOn}
          onEndOnChange={setEndOn}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    height: null,
  },
});

export default CompleteRequestScreen;
