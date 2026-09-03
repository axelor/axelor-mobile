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
import {getDayTitleKey} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import AgendaItemRow from './AgendaItemRow';
import {ItemHours} from './types';

interface AgendaDayRowProps {
  dateString: string;
  dayNumber: number;
  dayIndex: number;
  isToday: boolean;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  getItemHours?: (item: any) => ItemHours;
  translator: (key: string) => string;
}

const AgendaDayRow = ({
  dateString,
  dayNumber,
  dayIndex,
  isToday,
  items,
  renderItem,
  getItemHours,
  translator,
}: AgendaDayRowProps) => {
  const Colors = useThemeColor();

  const todayColor = useMemo(
    () => (isToday ? Colors.primaryColor.background : undefined),
    [Colors.primaryColor.background, isToday],
  );

  return (
    <View style={styles.container} testID={`agendaRow-${dateString}`}>
      <View style={styles.dayColumn}>
        <Text writingType="important" fontSize={20} textColor={todayColor}>
          {dayNumber}
        </Text>
        <Text textColor={todayColor}>
          {translator(getDayTitleKey(dayIndex))}
        </Text>
      </View>
      <View style={styles.itemColumn}>
        {items.map((item, index) => {
          const {startHour, endHour} = getItemHours?.(item) ?? {};

          return (
            <AgendaItemRow
              key={item?.id ?? index}
              startHour={startHour}
              endHour={endHour}
              isFirst={index === 0}>
              {renderItem(item)}
            </AgendaItemRow>
          );
        })}
      </View>
    </View>
  );
};

const DAY_COLUMN_WIDTH = 50;
const ROW_MIN_HEIGHT = 80;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: ROW_MIN_HEIGHT,
  },
  dayColumn: {
    width: DAY_COLUMN_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },
  itemColumn: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default memo(AgendaDayRow);
