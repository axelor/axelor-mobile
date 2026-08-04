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
import {searchTeamTasks} from '../features/teamTaskSlice';
import {TeamTaskActionCard, TeamTaskFilters} from '../components';
import {TeamTaskScope} from '../types';

const DEFAULT_SCOPE = TeamTaskScope.scope.AssignedToMe;

const TeamTaskListScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {
    loadingTeamTasks,
    moreLoadingTeamTask,
    isListEndTeamTask,
    teamTaskList,
  } = useSelector(state => state.team_teamTask);
  const {user} = useSelector(state => state.user);

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<any[]>([]);
  const [selectedScope, setSelectedScope] = useState<string>(DEFAULT_SCOPE);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const scopeList = useMemo(
    () => TeamTaskScope.getScopeList(Colors, I18n, DEFAULT_SCOPE),
    [Colors, I18n],
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
      selectedScope,
      userId: user?.id,
      refreshKey,
    }),
    [selectedPriority, selectedStatus, selectedScope, user?.id, refreshKey],
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
        <ChipSelect
          mode="switch"
          selectionItems={scopeList}
          onChangeValue={handleScopeChange}
          chipNumberOfLines={2}
        />
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

export default TeamTaskListScreen;
