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

import React from 'react';
import {
  useSelector,
  SearchListView,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ProjectHeader, TaskActionCard, TaskHeader} from '../../molecules';
import {searchProjectTask} from '../../../features/projectTaskSlice';
import {useTaskFilters} from '../../../hooks/use-task-filter';

const TaskView = () => {
  const I18n = useTranslator();
  const {project} = useSelector((state: any) => state.project_project);
  const {loading, moreLoading, isListEnd, projectTaskList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const {
    setSelectedStatus,
    setSelectedPriority,
    isAssignedToMe,
    setIsAssignedToMe,
    sliceFunctionData,
    statusList,
    priorityList,
  } = useTaskFilters(project);

  return (
    <SearchListView
      headerTopChildren={<ProjectHeader />}
      headerChildren={
        <TaskHeader
          isAssignedToMe={isAssignedToMe}
          setIsAssignedToMe={setIsAssignedToMe}
          priorityList={priorityList}
          setSelectedPriority={setSelectedPriority}
          setSelectedStatus={setSelectedStatus}
          statusList={statusList}
        />
      }
      actionList={[
        {
          iconName: 'plus',
          title: I18n.t('Project_CreateNewTask'),
          onPress: () => {},
        },
      ]}
      list={projectTaskList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={searchProjectTask}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      renderListItem={({item}) => <TaskActionCard task={item} />}
    />
  );
};

export default TaskView;
