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

import React, {useMemo, useState} from 'react';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchTeamTasks} from '../features/teamTaskSlice';
import {TeamTaskCard, TeamTaskFilters} from '../components';

const TeamTaskListScreen = () => {
  const I18n = useTranslator();

  const {
    loadingTeamTasks,
    moreLoadingTeamTask,
    isListEndTeamTask,
    teamTaskList,
  } = useSelector(state => state.team_teamTask);

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<any[]>([]);

  const sliceFunctionData = useMemo(
    () => ({selectedStatus, selectedPriority}),
    [selectedPriority, selectedStatus],
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
      renderListItem={({item}) => <TeamTaskCard {...item} />}
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
