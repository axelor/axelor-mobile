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

import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getDayTitleKey} from '../../../../utils';
import {useThemeColor} from '../../../../theme';
import {Text} from '../../../atoms';
import {GANTT_SCALE_DETAIL_HEIGHT} from '../gantt-view.styles';
import {GanttDay} from '../types';

interface GanttScaleDayRowProps {
  days: GanttDay[];
  dayWidth: number;
  todayDateString: string;
  translator: (key: string) => string;
}

const GanttScaleDayRow = ({
  days,
  dayWidth,
  todayDateString,
  translator,
}: GanttScaleDayRowProps) => {
  const Colors = useThemeColor();

  return (
    <View
      style={[
        styles.row,
        {borderBottomColor: Colors.secondaryColor_dark.background_light},
      ]}>
      {days.map(day => {
        const isToday = day.dateString === todayDateString;

        return (
          <View
            key={day.dateString}
            style={[
              styles.cell,
              {width: dayWidth},
              day.isWeekEnd && {
                backgroundColor: Colors.secondaryColor.background_light,
              },
              isToday && {
                backgroundColor: Colors.primaryColor.background_light,
              },
            ]}>
            <Text
              numberOfLines={1}
              fontSize={8}
              textColor={
                isToday
                  ? Colors.primaryColor.background
                  : Colors.placeholderTextColor
              }>
              {translator(getDayTitleKey(day.dayOfWeek))}
            </Text>
            <Text
              numberOfLines={1}
              fontSize={10}
              textColor={isToday ? Colors.primaryColor.background : undefined}
              writingType={isToday ? 'important' : undefined}>
              {day.dayNumber}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: GANTT_SCALE_DETAIL_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(GanttScaleDayRow);
