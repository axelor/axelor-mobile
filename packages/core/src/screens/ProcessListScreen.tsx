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

import React, {useCallback, useEffect, useState} from 'react';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {filterChip, isToday} from '../utils';
import {useTranslator} from '../i18n';
import {
  getProcessStatusColor,
  ProcessCard,
  processProvider,
  ProcessStatus,
  useLoaderListener,
} from '../loader';

const ProcessListScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {processList} = useLoaderListener();

  const [filteredList, setFilteredList] = useState(processList);
  const [isTodayProcess, setIsTodayProcess] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const filterOnDate = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        let _list = list;

        if (isTodayProcess) {
          _list = list?.filter(
            item =>
              isToday(item.startedDate) ||
              item.status === ProcessStatus.InProgress,
          );
        }

        return _list.sort(
          (a, b) =>
            new Date(b.startedDate).getTime() -
            new Date(a.startedDate).getTime(),
        );
      }
    },
    [isTodayProcess],
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

  useEffect(() => {
    processProvider.setNumberUnreadProcess(0);
  }, []);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ToggleSwitch
            leftTitle={I18n.t('Base_Loader_Today')}
            rightTitle={I18n.t('Base_All')}
            onSwitch={() => setIsTodayProcess(!isTodayProcess)}
          />
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={[
              {
                title: I18n.t('Base_Loader_Status_InProgress'),
                color: getProcessStatusColor(ProcessStatus.InProgress, Colors),
                key: ProcessStatus.InProgress,
              },
              {
                title: I18n.t('Base_Loader_Status_Success'),
                color: getProcessStatusColor(ProcessStatus.Success, Colors),
                key: ProcessStatus.Success,
              },
              {
                title: I18n.t('Base_Loader_Status_Failed'),
                color: getProcessStatusColor(ProcessStatus.Failed, Colors),
                key: ProcessStatus.Failed,
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
          <ProcessCard
            processKey={item.key}
            name={item.name}
            status={item.status}
            executed={item.executed}
            startedDate={item.startedDate}
            endDate={item.endDate}
            onSuccess={item.onSuccess}
            onError={item.onError}
          />
        )}
        fetchData={() => {}}
        moreLoading={false}
        isListEnd={true}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ProcessListScreen;
