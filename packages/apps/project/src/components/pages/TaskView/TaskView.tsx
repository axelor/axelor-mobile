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

import React, {useEffect, useMemo} from 'react';
import {
  useSelector,
  useDispatch,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {ProjectHeader, TaskCardIcon} from '../../molecules';
import {searchProjectTask} from '../../../features/projectTaskSlice';

const TaskView = () => {
  const dispatch = useDispatch();

  const {project} = useSelector((state: any) => state.project_project);

  const {loading, moreLoading, isListEnd, projectTaskList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const idsProjectTask = useMemo(() => {
    return project.projectTaskList?.map(projectTask => projectTask.id);
  }, [project.projectTaskList]);

  const sliceFunctionData = useMemo(() => {
    return {
      idsProjectTask: idsProjectTask,
    };
  }, [idsProjectTask]);

  useEffect(() => {
    dispatch((searchProjectTask as any)(sliceFunctionData));
  }, [dispatch, sliceFunctionData]);

  return (
    <SearchListView
      headerTopChildren={<ProjectHeader project={project} />}
      list={projectTaskList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={searchProjectTask}
      sliceFunctionData={sliceFunctionData}
      renderListItem={({item}) => (
        <TaskCardIcon
          name={item?.name}
          assignedTo={item?.assignedTo?.fullName}
          taskDeadline={item?.taskDeadline}
          parentTask={item?.parentTask?.fullName}
          progress={item?.progress}
        />
      )}
    />
  );
};

export default TaskView;
