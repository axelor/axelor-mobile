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

import {useEffect, useMemo, useState} from 'react';
import {
  useDispatch,
  useSelector,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectTaskStatus,
  fetchProjectPriority,
} from '../features/projectTaskSlice';

export const useTaskFilters = (project: any) => {
  const dispatch = useDispatch();

  const {getCustomSelectionItems} = useTypeHelpers();

  const {projectTaskStatusList, projectPriorityList} = useSelector(
    (state: any) => state.project_projectTask,
  );
  const {userId} = useSelector((state: any) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectTaskStatus());
    dispatch(fetchProjectPriority());
  }, [dispatch]);

  const availableStatus = useMemo(() => {
    return project?.isShowStatus
      ? project?.projectTaskStatusSet?.map(status => status.id)
      : [];
  }, [project?.isShowStatus, project?.projectTaskStatusSet]);

  const availablePriorities = useMemo(() => {
    return project?.isShowPriority
      ? project?.projectTaskPrioritySet?.map(status => status.id)
      : [];
  }, [project?.isShowPriority, project?.projectTaskPrioritySet]);

  const sliceFunctionData = useMemo(() => {
    return {
      projectId: project?.id,
      isAssignedToMe: isAssignedToMe,
      selectedStatus: selectedStatus,
      selectedPriority: selectedPriority,
      statusToFilter: availableStatus,
      priorityToFilter: availablePriorities,
      userId: isAssignedToMe ? userId : null,
    };
  }, [
    project,
    isAssignedToMe,
    selectedStatus,
    selectedPriority,
    availableStatus,
    availablePriorities,
    userId,
  ]);

  const statusList = useMemo(() => {
    const _statusList = getCustomSelectionItems(
      projectTaskStatusList,
      'name',
      selectedStatus,
    );
    return availableStatus.length === 0
      ? _statusList
      : _statusList.filter(status => availableStatus.includes(status.value));
  }, [
    getCustomSelectionItems,
    projectTaskStatusList,
    selectedStatus,
    availableStatus,
  ]);

  const priorityList = useMemo(() => {
    const _priorityList = getCustomSelectionItems(
      projectPriorityList,
      'name',
      selectedPriority,
    );
    return availablePriorities.length === 0
      ? _priorityList
      : _priorityList.filter(status =>
          availablePriorities.includes(status.value),
        );
  }, [
    getCustomSelectionItems,
    projectPriorityList,
    selectedPriority,
    availablePriorities,
  ]);

  return {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    isAssignedToMe,
    setIsAssignedToMe,
    sliceFunctionData,
    statusList,
    priorityList,
  };
};
