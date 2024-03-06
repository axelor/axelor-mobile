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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {filterChip} from '../../utils';
import {ProcessStatus, useLoaderListener} from '../../components';
import {ProcessHistoryCard} from '../components';
import {useTranslator} from '../../i18n';
import {ProcessHistory} from '../types';
import {isToday} from './process-history-list-screen-helper';

// TODO: add refresh method to the list
const ProcessHistoryListScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {processList} = useLoaderListener();

  const [filteredList, setFilteredList] = useState(processList);
  const [today, setToday] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const filterOnDate = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (today) {
          return list?.filter(
            item =>
              isToday(item?.startedDate) ||
              item?.status === ProcessStatus.PENDING,
          );
        } else {
          return list;
        }
      }
    },
    [today],
  );

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'status');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(filterOnDate(processList)));
  }, [filterOnDate, filterOnStatus, processList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ToggleSwitch
            leftTitle={I18n.t('User_ProcessHistory_Today')}
            rightTitle={I18n.t('User_ProcessHistory_All')}
            onSwitch={() => setToday(!today)}
          />
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('User_ProcessHistory_Status_Running'),
                color: ProcessHistory.getStatusColor(
                  ProcessStatus.RUNNING,
                  Colors,
                ),
                key: ProcessStatus.RUNNING,
              },
              {
                title: I18n.t('User_ProcessHistory_Status_Completed'),
                color: ProcessHistory.getStatusColor(
                  ProcessStatus.COMPLETED,
                  Colors,
                ),
                key: ProcessStatus.COMPLETED,
              },
              {
                title: I18n.t('User_ProcessHistory_Status_Failed'),
                color: ProcessHistory.getStatusColor(
                  ProcessStatus.FAILED,
                  Colors,
                ),
                key: ProcessStatus.FAILED,
              },
            ]}
          />
        }
        expandableFilter={false}
      />
      <ScrollList
        loadingList={false}
        data={filteredList}
        renderItem={({item}) => (
          <ProcessHistoryCard
            key={item.key}
            name={item.name}
            status={item.status}
            startedDate={item.startedDate}
            completedDate={item.completedDate}
            failedDate={item.failedDate}
            completed={item.completed}
            resolved={item.resolved}
            onSuccess={item.onSuccess}
            onError={item.onError}
            style={styles.item}
          />
        )}
        moreLoading={false}
        isListEnd={true}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ProcessHistoryListScreen;
