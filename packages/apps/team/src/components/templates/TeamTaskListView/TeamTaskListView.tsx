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

import React, {useCallback, useMemo, useState} from 'react';
import {ChipSelect, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {TeamTaskScope, TeamTaskScopeConfig} from '../../../types';
import {searchTeamTasks} from '../../../features/teamTaskSlice';
import {TeamTaskActionCard} from '../../molecules';
import {TeamTaskFilters} from '../../templates';

const NO_SCOPE: TeamTaskScopeConfig[] = [];

interface TeamTaskListViewProps {
  scopeList?: TeamTaskScopeConfig[];
}

const TeamTaskListView = ({scopeList = NO_SCOPE}: TeamTaskListViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {
    loadingTeamTasks,
    moreLoadingTeamTask,
    isListEndTeamTask,
    teamTaskList,
  } = useSelector(state => state.team_teamTask);
  const {user} = useSelector(state => state.user);

  const defaultScope = useMemo(
    () => TeamTaskScope.getDefaultScope(scopeList),
    [scopeList],
  );

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<any[]>([]);
  const [selectedScope, setSelectedScope] = useState<string | undefined>(
    defaultScope?.key,
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const selectionItems = useMemo(
    () =>
      scopeList.map(({key, title, color}) => ({
        key,
        title: I18n.t(title),
        color: color ?? Colors.primaryColor,
        isActive: key === defaultScope?.key,
      })),
    [scopeList, defaultScope, Colors, I18n],
  );

  const scopeFilter = useMemo(
    () =>
      TeamTaskScope.getScopeFilter(scopeList, selectedScope, {
        userId: user?.id,
      }),
    [scopeList, selectedScope, user?.id],
  );

  const handleScopeChange = useCallback((items: any[]) => {
    setSelectedScope(items?.[0]?.key);
  }, []);

  const handleRefresh = useCallback(
    () => setRefreshKey(_current => _current + 1),
    [],
  );

  const sliceFunctionData = useMemo(
    () => ({
      selectedStatus,
      selectedPriority,
      scopeFilter,
      refreshKey,
    }),
    [selectedPriority, selectedStatus, scopeFilter, refreshKey],
  );

  return (
    <SearchListView
      loading={loadingTeamTasks}
      moreLoading={moreLoadingTeamTask}
      isListEnd={isListEndTeamTask}
      list={teamTaskList}
      sliceFunction={searchTeamTasks}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      renderListItem={({item}) => (
        <TeamTaskActionCard task={item} onRefresh={handleRefresh} />
      )}
      chipComponent={
        selectionItems.length > 0 ? (
          <ChipSelect
            mode="switch"
            selectionItems={selectionItems}
            onChangeValue={handleScopeChange}
            chipNumberOfLines={2}
          />
        ) : null
      }
      headerChildren={
        <TeamTaskFilters
          setSelectedPriority={setSelectedPriority}
          setSelectedStatus={setSelectedStatus}
        />
      }
    />
  );
};

export default TeamTaskListView;
