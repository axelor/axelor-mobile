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

import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {PeriodInput, useTranslator} from '@axelor/aos-mobile-core';
import {
  KeyboardAvoidingScrollView,
  Screen,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {LeaveReasonSearchBar, LeaveStartEndOn} from '../../components';

const CompleteRequestScreen = ({}) => {
  const I18n = useTranslator();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [startOn, setStartOn] = useState(null);
  const [endOn, setEndOn] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);

  const isEditionMode = useMemo(
    () => newLine?.qty > 0 && lines.find(({id}) => id === newLine.id) != null,
    [lines, newLine],
  );

  return (
    <Screen>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        style={styles.container}>
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
        <ViewAllEditList
          title={I18n.t('Hr_Distribution')}
          lines={lines}
          currentLineId={isEditionMode ? newLine.id : null}
          setLines={_lines =>
            setLines(_lines.map(line => ({...line, realQty: line.qty})))
          }
          handleEditLine={line => setNewLine(line)}
          translator={I18n.t}
        />
        <LeaveReasonSearchBar defaultValue={newLine} onChange={setNewLine} />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default CompleteRequestScreen;
