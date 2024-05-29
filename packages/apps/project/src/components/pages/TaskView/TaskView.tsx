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

import React, {useEffect, useMemo, useState} from 'react';
import {
  useSelector,
  useDispatch,
  SearchListView,
  useTypeHelpers,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ProjectHeader, TaskActionCard, TaskHeader} from '../../molecules';
import {
  searchProjectTask,
  fetchProjectTaskStatus,
  fetchProjectPriority,
} from '../../../features/projectTaskSlice';

const TaskView = () => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {getCustomSelectionItems} = useTypeHelpers();

  const {project} = useSelector((state: any) => state.project_project);
  const {
    loading,
    moreLoading,
    isListEnd,
    projectTaskList,
    projectTaskStatusList,
    projectPriorityList,
  } = useSelector((state: any) => state.project_projectTask);
  const {userId} = useSelector((state: any) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(false);

  const idsProjectTask = useMemo(() => {
    return project.projectTaskList?.map(projectTask => projectTask.id);
  }, [project.projectTaskList]);

  const statusToFilter = useMemo(() => {
    if (project?.isShowStatus) {
      return project?.projectTaskStatusSet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowStatus, project?.projectTaskStatusSet]);

  const priorityToFilter = useMemo(() => {
    if (project?.isShowPriority) {
      return project?.projectTaskPrioritySet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowPriority, project?.projectTaskPrioritySet]);

  const sliceFunctionData = useMemo(() => {
    return {
      idsProjectTask: idsProjectTask,
      isAssignedToMe: isAssignedToMe,
      selectedStatus: selectedStatus,
      selectedPriority: selectedPriority,
      statusToFilter: statusToFilter,
      priorityToFilter: priorityToFilter,
      userId: isAssignedToMe ? userId : null,
    };
  }, [
    idsProjectTask,
    isAssignedToMe,
    selectedPriority,
    selectedStatus,
    userId,
    statusToFilter,
    priorityToFilter,
  ]);

  useEffect(() => {
    dispatch((fetchProjectTaskStatus as any)());
    dispatch((fetchProjectPriority as any)());
  }, [dispatch]);

  const statusList = useMemo(() => {
    const _statusList = getCustomSelectionItems(
      projectTaskStatusList,
      'name',
      selectedStatus,
    );
    return statusToFilter.length === 0
      ? _statusList
      : _statusList.filter(status => statusToFilter.includes(status.value));
  }, [
    getCustomSelectionItems,
    projectTaskStatusList,
    selectedStatus,
    statusToFilter,
  ]);

  const priorityList = useMemo(() => {
    const _priorityList = getCustomSelectionItems(
      projectPriorityList,
      'name',
      selectedPriority,
    );
    return priorityToFilter.length === 0
      ? _priorityList
      : _priorityList.filter(status => priorityToFilter.includes(status.value));
  }, [
    getCustomSelectionItems,
    projectPriorityList,
    selectedPriority,
    priorityToFilter,
  ]);

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
