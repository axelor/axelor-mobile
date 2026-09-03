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

import React, {useCallback, useMemo, useRef} from 'react';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {
  buildMonthLayout,
  CalendarMonth,
  getMonthHeight,
  MAX_WEEKS_IN_MONTH,
} from '../../../utils';
import AgendaMonth from './AgendaMonth';

interface MonthListProps {
  months: CalendarMonth[];
  itemsByMonth: Record<string, Record<string, any[]>>;
  selectedDate?: string;
  visibleMonthKey: string;
  visibleIndex: number;
  todayDateString: string;
  firstDayOfWeek: number;
  translator: (key: string) => string;
  onDayPress: (dateString: string) => void;
  onVisibleMonthChange: (monthKey: string) => void;
}

const viewabilityConfig = {itemVisiblePercentThreshold: 60};

const EMPTY_ITEMS: Record<string, any[]> = Object.freeze({});

const MonthList = ({
  months,
  itemsByMonth,
  selectedDate,
  visibleMonthKey,
  visibleIndex,
  todayDateString,
  firstDayOfWeek,
  translator,
  onDayPress,
  onVisibleMonthChange,
}: MonthListProps) => {
  const {heights, offsets} = useMemo(() => buildMonthLayout(months), [months]);

  const renderItem = useCallback(
    ({item}: {item: CalendarMonth}) => (
      <AgendaMonth
        month={item}
        items={itemsByMonth[item.monthKey] ?? EMPTY_ITEMS}
        selectedDate={selectedDate}
        todayDateString={todayDateString}
        firstDayOfWeek={firstDayOfWeek}
        translator={translator}
        onDayPress={onDayPress}
      />
    ),
    [
      firstDayOfWeek,
      itemsByMonth,
      onDayPress,
      selectedDate,
      todayDateString,
      translator,
    ],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: heights[index],
      offset: offsets[index],
      index,
    }),
    [heights, offsets],
  );

  const keyExtractor = useCallback((item: CalendarMonth) => item.key, []);

  const emitVisibleMonth = useRef<((items: ViewToken[]) => void) | undefined>(
    undefined,
  );

  emitVisibleMonth.current = (viewableItems: ViewToken[]) => {
    const monthKey = (viewableItems[0]?.item as CalendarMonth)?.monthKey;

    if (monthKey != null && monthKey !== visibleMonthKey) {
      onVisibleMonthChange(monthKey);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged: ({viewableItems}: {viewableItems: ViewToken[]}) =>
        emitVisibleMonth.current?.(viewableItems),
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialScrollIndex={visibleIndex}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        testID="agendaMonthList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: getMonthHeight(MAX_WEEKS_IN_MONTH),
    overflow: 'hidden',
  },
});

export default MonthList;
