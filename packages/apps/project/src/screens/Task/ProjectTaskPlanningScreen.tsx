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
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchPlannedProjectTasks} from '../../features/projectTaskSlice';
import {
  PlanningProjectTaskCard,
  ProjectPlanningFilters,
} from '../../components';

function ProjectTaskPlanningScreen() {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {planningList, loadingPlanning} = useSelector(
    state => state.project_projectTask,
  );

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredList = useMemo(() => {
    if (planningList == null || planningList.length === 0) return [];
    const withTime = (date: string, time: string): string =>
      date.includes('T') ? date : `${date}T${time}`;

    return planningList
      .filter((_t: any) => _t.taskDate != null)
      .map((_t: any) => ({
        id: _t.id,
        startDate: withTime(_t.taskDate, '00:00:00'),
        endDate: withTime(_t.taskEndDate ?? _t.taskDate, '23:59:59'),
        data: {
          id: _t.id,
          name: _t.name,
          projectName: _t.project?.name,
          assignedTo: _t.assignedTo?.fullName,
          status: _t.status,
        },
      }));
  }, [planningList]);

  const fetchItemsByMonth = useCallback(
    ({date, isAssigned}: any) => {
      dispatch(
        (fetchPlannedProjectTasks as any)({
          date,
          isAssigned,
          userId: user.id,
          projectId: selectedProject?.id,
        }),
      );
    },
    [dispatch, selectedProject?.id, user.id],
  );

  const renderItem = useCallback(({id, data: task}: any) => {
    if (task == null) return null;

    return (
      <PlanningProjectTaskCard
        key={id}
        name={task.name}
        projectName={task.projectName}
        assignedTo={task.assignedTo}
        status={task.status}
      />
    );
  }, []);

  const renderFullDayItem = useCallback(({id, data: task}: any) => {
    if (task == null) return null;

    return (
      <PlanningProjectTaskCard
        key={id}
        name={task.name}
        projectName={task.projectName}
      />
    );
  }, []);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ProjectPlanningFilters
            selectedProject={selectedProject}
            onChangeProject={setSelectedProject}
          />
        }
      />
      <PlanningView
        loading={loadingPlanning}
        itemList={filteredList}
        renderItem={renderItem}
        renderFullDayItem={renderFullDayItem}
        fetchbyMonth={fetchItemsByMonth}
        manageAssignment
        computeAssignmentLocally={false}
      />
    </Screen>
  );
}

export default ProjectTaskPlanningScreen;
