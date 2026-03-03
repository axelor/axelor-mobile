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
import {StyleSheet} from 'react-native';
import {
  PeriodInput,
  useDispatch,
  usePermitted,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  FormInput,
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
import {createLeaveRequest} from '../../features/leaveSlice';
import {fetchMissingDuration} from '../../api/leave-api';

const CompleteRequestScreen = ({}) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const dispatch = useDispatch();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [startOn, setStartOn] = useState(null);
  const [endOn, setEndOn] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);
  const [leaveQty, setLeaveQty] = useState(0);
  const [comment, setComment] = useState(null);
  const [missingQty, setMissingQty] = useState(0);

  const resetDefaultStates = () => {
    setFromDate(new Date());
    setToDate(null);
    setStartOn(null);
    setEndOn(null);
    setLines([]);
    setNewLine(null);
    setLeaveQty(0);
    setComment(null);
    setMissingQty(0);
  };

  const handleReset = useCallback(() => {
    setNewLine(null);
    setComment(null);
    setLeaveQty(0);
  }, []);

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

        newLines[indexLine].comment = comment;
      } else {
        newLines.push({
          ...newLine,
          qty: leaveQty,
          comment,
        });
      }

      return newLines;
    });

    handleReset();
  };

  const handleEditLine = useCallback(line => {
    setNewLine(line);
    setLeaveQty(line.qty);
    setComment(line.comment);
  }, []);

  const isEditionMode = useMemo(
    () => newLine?.qty > 0 && lines.find(({id}) => id === newLine.id) != null,
    [lines, newLine],
  );

  const currentDuration = useMemo(
    () => lines.reduce((accumulator, line) => accumulator + line.qty, 0),
    [lines],
  );

  useEffect(() => {
    if (fromDate && toDate && startOn && endOn) {
      fetchMissingDuration({
        fromDate,
        toDate,
        startOnSelect: startOn,
        endOnSelect: endOn,
      })
        .then(duration => setMissingQty(duration - currentDuration))
        .catch(() => setMissingQty(0));
    }
  }, [currentDuration, endOn, fromDate, startOn, toDate]);

  if (!canCreate) {
    return (
      <Label
        style={styles.label}
        type="danger"
        message={I18n.t('Base_NoPermForCreate')}
      />
    );
  }

  return (
    <Screen
      fixedItems={
        <CompleteRequestButtons
          leaveQty={leaveQty}
          hasNewLine={!!newLine}
          hasLines={lines.length > 0}
          isFinishDisabled={
            !fromDate || !toDate || !startOn || !endOn || missingQty !== 0
          }
          onAddPress={handleAddLine}
          onFinishPress={() => {
            dispatch(
              (createLeaveRequest as any)({
                fromDate,
                startOnSelect: startOn,
                lines,
              }),
            );
            resetDefaultStates();
          }}
        />
      }>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        style={styles.container}>
        <PeriodInput
          startDateConfig={{date: fromDate, onDateChange: setFromDate}}
          endDateConfig={{date: toDate, onDateChange: setToDate}}
        />
        <LeaveStartEndOn
          startOn={startOn}
          endOn={endOn}
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
        {missingQty !== 0 && (
          <Label
            style={styles.label}
            message={`${I18n.t(missingQty > 0 ? 'Hr_MissingQuantity' : 'Hr_ExceedingQuantity')} : ${Math.abs(missingQty)} ${I18n.t('Hr_TimeUnit_Days')}`}
            type="error"
          />
        )}
        {!newLine && (
          <LeaveReasonSearchBar
            showTitle={false}
            defaultValue={newLine}
            onChange={leaveReason =>
              leaveReason != null &&
              setNewLine({
                id: leaveReason.id,
                name: leaveReason.name,
                unitName: getItemTitle(
                  LeaveReason?.unitSelect,
                  leaveReason.unitSelect,
                ),
                leaveReasonTypeSelect: leaveReason.leaveReasonTypeSelect,
              })
            }
          />
        )}
        {newLine && (
          <CompleteRequestQuantityCard
            leaveQty={leaveQty}
            setLeaveQty={setLeaveQty}
            cancelLeave={handleReset}
            newLine={newLine}
            toDate={toDate}
          />
        )}
        {newLine && (
          <FormInput
            title={I18n.t('Hr_Comments')}
            defaultValue={comment}
            onChange={setComment}
            multiline
            adjustHeightWithLines
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
    alignSelf: 'center',
  },
});

export default CompleteRequestScreen;
