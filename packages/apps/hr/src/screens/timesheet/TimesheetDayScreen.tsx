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
import {AnomalyList, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {
  Button,
  formatDateRange,
  Label,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
  WeekDayPicker,
} from '@axelor/aos-mobile-ui';
import {
  TimesheetCreationAlert,
  TimesheetDayCard,
  TimesheetDetailsButtons,
  TimesheetDayLines,
  TimesheetPicker,
  TimesheetSummaryButton,
  TimesheetSummarySheet,
} from '../../components';
import {deleteTimesheetLine} from '../../features/timesheetLineSlice';
import {useTimesheetDay} from '../../hooks';
import {getDurationUnit} from '../../utils';

const TimesheetDayScreen = ({navigation, route}: any) => {
  const {timesheetId: routeTimesheetId} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [isCreationAlertOpen, setIsCreationAlertOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const day = useTimesheetDay(routeTimesheetId);
  const {timesheetId, selectedDate, fromDate, toDate, weekDates} = day;

  const unit = getDurationUnit(day.preference, I18n) ?? '';
  const isDayVisible = day.isCurrentTimesheet && fromDate != null;

  const openLineForm = useCallback(
    (params: any) =>
      navigation.navigate('TimesheetLineFormScreen', {timesheetId, ...params}),
    [navigation, timesheetId],
  );

  const deleteLine = useCallback(
    (line: any) =>
      dispatch(
        (deleteTimesheetLine as any)({timesheetId, timesheetLineId: line.id}),
      ),
    [dispatch, timesheetId],
  );

  const editLine = useCallback(
    (line: any) => openLineForm({timesheetLine: line}),
    [openLineForm],
  );

  const openSummary = useCallback(() => setIsSummaryOpen(true), []);

  const renderFixedItems = () => {
    if (!day.isCurrentTimesheet) return null;

    return (
      <View style={styles.footer}>
        {!day.isEditable && (
          <Label message={I18n.t('Hr_TimesheetNotEditable')} type="info" />
        )}
        <TimesheetDetailsButtons
          timesheet={day.timesheet}
          statusSelect={day.statusSelect!}
          isEmpty={day.isTimesheetEmpty}
        />
      </View>
    );
  };

  return (
    <Screen fixedItems={renderFixedItems()} loading={day.isInitialLoading}>
      {day.isPickerMode && day.timesheetList.length > 0 && (
        <TimesheetPicker
          timesheetList={day.timesheetList}
          timesheetId={timesheetId}
          onChange={day.selectTimesheet}
        />
      )}
      {isDayVisible && (
        <WeekDayPicker
          style={styles.strip}
          fromDate={fromDate}
          toDate={toDate}
          selectedDate={selectedDate}
          onDateChange={day.setSelectedDate}
          fillByDate={day.fillByDate}
          translator={I18n.t}
        />
      )}
      <ScrollView
        refresh={{loading: day.isRefreshing, fetcher: day.refresh}}
        style={styles.scroll}>
        {day.hasNoTimesheet && (
          <View style={styles.emptyContainer}>
            <Text style={styles.empty} textColor={Colors.placeholderTextColor}>
              {I18n.t('Hr_NoTimesheetAvailable')}
            </Text>
            <Button
              iconName="plus-lg"
              title={I18n.t('Hr_CreateTimesheet')}
              onPress={() => setIsCreationAlertOpen(true)}
            />
          </View>
        )}
        {isDayVisible && (
          <>
            <AnomalyList objectName="timesheet" objectId={timesheetId!} />
            {day.hasSummary && (
              <TimesheetSummaryButton
                difference={day.weekMetrics.difference}
                unit={unit}
                onPress={openSummary}
              />
            )}
            <TimesheetDayCard
              dateString={selectedDate}
              lineCount={day.dayLines.length}
              metrics={day.dayMetrics}
              declaredTime={day.declaredTime}
              unit={unit}
              leaveReason={day.leaveReason}
            />
            {day.isEditable && day.isWorkingDay && day.isAddAllowed && (
              <Button
                style={styles.addButton}
                iconName="plus-lg"
                title={I18n.t('Hr_AddTime')}
                onPress={() => openLineForm({date: selectedDate})}
              />
            )}
            <TimesheetDayLines
              lines={day.dayLines}
              durationUnit={day.preference}
              isActions={day.isEditable}
              canEdit={!day.readonly}
              showTrash={day.canDelete}
              onEdit={editLine}
              onDelete={deleteLine}
            />
          </>
        )}
      </ScrollView>
      <TimesheetSummarySheet
        visible={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        unit={unit}
        weekLabel={formatDateRange(weekDates[0], weekDates[6], I18n.t)}
        weekMetrics={day.weekMetrics}
        periodLabel={formatDateRange(fromDate, toDate, I18n.t)}
        timesheetMetrics={day.timesheetMetrics}
      />
      <TimesheetCreationAlert
        isOpen={isCreationAlertOpen}
        onCancel={() => setIsCreationAlertOpen(false)}
        onCreated={day.selectTimesheet}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    gap: 8,
  },
  scroll: {
    paddingTop: 0,
  },
  strip: {
    flexGrow: 0,
    marginBottom: 4,
  },
  addButton: {
    width: '95%',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 20,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 30,
  },
});

export default TimesheetDayScreen;
