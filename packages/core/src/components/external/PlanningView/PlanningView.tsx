/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {Agenda, AgendaEntry, DateData} from 'react-native-calendars';
import {
  AgendaItem,
  createAgendaSchedule,
  getShortName,
  isToday,
  mapEntryToItem,
} from './agenda.helpers';

interface PlanningProps {
  numberMonthsAroundToday?: number;
  loading?: boolean;
  fetchbyMonth: (param: any) => void;
  renderItem?: (
    item: AgendaItem,
    isFirst: boolean,
  ) => React.Component | JSX.Element;
  itemList?: AgendaItem[];
}

const PlanningView = ({
  numberMonthsAroundToday = 12,
  renderItem,
  fetchbyMonth,
  loading = false,
  itemList = [],
}: PlanningProps) => {
  const Colors = useThemeColor();
  const agendaItems = useMemo(
    () => createAgendaSchedule(itemList, numberMonthsAroundToday),
    [itemList, numberMonthsAroundToday],
  );
  const [fetchDate, setFetchDate] = useState<any>();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const renderDate = date => {
    const today = date && isToday(date) ? styles.today : undefined;

    if (date) {
      return (
        <View style={styles.day}>
          <Text style={[styles.dayNum, today]}>{date.getDate()}</Text>
          <Text style={[styles.dayText, today]}>
            {getShortName(date, 'en')}
          </Text>
        </View>
      );
    } else {
      return <View style={styles.day} />;
    }
  };

  const renderEmptyDate = () => {
    return <View style={styles.emptyDate} />;
  };

  const renderDayItem = (item: AgendaEntry, isFirst: boolean) => {
    const agendaItem = mapEntryToItem(item, itemList);
    if (agendaItem) {
      if (renderItem) {
        return renderItem(agendaItem, isFirst);
      }
      return (
        <View style={[styles.dayItem, isFirst ? {} : null]}>
          <Text>{agendaItem.name}</Text>
        </View>
      );
    }
  };

  const handleLoadItemsForMonth = useCallback(
    (date: DateData) => {
      const _date = new Date(date.year, date.month, date.day);

      setFetchDate(_date);
      fetchbyMonth(_date);
    },
    [fetchbyMonth],
  );

  return (
    <View style={styles.agendaContainer}>
      <Agenda
        items={agendaItems}
        loadItemsForMonth={handleLoadItemsForMonth}
        pastScrollRange={numberMonthsAroundToday}
        futureScrollRange={numberMonthsAroundToday}
        renderItem={renderDayItem}
        renderDay={renderDate}
        renderEmptyDate={renderEmptyDate}
        onRefresh={() => fetchbyMonth(fetchDate)}
        refreshing={loading}
        theme={{
          todayTextColor: Colors.text,
          calendarBackground: Colors.backgroundColor,
          indicatorColor: Colors.primaryColor.background,
          textSectionTitleColor: Colors.placeholderTextColor,
          dayTextColor: Colors.text,
          selectedDayTextColor: Colors.text,
          monthTextColor: Colors.text,
          selectedDayBackgroundColor: Colors.primaryColor.background_light,
          backgroundColor: Colors.backgroundColor,
          dotColor: Colors.primaryColor.background,
          selectedDotColor: Colors.text,
          agendaDayTextColor: Colors.text,
          agendaDayNumColor: Colors.text,
          agendaTodayColor: Colors.primaryColor.background_light,
          agendaKnobColor: Colors.secondaryColor.background,
          todayBackgroundColor: Colors.secondaryColor.background_light,
        }}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    agendaContainer: {
      height: '100%',
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
    dayItem: {
      backgroundColor: 'red',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    dayNum: {
      fontSize: 28,
      fontWeight: '200',
      color: Colors.text,
    },
    dayText: {
      fontSize: 14,
      color: Colors.text,
      backgroundColor: Colors.background,
      marginTop: -5,
    },
    day: {
      width: 63,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 32,
    },
    today: {
      color: Colors.primaryColor,
    },
  });

export default PlanningView;
