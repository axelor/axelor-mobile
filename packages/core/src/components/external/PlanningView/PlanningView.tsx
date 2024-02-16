/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  CircleButton,
  HorizontalRule,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Agenda, AgendaEntry, DateData} from 'react-native-calendars';
import {
  AgendaEvent,
  AgendaItem,
  createAgendaItems,
  createAgendaSchedule,
  getShortName,
  isToday,
  mapEntryToItem,
  shouldRenderDetailsCard,
} from './agenda.helpers';
import {useTranslator} from '../../../i18n';

interface PlanningProps {
  numberMonthsAroundToday?: number;
  loading?: boolean;
  fetchbyMonth: (param: any) => void;
  renderItem?: (item: AgendaItem) => React.ReactNode;
  renderFullDayItem?: (item: AgendaItem) => React.ReactNode;
  itemList?: AgendaEvent[];
  changeWeekButton: boolean;
  returnToDayButton: boolean;
}

const PlanningView = ({
  numberMonthsAroundToday = 12,
  renderItem,
  renderFullDayItem,
  fetchbyMonth,
  loading = false,
  itemList = [],
  changeWeekButton = true,
  returnToDayButton = true,
}: PlanningProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const _agendaItems = useMemo(
    () => createAgendaItems(itemList, I18n),
    [itemList, I18n],
  );

  const agendaItems = useMemo(
    () => createAgendaSchedule(_agendaItems, numberMonthsAroundToday),
    [_agendaItems, numberMonthsAroundToday],
  );

  const [fetchDate, setFetchDate] = useState<any>();

  const [currentDate, setCurrentDate] = useState(new Date().toISOString());

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
    const agendaItem: AgendaItem = mapEntryToItem(item, _agendaItems);

    if (agendaItem == null) {
      return null;
    }

    const {id, startHour, endHour, isFullDayEvent} = agendaItem;

    const _renderComponent = shouldRenderDetailsCard(agendaItem)
      ? renderItem
      : renderFullDayItem;

    if (_renderComponent == null) {
      return (
        <View style={[styles.dayItem, isFirst ? {} : null]}>
          <Text>{id}</Text>
        </View>
      );
    }

    return (
      <View key={id}>
        {isFirst ? <HorizontalRule style={styles.horizontalRule} /> : null}
        <View
          style={
            isFirst ? styles.firstItemContainer : styles.containerListItem
          }>
          <View style={styles.containerTime}>
            {!isFullDayEvent && (
              <>
                <Text style={styles.centerText}>{startHour}</Text>
                <Text style={styles.centerText}>{endHour}</Text>
              </>
            )}
          </View>
          <View style={styles.renderContainer}>
            {_renderComponent(agendaItem)}
          </View>
        </View>
      </View>
    );
  };

  const handleLoadItemsForMonth = useCallback(
    (date: DateData) => {
      const _date = new Date(date.year, date.month, date.day);

      setFetchDate(_date);
      fetchbyMonth(_date);
    },
    [fetchbyMonth],
  );

  const todayBtnOnPress = () => {
    setCurrentDate(new Date().toISOString());
  };
  const nextWeekBtnOnPress = () => {
    var firstDay = new Date(currentDate);
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    setCurrentDate(nextWeek.toISOString());
  };

  const lastWeekBtnOnPress = () => {
    var firstDay = new Date(currentDate);
    var lastWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    setCurrentDate(lastWeek.toISOString());
  };

  return (
    <View style={styles.agendaContainer}>
      <View style={styles.headerPlanning}>
        {changeWeekButton && (
          <CircleButton
            style={styles.circleButton}
            iconName="arrow-left"
            onPress={lastWeekBtnOnPress}
            size={30}
          />
        )}
        {returnToDayButton && (
          <CircleButton
            style={styles.circleButton}
            iconName="calendar-day"
            onPress={todayBtnOnPress}
            size={30}
          />
        )}
        {changeWeekButton && (
          <CircleButton
            style={styles.circleButton}
            iconName="arrow-right"
            onPress={nextWeekBtnOnPress}
            size={30}
          />
        )}
      </View>
      <Agenda
        onDayPress={date => setCurrentDate(date.dateString)}
        selected={currentDate}
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
          backgroundColor: Colors.screenBackgroundColor,
          dotColor: Colors.primaryColor.background,
          selectedDotColor: Colors.text,
          agendaDayTextColor: Colors.text,
          agendaDayNumColor: Colors.text,
          agendaTodayColor: Colors.primaryColor.background_light,
          agendaKnobColor: Colors.secondaryColor.background,
          todayBackgroundColor: Colors.secondaryColor.background_light,
        }}
        current={currentDate}
        key={currentDate}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    agendaContainer: {
      height: '100%',
      backgroundColor: Colors.backgroundColor,
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
    dayItem: {
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
      color: Colors.primaryColor.background,
    },
    containerTime: {
      flexDirection: 'column',
      width: '15%',
    },
    containerListItem: {
      flexDirection: 'row',
      marginTop: 15,
      width: '100%',
    },
    firstItemContainer: {
      flexDirection: 'row',
      marginTop: '5%',
    },
    renderContainer: {
      alignSelf: 'flex-end',
      marginLeft: 5,
      width: '80%',
    },
    centerText: {
      textAlign: 'center',
    },
    horizontalRule: {
      marginTop: 10,
      width: '60%',
      alignSelf: 'center',
    },
    circleButton: {
      marginHorizontal: 5,
      marginTop: 5,
      width: 50 + 50 * (1 / 3),
    },
    headerPlanning: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-end',
      alignSelf: 'flex-end',
    },
  });

export default PlanningView;
