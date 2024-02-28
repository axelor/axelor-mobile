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
import {ProcessStatus, processProvider} from '../../components';
import {ProcessHistoryCard} from '../components';
import {useTranslator} from '../../i18n';
import {ProcessHistory} from '../types';

const ProcessHistoryListScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const [tabSwitch, setTabSwitch] = useState(false);

  const processList = processProvider.processList;

  const [filteredList, setFilteredList] = useState(processList);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'status');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(processList));
  }, [filterOnStatus, processList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ToggleSwitch
            leftTitle={I18n.t('User_ProcessHistory_Today')}
            rightTitle={I18n.t('User_ProcessHistory_All')}
            onSwitch={() => setTabSwitch(!tabSwitch)}
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
            name={item.name}
            status={item.status}
            startedDate={item.startedDate}
            finishedDate={item.finishedDate}
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
