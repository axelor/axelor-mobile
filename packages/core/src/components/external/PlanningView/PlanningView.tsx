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
import {
  AgendaView,
  SwitchCard,
  Text,
  toDateString,
} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {useIsFocused} from '../../../hooks/use-navigation';
import {
  AgendaEvent,
  AgendaItem,
  createAgendaItems,
  groupItemsByDate,
  shouldRenderDetailsCard,
} from './agenda.helpers';
import {StyleSheet} from 'react-native';

interface PlanningProps {
  numberMonthsAroundToday?: number;
  loading?: boolean;
  filters?: React.ReactNode;
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
  filters,
  itemList = [],
  fetchbyMonth,
  renderItem,
  renderFullDayItem,
  changeWeekButton = true,
  returnToDayButton = true,
  manageAssignment = false,
  computeAssignmentLocally = true,
}: PlanningProps) => {
  const I18n = useTranslator();
  const isFocused = useIsFocused();

  const {userId} = useSelector(state => state.auth);

  const [selectedDate, setSelectedDate] = useState(() =>
    toDateString(new Date()),
  );
  const [fetchMonthKey, setFetchMonthKey] = useState(() =>
    selectedDate.slice(0, 7),
  );
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

  const itemsByDate = useMemo(
    () =>
      groupItemsByDate(createAgendaItems(filterOnUserAssigned(itemList), I18n)),
    [filterOnUserAssigned, itemList, I18n],
  );

  const loadItemsWithAPI = useCallback(() => {
    fetchbyMonth({date: new Date(`${fetchMonthKey}-01`), isAssigned: assigned});
  }, [assigned, fetchMonthKey, fetchbyMonth]);

  useEffect(() => {
    if (isFocused) loadItemsWithAPI();
  }, [isFocused, loadItemsWithAPI]);

  const handleVisibleMonthChange = useCallback(
    (monthKey: string) => setFetchMonthKey(monthKey),
    [],
  );

  const renderAgendaItem = useCallback(
    (item: AgendaItem) => {
      const renderComponent = shouldRenderDetailsCard(item)
        ? renderItem
        : renderFullDayItem;

      return renderComponent?.(item) ?? <Text>{item.id}</Text>;
    },
    [renderItem, renderFullDayItem],
  );

  const getItemHours = useCallback(
    ({startHour, endHour, isFullDayEvent}: AgendaItem) =>
      isFullDayEvent ? {} : {startHour, endHour},
    [],
  );

  return (
    <AgendaView
      filters={filters}
      itemsByDate={itemsByDate}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      onVisibleMonthChange={handleVisibleMonthChange}
      renderItem={renderAgendaItem}
      getItemHours={getItemHours}
      monthsBefore={numberMonthsAroundToday}
      monthsAfter={numberMonthsAroundToday}
      showNavigation={changeWeekButton}
      showTodayButton={returnToDayButton}
      headerLeft={
        manageAssignment ? (
          <SwitchCard
            style={styles.switch}
            title={I18n.t('Base_AssignedToMe')}
            defaultValue={assigned}
            onToggle={() => setAssigned(!assigned)}
          />
        ) : undefined
      }
      refreshing={loading}
      onRefresh={loadItemsWithAPI}
      translator={I18n.t}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    width: '100%',
  },
});

export default PlanningView;
