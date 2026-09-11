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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useThemeColor} from '../../../theme';
import {
  DAYS_IN_WEEK,
  DEFAULT_FIRST_DAY_OF_WEEK,
  toDateString,
} from '../../../utils';
import {Text} from '../../atoms';
import {CalendarLegendItem} from '../../molecules';
import {
  GanttGroup,
  GanttItem,
  GanttRange,
  GanttRow,
  GanttRowLayout,
  GanttZoom,
} from './types';
import {
  buildGanttDays,
  buildGanttPeriods,
  buildMonthBands,
  buildRowLayout,
  getSteppedScrollOffset,
  getVisibleRange,
  getWeekScrollOffset,
} from './gantt-view.helpers';
import {
  GANTT_DAYS_PER_PAGE,
  ganttStyles,
  getDayWidth,
  getGridWidth,
} from './gantt-view.styles';
import {GanttHeader} from './header';
import {GanttScaleHeader} from './scale';
import {
  GanttGridLines,
  GanttGroupHeader,
  GanttGroupLane,
  GanttRowLane,
  GanttRowName,
} from './body';

interface GanttViewProps {
  groups: GanttGroup[];
  zoom?: GanttZoom;
  weeksBefore?: number;
  weeksAfter?: number;
  firstDayOfWeek?: number;
  legendItems?: CalendarLegendItem[];
  filters?: React.ReactNode;
  showTodayButton?: boolean;
  showNavigation?: boolean;
  showBarTitles?: boolean;
  showExpandAll?: boolean;
  showCollapseAll?: boolean;
  showFilledRowsFilter?: boolean;
  filledRowsFilterTitle?: string;
  filledRowsOnlyByDefault?: boolean;
  cornerTitle?: string;
  weekPrefix?: string;
  emptyMessage?: string;
  loadingList?: boolean;
  moreLoading?: boolean;
  isListEnd?: boolean;
  fetchData?: (page: number) => void;
  disabledRefresh?: boolean;
  onItemPress?: (item: GanttItem, row: GanttRow) => void;
  onRowPress?: (row: GanttRow) => void;
  onVisibleRangeChange?: (range: GanttRange) => void;
  translator: (key: string) => string;
  style?: any;
}

const VISIBLE_RANGE_DELAY = 300;
const END_REACHED_THRESHOLD = 0.5;

const GanttView = ({
  groups,
  zoom = 'week',
  weeksBefore = 26,
  weeksAfter = 26,
  firstDayOfWeek = DEFAULT_FIRST_DAY_OF_WEEK,
  legendItems,
  filters,
  showTodayButton = true,
  showNavigation = true,
  showBarTitles = true,
  showExpandAll = false,
  showCollapseAll = false,
  showFilledRowsFilter = false,
  filledRowsFilterTitle,
  filledRowsOnlyByDefault = true,
  cornerTitle,
  weekPrefix,
  emptyMessage,
  loadingList = false,
  moreLoading = false,
  isListEnd = false,
  fetchData,
  disabledRefresh = false,
  onItemPress,
  onRowPress,
  onVisibleRangeChange,
  translator,
  style,
}: GanttViewProps) => {
  const Colors = useThemeColor();

  const referenceDate = useRef(new Date());

  const todayDateString = useMemo(
    () => toDateString(referenceDate.current),
    [],
  );

  const [containerWidth, setContainerWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [, setPage] = useState(0);
  const [collapsedByKey, setCollapsedByKey] = useState<Record<string, boolean>>(
    {},
  );
  const [filledRowsOnly, setFilledRowsOnly] = useState<boolean | undefined>(
    filledRowsOnlyByDefault,
  );

  const days = useMemo(
    () =>
      buildGanttDays(
        referenceDate.current,
        weeksBefore,
        weeksAfter,
        firstDayOfWeek,
      ),
    [firstDayOfWeek, weeksAfter, weeksBefore],
  );

  const periods = useMemo(() => buildGanttPeriods(days), [days]);

  const monthBands = useMemo(() => buildMonthBands(days), [days]);

  const firstDateString = days[0]?.dateString;

  const gridWidth = getGridWidth(containerWidth);
  const daysPerPage = GANTT_DAYS_PER_PAGE[zoom];
  const dayWidth = getDayWidth(gridWidth, daysPerPage);
  const contentWidth = days.length * dayWidth;

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(0);
  const scaleTranslateX = useRef(Animated.multiply(scrollX, -1)).current;
  const lanesScroll = useRef<ScrollView>(null);

  const getOffsetForDate = useCallback(
    (dateString: string): number | undefined =>
      dayWidth <= 0 || firstDateString == null
        ? undefined
        : getWeekScrollOffset(
            dateString,
            firstDateString,
            dayWidth,
            gridWidth,
            contentWidth,
          ),
    [contentWidth, dayWidth, firstDateString, gridWidth],
  );

  const todayScrollOffset = getOffsetForDate(todayDateString);

  const scrollToDate = useCallback(
    (dateString: string, animated: boolean) => {
      const x = getOffsetForDate(dateString);

      if (x == null) return;

      lanesScroll.current?.scrollTo({x, animated});
    },
    [getOffsetForDate],
  );

  const weekStep = useMemo(
    () => Math.max(Math.round(daysPerPage / DAYS_IN_WEEK), 1),
    [daysPerPage],
  );

  const scrollByStep = useCallback(
    (direction: number) => {
      if (dayWidth <= 0) return;

      lanesScroll.current?.scrollTo({
        x: getSteppedScrollOffset(
          scrollOffset.current,
          direction * weekStep,
          dayWidth,
          gridWidth,
          contentWidth,
        ),
        animated: true,
      });
    },
    [contentWidth, dayWidth, gridWidth, weekStep],
  );

  const scrollToPrevious = useCallback(() => scrollByStep(-1), [scrollByStep]);

  const scrollToNext = useCallback(() => scrollByStep(1), [scrollByStep]);

  const scrollToToday = useCallback(
    () => scrollToDate(todayDateString, true),
    [scrollToDate, todayDateString],
  );

  const lastEmittedRange = useRef<string | undefined>(undefined);
  const emitTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(emitTimeout.current), []);

  const emitVisibleRange = useRef<((x: number) => void) | undefined>(undefined);

  emitVisibleRange.current = (x: number) => {
    if (onVisibleRangeChange == null) return;

    const range = getVisibleRange(days, x, gridWidth, dayWidth);

    if (range == null) return;

    const rangeKey = `${range.fromDate}_${range.toDate}`;

    if (rangeKey === lastEmittedRange.current) return;

    lastEmittedRange.current = rangeKey;

    clearTimeout(emitTimeout.current);
    emitTimeout.current = setTimeout(
      () => onVisibleRangeChange(range),
      VISIBLE_RANGE_DELAY,
    );
  };

  useEffect(() => {
    if (todayScrollOffset == null) return;

    const frame = requestAnimationFrame(() => {
      lanesScroll.current?.scrollTo({x: todayScrollOffset, animated: false});
      scrollOffset.current = todayScrollOffset;
      scrollX.setValue(todayScrollOffset);
      emitVisibleRange.current?.(todayScrollOffset);
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollX, todayScrollOffset]);

  const handleHorizontalScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = nativeEvent.contentOffset.x;

      scrollOffset.current = x;
      scrollX.setValue(x);
      emitVisibleRange.current?.(x);
    },
    [scrollX],
  );

  const updateData = useCallback(() => {
    setPage(0);
    fetchData?.(0);
  }, [fetchData]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const requestMore = useCallback(() => {
    if (loadingList || moreLoading || isListEnd) return;

    setPage(current => {
      const next = current + 1;

      fetchData?.(next);

      return next;
    });
  }, [fetchData, isListEnd, loadingList, moreLoading]);

  useEffect(() => {
    if (contentHeight === 0 || bodyHeight === 0) return;

    if (contentHeight - bodyHeight <= bodyHeight * END_REACHED_THRESHOLD) {
      requestMore();
    }
  }, [bodyHeight, contentHeight, requestMore]);

  const handleVerticalScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;

      const distanceToEnd =
        contentSize.height - (layoutMeasurement.height + contentOffset.y);

      if (distanceToEnd <= layoutMeasurement.height * END_REACHED_THRESHOLD) {
        requestMore();
      }
    },
    [requestMore],
  );

  const handleLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) =>
      setContainerWidth(nativeEvent.layout.width),
    [],
  );

  const isGroupCollapsed = useCallback(
    (group: GanttGroup) =>
      collapsedByKey[group.key] ?? group.collapsed ?? false,
    [collapsedByKey],
  );

  const toggleGroup = useCallback(
    (groupKey: string) => {
      const group = (groups ?? []).find(({key}) => key === groupKey);

      setCollapsedByKey(current => ({
        ...current,
        [groupKey]: !(current[groupKey] ?? group?.collapsed ?? false),
      }));
    },
    [groups],
  );

  const setAllGroups = useCallback(
    (collapsed: boolean) =>
      setCollapsedByKey(
        Object.fromEntries((groups ?? []).map(({key}) => [key, collapsed])),
      ),
    [groups],
  );

  const expandAll = useCallback(() => setAllGroups(false), [setAllGroups]);

  const collapseAll = useCallback(() => setAllGroups(true), [setAllGroups]);

  const filteredGroups = useMemo(() => {
    if (!showFilledRowsFilter || !filledRowsOnly) return groups ?? [];

    return (groups ?? [])
      .map(group => ({
        ...group,
        rows: (group.rows ?? []).filter(row => (row.items?.length ?? 0) > 0),
      }))
      .filter(group => group.rows.length > 0);
  }, [filledRowsOnly, groups, showFilledRowsFilter]);

  const visibleGroups = useMemo(
    () =>
      filteredGroups.map(group => ({
        group,
        collapsed: isGroupCollapsed(group),
      })),
    [filteredGroups, isGroupCollapsed],
  );

  const rowLayouts = useMemo(() => {
    const layouts = new Map<string, GanttRowLayout>();

    filteredGroups.forEach(group =>
      (group.rows ?? []).forEach(row =>
        layouts.set(row.key, buildRowLayout(row)),
      ),
    );

    return layouts;
  }, [filteredGroups]);

  const getRowLayout = useCallback(
    (row: GanttRow): GanttRowLayout =>
      rowLayouts.get(row.key) ?? buildRowLayout(row),
    [rowLayouts],
  );

  const hasRows = useMemo(
    () => filteredGroups.some(({rows}) => rows.length > 0),
    [filteredGroups],
  );

  const refreshControl =
    disabledRefresh || fetchData == null ? undefined : (
      <RefreshControl refreshing={false} onRefresh={updateData} />
    );

  return (
    <View
      style={[ganttStyles.container, style]}
      onLayout={handleLayout}
      testID="ganttViewContainer">
      <GanttHeader
        legendItems={legendItems}
        filters={filters}
        showTodayButton={showTodayButton}
        showNavigation={showNavigation}
        showExpandAll={showExpandAll}
        showCollapseAll={showCollapseAll}
        showFilledRowsFilter={showFilledRowsFilter}
        filledRowsFilterTitle={filledRowsFilterTitle}
        filledRowsOnly={filledRowsOnly ?? false}
        translator={translator}
        onToday={scrollToToday}
        onPrevious={scrollToPrevious}
        onNext={scrollToNext}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onFilledRowsOnlyChange={setFilledRowsOnly}
      />
      {containerWidth > 0 && (
        <>
          <View style={ganttStyles.scaleRow}>
            <View
              style={[
                ganttStyles.scaleCorner,
                {
                  backgroundColor: Colors.screenBackgroundColor,
                  borderRightColor: Colors.secondaryColor_dark.background_light,
                  borderBottomColor:
                    Colors.secondaryColor_dark.background_light,
                },
              ]}>
              {cornerTitle != null && (
                <Text
                  numberOfLines={1}
                  fontSize={9}
                  textColor={Colors.placeholderTextColor}>
                  {cornerTitle}
                </Text>
              )}
            </View>
            <View style={ganttStyles.scaleClip}>
              <Animated.View
                style={{transform: [{translateX: scaleTranslateX}]}}>
                <GanttScaleHeader
                  days={days}
                  periods={periods}
                  monthBands={monthBands}
                  dayWidth={dayWidth}
                  contentWidth={contentWidth}
                  todayDateString={todayDateString}
                  showDays={zoom === 'week'}
                  weekPrefix={weekPrefix}
                  translator={translator}
                />
              </Animated.View>
            </View>
          </View>
          {hasRows ? (
            <ScrollView
              style={ganttStyles.body}
              onScroll={handleVerticalScroll}
              onScrollEndDrag={handleVerticalScroll}
              onMomentumScrollEnd={handleVerticalScroll}
              scrollEventThrottle={200}
              onContentSizeChange={(_, height) => setContentHeight(height)}
              onLayout={({nativeEvent}) =>
                setBodyHeight(nativeEvent.layout.height)
              }
              refreshControl={refreshControl}
              testID="ganttVerticalScroll">
              <View style={ganttStyles.bodyRow}>
                <View
                  style={[
                    ganttStyles.nameColumn,
                    {
                      backgroundColor: Colors.backgroundColor,
                      borderRightColor:
                        Colors.secondaryColor_dark.background_light,
                    },
                  ]}>
                  {visibleGroups.map(({group, collapsed}) => (
                    <React.Fragment key={group.key}>
                      <GanttGroupHeader
                        group={group}
                        collapsed={collapsed}
                        onPress={toggleGroup}
                      />
                      {!collapsed &&
                        group.rows.map(row => (
                          <GanttRowName
                            key={row.key}
                            row={row}
                            height={getRowLayout(row).height}
                            onPress={onRowPress}
                          />
                        ))}
                    </React.Fragment>
                  ))}
                </View>
                <ScrollView
                  ref={lanesScroll}
                  style={ganttStyles.lanesClip}
                  horizontal
                  onScroll={handleHorizontalScroll}
                  scrollEventThrottle={16}
                  contentOffset={{x: todayScrollOffset ?? 0, y: 0}}
                  snapToInterval={dayWidth * DAYS_IN_WEEK}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  testID="ganttHorizontalScroll">
                  <View
                    style={{
                      width: contentWidth,
                      backgroundColor: Colors.backgroundColor,
                    }}>
                    <GanttGridLines
                      days={days}
                      dayWidth={dayWidth}
                      showDayLines={zoom === 'week'}
                    />
                    {visibleGroups.map(({group, collapsed}) => (
                      <React.Fragment key={group.key}>
                        <GanttGroupLane
                          group={group}
                          days={days}
                          dayWidth={dayWidth}
                          contentWidth={contentWidth}
                        />
                        {!collapsed &&
                          group.rows.map(row => (
                            <GanttRowLane
                              key={row.key}
                              row={row}
                              layout={getRowLayout(row)}
                              days={days}
                              dayWidth={dayWidth}
                              contentWidth={contentWidth}
                              showBarTitles={showBarTitles && zoom === 'week'}
                              onItemPress={onItemPress}
                            />
                          ))}
                      </React.Fragment>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.footer}>
                {moreLoading && <ActivityIndicator size="large" />}
                {isListEnd && (
                  <Text writingType="details" fontSize={10}>
                    {translator('Base_NoMoreItems')}
                  </Text>
                )}
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              style={ganttStyles.body}
              contentContainerStyle={styles.empty}
              refreshControl={refreshControl}
              testID="ganttEmptyScroll">
              <Text writingType="details" fontSize={10}>
                {emptyMessage ?? translator('Base_NoData')}
              </Text>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  empty: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default GanttView;
