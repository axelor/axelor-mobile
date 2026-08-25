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
  headerActionsProvider,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  CalendarLegendItem,
  CalendarRangePicker,
  Color,
  DateRange,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  LeaveBalanceSheet,
  LeaveCard,
  LeaveSelectionCard,
} from '../../components';
import {
  buildMarksByDate,
  mapNonWorkingDaysToColors,
  NonWorkingDay,
  NonWorkingDayType,
} from '../../utils';
import {Leave} from '../../types';
import {
  fetchLeaveByPeriod,
  fetchNonWorkingDays,
} from '../../features/leaveSlice';

const EMPTY_SELECTION: DateRange = {};

const LeaveCalendarScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {LeaveRequest} = useTypes();
  const {getItemColor, getSelectionItems} = useTypeHelpers();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const {user} = useSelector(state => state.user);
  const {leaveListByPeriod, nonWorkingDays} = useSelector(
    state => state.hr_leave,
  );

  const [selection, setSelection] = useState<DateRange>(EMPTY_SELECTION);
  const [isBalanceSheetOpen, setIsBalanceSheetOpen] = useState(false);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_leave_calendar', {
      model: 'com.axelor.apps.hr.db.LeaveRequest',
      actions: [
        {
          key: 'leaveBalances',
          order: 10,
          iconName: 'wallet2',
          title: I18n.t('Hr_LeaveBalances'),
          iconColor: Colors.primaryColor.background,
          onPress: () => setIsBalanceSheetOpen(true),
          showInHeader: true,
        },
      ],
    });
  }, [Colors.primaryColor.background, I18n]);

  const marksByDate = useMemo(
    () =>
      buildMarksByDate(leaveListByPeriod, statusSelect =>
        getItemColor(LeaveRequest?.statusSelect, statusSelect),
      ),
    [LeaveRequest?.statusSelect, getItemColor, leaveListByPeriod],
  );

  const nonWorkingColors = useMemo<Record<NonWorkingDayType, Color>>(
    () => ({
      [NonWorkingDay.weekEnd]: Colors.secondaryColor,
      [NonWorkingDay.publicHoliday]: Colors.indigo,
    }),
    [Colors],
  );

  const disabledDates = useMemo(
    () => mapNonWorkingDaysToColors(nonWorkingDays, nonWorkingColors),
    [nonWorkingColors, nonWorkingDays],
  );

  const displayedStatus = useMemo(
    () => [
      LeaveRequest?.statusSelect?.Draft,
      LeaveRequest?.statusSelect?.WaitingValidation,
      LeaveRequest?.statusSelect?.Validate,
      LeaveRequest?.statusSelect?.Refused,
    ],
    [LeaveRequest?.statusSelect],
  );

  const legendItems = useMemo<CalendarLegendItem[]>(() => {
    const statusItems = getSelectionItems(LeaveRequest?.statusSelect)
      .filter(({value}) => displayedStatus.includes(value))
      .map(({title, color, value}) => ({key: `status-${value}`, title, color}));

    return [
      ...statusItems,
      {
        key: NonWorkingDay.weekEnd,
        title: I18n.t('Hr_WeekEnd'),
        color: nonWorkingColors[NonWorkingDay.weekEnd],
      },
      {
        key: NonWorkingDay.publicHoliday,
        title: I18n.t('Hr_PublicHoliday'),
        color: nonWorkingColors[NonWorkingDay.publicHoliday],
      },
    ];
  }, [
    I18n,
    LeaveRequest?.statusSelect,
    displayedStatus,
    getSelectionItems,
    nonWorkingColors,
  ]);

  const handleVisibleRangeChange = useCallback(
    ({fromDate, toDate}: {fromDate: string; toDate: string}) => {
      dispatch(
        (fetchLeaveByPeriod as any)({
          userId: user?.id,
          companyId: user?.activeCompany?.id,
          fromDate,
          toDate,
          displayedStatus,
        }),
      );

      dispatch(
        (fetchNonWorkingDays as any)({
          employeeId: user?.employee?.id,
          fromDate,
          toDate,
        }),
      );
    },
    [
      dispatch,
      displayedStatus,
      user?.activeCompany?.id,
      user?.employee?.id,
      user?.id,
    ],
  );

  const renderLeave = useCallback(
    (leave: any, closeSheet: () => void) => (
      <LeaveCard
        mode={Leave.mode.myLeaves}
        leaveId={leave.id}
        statusSelect={leave.statusSelect}
        startDate={leave.fromDateT}
        endDate={leave.toDateT}
        duration={leave.duration}
        durationUnitSelect={leave.leaveReason?.unitSelect}
        reason={leave.leaveReason?.name}
        company={leave.company?.name}
        employee={leave.employee?.name}
        onPress={() => {
          closeSheet();
          navigation.navigate('LeaveDetailsScreen', {leaveId: leave.id});
        }}
      />
    ),
    [navigation],
  );

  const handleClear = useCallback(() => setSelection(EMPTY_SELECTION), []);

  const handleValidate = useCallback(() => {
    const {startDate, endDate} = selection;

    navigation.navigate('CompleteRequestScreen', {
      fromDate: startDate,
      toDate: endDate ?? startDate,
    });
  }, [navigation, selection]);

  return (
    <Screen
      fixedItems={
        <LeaveSelectionCard
          startDate={selection.startDate}
          endDate={selection.endDate}
          disabled={!canCreate}
          onClear={handleClear}
          onValidate={handleValidate}
        />
      }>
      <CalendarRangePicker
        style={styles.calendar}
        selection={selection}
        onSelectionChange={setSelection}
        marksByDate={marksByDate}
        disabledDates={disabledDates}
        disabledColor={nonWorkingColors[NonWorkingDay.weekEnd]}
        legendItems={legendItems}
        renderEvent={renderLeave}
        onVisibleRangeChange={handleVisibleRangeChange}
        translator={I18n.t}
      />
      <LeaveBalanceSheet
        visible={isBalanceSheetOpen}
        onClose={() => setIsBalanceSheetOpen(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
});

export default LeaveCalendarScreen;
