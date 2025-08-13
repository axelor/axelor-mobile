/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {
  Agenda,
  AgendaEntry,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import {SwitchCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {useIsFocused} from '../../../hooks/use-navigation';
import {
  AgendaEvent,
  AgendaItem,
  createAgendaItems,
  createAgendaSchedule,
  DAYS,
  filterMarkedDates,
  mapEntryToItem,
  MONTHS,
  shouldRenderDetailsCard,
} from './agenda.helpers';
import MonthDisplay from './MonthDisplay';
import DayDisplay from './DayDisplay';
import AgendaItemDisplay from './AgendaItemDisplay';
import NavigationButton from './NavigationButton';

interface PlanningProps {
  numberMonthsAroundToday?: number;
  loading?: boolean;
  itemList?: AgendaEvent[];
  fetchbyMonth: (params: {date: Date; isAssigned?: boolean}) => void;
  renderItem?: (item: AgendaItem) => React.ReactNode;
  renderFullDayItem?: (item: AgendaItem) => React.ReactNode;
  changeWeekButton?: boolean;
  returnToDayButton?: boolean;
  manageAssignment?: boolean;
  computeAssignmentLocally?: boolean;
}

const PlanningView = ({
  numberMonthsAroundToday = 12,
  loading = false,
  itemList = [],
  fetchbyMonth,
  renderItem,
  renderFullDayItem,
  changeWeekButton = true,
  returnToDayButton = true,
  manageAssignment = false,
  computeAssignmentLocally = true,
}: PlanningProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const isFocused = useIsFocused();

  const {userId} = useSelector(state => state.auth);

  const [fetchDate, setFetchDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [assigned, setAssigned] = useState(true);

  const filterOnUserAssigned = useCallback(
    (list: any[]) => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else if (manageAssignment && computeAssignmentLocally) {
        return list.filter(item => !assigned || item?.data?.userId === userId);
      } else {
        return list;
      }
    },
    [assigned, computeAssignmentLocally, manageAssignment, userId],
  );

  useEffect(() => {
    LocaleConfig.locales = {
      default: {
        monthNames: MONTHS.map(_m => I18n.t(_m)),
        monthNamesShort: MONTHS.map(_m => I18n.t(_m)),
        dayNames: DAYS.map(_d => I18n.t(_d)),
        dayNamesShort: DAYS.map(_d => I18n.t(_d)),
        today: I18n.t('Base_Calendar_Today'),
      },
    };

    LocaleConfig.defaultLocale = 'default';
  }, [I18n]);

  const _agendaItems = useMemo(
    () => createAgendaItems(filterOnUserAssigned(itemList), I18n),
    [filterOnUserAssigned, itemList, I18n],
  );

  const agendaItems = useMemo(
    () => createAgendaSchedule(_agendaItems, numberMonthsAroundToday),
    [_agendaItems, numberMonthsAroundToday],
  );

  const styles = useMemo(() => getStyles(manageAssignment), [manageAssignment]);

  const markedDots = useMemo(
    () => filterMarkedDates(agendaItems),
    [agendaItems],
  );

  const renderDate = useCallback(
    (date: Date) => <DayDisplay date={date} />,
    [],
  );

  const renderEmptyDate = useCallback(
    () => <View style={styles.emptyDate} />,
    [styles.emptyDate],
  );

  const renderDayItem = (item: AgendaEntry, isFirst: boolean) => {
    const agendaItem: AgendaItem = mapEntryToItem(item, _agendaItems);

    if (agendaItem == null) return null;

    const {id, date, isNewMonth} = agendaItem;

    if (isNewMonth) {
      return <MonthDisplay key={id} date={date} isFirst={isFirst} />;
    }

    const _renderComponent = shouldRenderDetailsCard(agendaItem)
      ? renderItem
      : renderFullDayItem;

    return (
      <AgendaItemDisplay
        key={id}
        isFirst={isFirst}
        agendaItem={agendaItem}
        renderComponent={_renderComponent}
      />
    );
  };

  const handleLoadItemsForMonth = useCallback((date: DateData) => {
    setFetchDate(new Date(date.year, date.month, date.day));
  }, []);

  const loadItemsWithAPI = useCallback(() => {
    fetchbyMonth({date: fetchDate, isAssigned: assigned});
  }, [assigned, fetchDate, fetchbyMonth]);

  useEffect(() => {
    if (isFocused) loadItemsWithAPI();
  }, [isFocused, loadItemsWithAPI]);

  const todayBtnOnPress = useCallback(() => {
    setCurrentDate(new Date().toISOString());
  }, []);

  const nextWeekBtnOnPress = useCallback(() => {
    setCurrentDate(_current => {
      var firstDay = new Date(_current);
      var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

      return nextWeek.toISOString();
    });
  }, []);

  const lastWeekBtnOnPress = useCallback(() => {
    setCurrentDate(_current => {
      var firstDay = new Date(_current);
      var lastWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);

      return lastWeek.toISOString();
    });
  }, []);

  return (
    <View
      style={[
        styles.agendaContainer,
        {backgroundColor: Colors.backgroundColor},
      ]}>
      <View style={styles.headerPlanning}>
        {manageAssignment && (
          <SwitchCard
            title={I18n.t('Base_AssignedToMe')}
            style={styles.switchCard}
            defaultValue={assigned}
            onToggle={() => setAssigned(!assigned)}
          />
        )}
        <View style={styles.headerButton}>
          <NavigationButton
            visible={changeWeekButton}
            icon="arrow-left"
            onPress={lastWeekBtnOnPress}
          />
          <NavigationButton
            visible={returnToDayButton}
            icon="calendar-event"
            onPress={todayBtnOnPress}
          />
          <NavigationButton
            visible={changeWeekButton}
            icon="arrow-right"
            onPress={nextWeekBtnOnPress}
          />
        </View>
      </View>
      <Agenda
        onDayPress={date => setCurrentDate(date.dateString)}
        selected={currentDate}
        items={agendaItems}
        markedDates={markedDots}
        firstDay={1}
        loadItemsForMonth={handleLoadItemsForMonth}
        pastScrollRange={numberMonthsAroundToday}
        futureScrollRange={numberMonthsAroundToday}
        renderItem={renderDayItem}
        renderDay={renderDate}
        renderEmptyDate={renderEmptyDate}
        onRefresh={loadItemsWithAPI}
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

const getStyles = (manageAssignment: boolean) =>
  StyleSheet.create({
    agendaContainer: {
      height: '100%',
    },
    emptyDate: {
      flex: 1,
    },
    headerPlanning: {
      flexDirection: 'row',
      justifyContent: manageAssignment ? 'space-between' : 'flex-end',
      alignItems: 'center',
    },
    headerButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchCard: {
      width: '50%',
      marginLeft: 5,
    },
  });

export default PlanningView;
