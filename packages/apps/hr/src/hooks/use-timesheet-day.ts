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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useDispatch,
  useIsFocused,
  usePermitted,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  DayFill,
  getWeekDates,
  toDateString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {fetchTimesheet, fetchTimesheetById} from '../features/timesheetSlice';
import {
  fetchAllTimesheetLines,
  fetchTimesheetLineCount,
} from '../features/timesheetLineSlice';
import {Timesheet as TimesheetType} from '../types';
import {
  buildFillByDate,
  buildFillFromLines,
  DayMetrics,
  getDayMetrics,
  getTimesheetPeriod,
  groupLinesByDate,
  sumDayMetrics,
  TimeLoggingPreferenceValue,
} from '../utils';

const EMPTY_LINES: any[] = [];

interface TimesheetDay {
  timesheet: any;
  timesheetList: any[];
  timesheetId?: number;
  isPickerMode: boolean;
  isCurrentTimesheet: boolean;
  selectTimesheet: (timesheetId: number) => void;
  selectedDate?: string;
  setSelectedDate: (dateString: string) => void;
  fromDate?: string;
  toDate?: string;
  preference?: TimeLoggingPreferenceValue;
  statusSelect?: number;
  isEditable: boolean;
  isAddAllowed: boolean;
  isWorkingDay: boolean;
  isTimesheetEmpty: boolean;
  canDelete: boolean;
  readonly: boolean;
  fillByDate: Record<string, DayFill>;
  dayLines: any[];
  leaveReason?: string;
  dayMetrics?: DayMetrics;
  declaredTime: number;
  weekDates: string[];
  weekMetrics: DayMetrics;
  timesheetMetrics: DayMetrics;
  hasSummary: boolean;
  hasNoTimesheet: boolean;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  refresh: () => void;
}

export const useTimesheetDay = (routeTimesheetId?: number): TimesheetDay => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {Timesheet} = useTypes();
  const {canCreate, canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
  });

  const {timesheet, myTimesheetList, loadingMyTimesheet} = useSelector(
    state => state.timesheet,
  );
  const {
    allTimesheetLineList,
    timesheetLineCounts,
    loadingAllTimesheetLines,
    loadingTimesheetLineCount,
  } = useSelector(state => state.timesheetLine);
  const {mobileSettings, timesheet: timesheetConfig} = useSelector(
    state => state.appConfig,
  );
  const {user} = useSelector(state => state.user);

  const [pickedTimesheetId, setPickedTimesheetId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string>();

  const isPickerMode = routeTimesheetId == null;
  const timesheetId = routeTimesheetId ?? pickedTimesheetId;
  const isCurrentTimesheet =
    timesheetId != null && timesheet?.id === timesheetId;

  const timesheetList = useMemo(
    () => (Array.isArray(myTimesheetList) ? myTimesheetList : []),
    [myTimesheetList],
  );

  const refresh = useCallback(() => {
    if (isPickerMode) {
      dispatch(
        (fetchTimesheet as any)({
          page: 0,
          userId: user.id,
          companyId: user.activeCompany?.id,
        }),
      );
    }

    if (isCurrentTimesheet) {
      dispatch((fetchAllTimesheetLines as any)({timesheetId}));
      dispatch((fetchTimesheetLineCount as any)({timesheetId}));
    }
  }, [dispatch, isCurrentTimesheet, isPickerMode, timesheetId, user]);

  useEffect(() => {
    if (isFocused) refresh();
  }, [isFocused, refresh]);

  useEffect(() => {
    if (!isPickerMode) return;

    if (timesheetList.length === 0) {
      setPickedTimesheetId(undefined);
      return;
    }

    setPickedTimesheetId(current => {
      if (current != null && timesheetList.some(item => item.id === current))
        return current;

      const today = toDateString(new Date());
      const ongoing = timesheetList.find(item => {
        const period = getTimesheetPeriod(item);

        return (
          period != null && today >= period.fromDate && today <= period.toDate
        );
      });

      return (ongoing ?? timesheetList[0]).id;
    });
  }, [isPickerMode, timesheetList]);

  useEffect(() => {
    if (timesheetId == null) return;

    dispatch((fetchTimesheetById as any)({timesheetId}));
  }, [dispatch, timesheetId]);

  const {fromDate, toDate} = useMemo(
    () =>
      getTimesheetPeriod(timesheet) ?? {
        fromDate: undefined,
        toDate: undefined,
      },
    [timesheet],
  );

  useEffect(() => {
    if (fromDate == null) return;

    const today = toDateString(new Date());

    setSelectedDate(today >= fromDate && today <= toDate ? today : fromDate);
  }, [fromDate, toDate]);

  const preference = timesheet?.timeLoggingPreferenceSelect;

  const statusSelect = useMemo(
    () => TimesheetType.getStatus(timesheetConfig?.needValidation, timesheet),
    [timesheet, timesheetConfig?.needValidation],
  );

  const fillByDate = useMemo(
    () =>
      buildFillByDate(timesheetLineCounts, preference, {
        leaveColor: Colors.cautionColor,
        nonWorkingColor: Colors.secondaryColor_dark,
      }) ?? buildFillFromLines(allTimesheetLineList),
    [Colors, allTimesheetLineList, preference, timesheetLineCounts],
  );

  const linesByDate = useMemo(
    () => groupLinesByDate(allTimesheetLineList),
    [allTimesheetLineList],
  );

  const dayLines =
    (selectedDate != null ? linesByDate[selectedDate] : null) ?? EMPTY_LINES;
  const dayCount =
    selectedDate != null ? timesheetLineCounts?.[selectedDate] : undefined;

  const dayMetrics = useMemo(
    () => (dayCount == null ? undefined : getDayMetrics(dayCount, preference)),
    [dayCount, preference],
  );

  const declaredTime = useMemo(
    () =>
      dayLines.reduce(
        (total: number, line: any) => total + Number(line?.duration ?? 0),
        0,
      ),
    [dayLines],
  );

  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  const weekMetrics = useMemo(
    () => sumDayMetrics(timesheetLineCounts, preference, weekDates),
    [preference, timesheetLineCounts, weekDates],
  );

  const timesheetMetrics = useMemo(
    () => sumDayMetrics(timesheetLineCounts, preference),
    [preference, timesheetLineCounts],
  );

  const isEditable = statusSelect === Timesheet?.statusSelect.Draft;

  const isWorkingDay = dayMetrics == null || dayMetrics.expectedTime > 0;

  return {
    timesheet,
    timesheetList,
    timesheetId,
    isPickerMode,
    isCurrentTimesheet,
    selectTimesheet: setPickedTimesheetId,
    selectedDate,
    setSelectedDate,
    fromDate,
    toDate,
    preference,
    statusSelect,
    isEditable,
    isWorkingDay,
    isTimesheetEmpty: !(allTimesheetLineList?.length > 0),
    isAddAllowed:
      isEditable &&
      canCreate &&
      !readonly &&
      mobileSettings?.isLineCreationOfTimesheetDetailsAllowed,
    canDelete,
    readonly,
    fillByDate,
    dayLines,
    leaveReason: dayCount?.leaveReason,
    dayMetrics,
    declaredTime,
    weekDates,
    weekMetrics,
    timesheetMetrics,
    hasSummary: timesheetLineCounts != null && weekDates.length > 0,
    hasNoTimesheet:
      isPickerMode && !loadingMyTimesheet && timesheetList.length === 0,
    isInitialLoading: loadingMyTimesheet && timesheetList.length === 0,
    isRefreshing:
      loadingMyTimesheet ||
      loadingAllTimesheetLines ||
      loadingTimesheetLineCount,
    refresh,
  };
};
