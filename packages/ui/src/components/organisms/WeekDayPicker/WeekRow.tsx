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

import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../../theme';
import {WEEK_ROW_HEIGHT} from './week-day.helpers';
import {DayFill, WeekPage} from './types';
import DayGauge from './DayGauge';

interface WeekRowProps {
  week: WeekPage;
  fills: Record<string, DayFill>;
  dayLabels: string[];
  selectedDate?: string;
  todayDateString: string;
  defaultColor: Color;
  pageWidth: number;
  onDayPress: (dateString: string) => void;
}

const WeekRow = ({
  week,
  fills,
  dayLabels,
  selectedDate,
  todayDateString,
  defaultColor,
  pageWidth,
  onDayPress,
}: WeekRowProps) => {
  const containerStyle = useMemo(() => ({width: pageWidth}), [pageWidth]);

  return (
    <View style={[styles.container, containerStyle]}>
      {week.days.map((day, index) => {
        const fill = fills[day.dateString];

        return (
          <DayGauge
            key={day.dateString}
            dateString={day.dateString}
            dayNumber={day.dayNumber}
            dayLabel={dayLabels[index]}
            ratio={fill?.ratio}
            isFilled={fill?.filled === true}
            isSelected={day.dateString === selectedDate}
            isDisabled={fill?.disabled === true}
            isOutOfPeriod={day.isOutOfPeriod}
            isWeekEnd={day.isWeekEnd}
            isToday={day.dateString === todayDateString}
            color={fill?.color ?? defaultColor}
            onPress={onDayPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WEEK_ROW_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
});

export default memo(WeekRow);
