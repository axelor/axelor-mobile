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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useSelector, FormView, useDispatch} from '@axelor/aos-mobile-core';
import {fetchProjectFormById} from '../features/projectSlice';
import {
  createProjectTask,
  updateProjectTask,
} from '../features/projectTaskSlice';

const TaskFormScreen = ({navigation, route}) => {
  const {isCreation} = route.params;
  const _dispatch = useDispatch();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);
  const {project} = useSelector((state: any) => state.project_project);

  useEffect(() => {
    if (isCreation) {
      _dispatch((fetchProjectFormById as any)({projectId: project?.id}));
    } else {
      _dispatch(
        (fetchProjectFormById as any)({projectId: projectTask?.project?.id}),
      );
    }
  }, [_dispatch, isCreation, project?.id, projectTask?.project]);

  const _defaultValue = useMemo(() => {
    if (isCreation) {
      return {
        project: project,
      };
    } else {
      return {
        ...projectTask,
      };
    }
  }, [isCreation, project, projectTask]);

  const updateTaskAPI = useCallback(
    (objectState, dispatch) => {
      dispatch((updateProjectTask as any)({projectTask: objectState}));
      navigation.pop();
    },
    [navigation],
  );

  const createTaskAPI = useCallback(
    (objectState, dispatch) => {
      dispatch((createProjectTask as any)({projectTask: objectState}));
      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="project_task"
      defaultValue={_defaultValue}
      actions={[
        {
          key: 'update-project-task',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            updateTaskAPI(objectState, dispatch);
          },
          hideIf: () => isCreation,
        },
        {
          key: 'create-project-task',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            createTaskAPI(objectState, dispatch);
          },
          hideIf: () => !isCreation,
        },
      ]}
    />
  );
};

export default TaskFormScreen;
