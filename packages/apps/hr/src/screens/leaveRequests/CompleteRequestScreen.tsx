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
import {
  PeriodInput,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  KeyboardAvoidingScrollView,
  Label,
  Screen,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {
  CompleteRequestButtons,
  CompleteRequestQuantityCard,
  LeaveReasonSearchBar,
  LeaveStartEndOn,
} from '../../components';

const CompleteRequestScreen = ({}) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [startOn, setStartOn] = useState(null);
  const [endOn, setEndOn] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);
  const [leaveQty, setLeaveQty] = useState(0);

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const indexLine = newLines.findIndex(line => line.id === newLine?.id);

      if (indexLine >= 0) {
        if (isEditionMode) {
          newLines[indexLine].qty = leaveQty;
        } else {
          newLines[indexLine].qty += leaveQty;
        }
      } else {
        newLines.push({
          ...newLine,
          qty: leaveQty,
        });
      }

      return newLines;
    });
    setLeaveQty(0);
    setNewLine(null);
  };

  const handleEditLine = line => {
    setNewLine(line);
    setLeaveQty(line.qty);
  };

  const isEditionMode = useMemo(
    () => newLine?.qty > 0 && lines.find(({id}) => id === newLine.id) != null,
    [lines, newLine],
  );

  return (
    <Screen
      fixedItems={
        <CompleteRequestButtons
          leaveQty={leaveQty}
          hasNewLine={!!newLine}
          hasPeriod={!!fromDate && !!toDate && !!startOn && !!endOn}
          hasLines={Array.isArray(lines) && lines.length > 0}
          onAddPress={handleAddLine}
          onFinishPress={() => console.log('Finish button pressed.')}
        />
      }>
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
          setLines={setLines}
          handleEditLine={handleEditLine}
          translator={I18n.t}
        />
        {false && (
          <Label
            style={styles.label}
            message={`${I18n.t('Hr_MissingQuantity')} : 0 ${I18n.t('Hr_TimeUnit_Days')}`}
            type="error"
          />
        )}
        {!newLine && (
          <LeaveReasonSearchBar
            defaultValue={newLine}
            onChange={leaveReason =>
              setNewLine({
                id: leaveReason.id,
                name: leaveReason.name,
                unitName: getItemTitle(
                  LeaveReason?.unitSelect,
                  leaveReason.unitSelect,
                ),
              })
            }
          />
        )}
        {newLine && (
          <CompleteRequestQuantityCard
            leaveQty={leaveQty}
            setLeaveQty={setLeaveQty}
            cancelLeave={() => setNewLine(null)}
            newLine={newLine}
          />
        )}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    width: '90%',
  },
});

export default CompleteRequestScreen;
