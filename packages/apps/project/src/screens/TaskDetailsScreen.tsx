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

import React, {useEffect} from 'react';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  CustomFieldForm,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {fetchProjectTaskById} from '../features/projectTaskSlice';
import {ProjectSimpleCard, TaskButton, TaskDetailsHeader} from '../components';
import ProjectTaskDropdownCards from '../components/organisms/ProjectTaskDropdownCards/ProjectTaskDropdownCards';
import {fetchProjectStatus} from '../features/projectSlice';

const TaskDetailsScreen = ({navigation, route}) => {
  const projecTaskId = route?.params?.projecTaskId;

  const dispatch = useDispatch();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  useEffect(() => {
    dispatch((fetchProjectTaskById as any)({projecTaskId}));
    dispatch(fetchProjectStatus());
  }, [projecTaskId, dispatch]);

  return (
    <Screen removeSpaceOnTop={true} fixedItems={<TaskButton />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <ProjectSimpleCard
        code={projectTask?.project?.code}
        name={projectTask?.project?.name}
        projectStatus={projectTask?.project?.projectStatus}
        onPress={() => {
          navigation.navigate('ProjectDetailsScreen', {
            projectId: projectTask?.project?.id,
          });
        }}
      />
      <ProjectTaskDropdownCards />
      <CustomFieldForm
        model="com.axelor.apps.project.db.ProjectTask"
        fieldType="attrs"
        modelId={projectTask.id}
      />
    </Screen>
  );
};

export default TaskDetailsScreen;
