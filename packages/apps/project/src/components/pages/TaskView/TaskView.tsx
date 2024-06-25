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

import React, {useMemo, useState} from 'react';
import {
  useSelector,
  SearchListView,
  useTranslator,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {ProjectHeader, TaskActionCard} from '../../molecules';
import {TaskFilters} from '../../templates';
import {searchProjectTask} from '../../../features/projectTaskSlice';

const TaskView = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {userId} = useSelector((state: any) => state.auth);
  const {project} = useSelector((state: any) => state.project_project);
  const {loading, moreLoading, isListEnd, projectTaskList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(false);

  const sliceFunctionData = useMemo(() => {
    return {
      projectId: project?.id,
      isAssignedToMe: isAssignedToMe,
      selectedStatus: selectedStatus,
      selectedPriority: selectedPriority,
      userId: isAssignedToMe ? userId : null,
    };
  }, [project?.id, isAssignedToMe, selectedStatus, selectedPriority, userId]);

  return (
    <SearchListView
      headerTopChildren={<ProjectHeader />}
      headerChildren={
        <TaskFilters
          isAssignedToMe={isAssignedToMe}
          setIsAssignedToMe={setIsAssignedToMe}
          setSelectedPriority={setSelectedPriority}
          setSelectedStatus={setSelectedStatus}
          project={project}
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
      renderListItem={({item}) => (
        <TaskActionCard
          task={item}
          onPress={() => {
            navigation.navigate('TaskDetailsScreen', {projecTaskId: item.id});
          }}
        />
      )}
    />
  );
};

export default TaskView;
