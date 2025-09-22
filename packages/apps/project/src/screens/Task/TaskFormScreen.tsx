/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {
  useSelector,
  FormView,
  useDispatch,
  isEmpty,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  fetchCategoryFormById,
  saveProjectTask,
  updateTargetVersion,
} from '../../features/projectTaskSlice';

const TaskFormScreen = ({navigation, route}) => {
  const {isCreation} = route.params ?? {};
  const _dispatch = useDispatch();
  const {Project, ProjectTask} = useTypes();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);
  const {project} = useSelector((state: any) => state.project_project);

  useEffect(() => {
    _dispatch(
      updateTargetVersion(isCreation ? null : projectTask?.targetVersion),
    );
  }, [_dispatch, isCreation, projectTask?.targetVersion]);

  useEffect(() => {
    _dispatch(
      (fetchCategoryFormById as any)({
        categoryId: isCreation ? null : projectTask?.projectTaskCategory?.id,
      }),
    );
  }, [_dispatch, isCreation, projectTask?.projectTaskCategory]);

  const _defaultValue = useMemo(() => {
    if (!isCreation && !isEmpty(projectTask)) {
      return {
        ...projectTask,
      };
    } else {
      return null;
    }
  }, [isCreation, projectTask]);

  const creationDefaultValue = useMemo(
    () => ({
      project,
      projectReadonly: true,
      taskDate: new Date().toISOString().split('T')[0],
      progress: 0,
      typeSelect: ProjectTask?.typeSelect.Task,
      activeSprint:
        project?.sprintManagementSelect ===
        Project?.sprintManagementSelect.Project
          ? project?.backlogSprint
          : null,
    }),
    [
      project,
      ProjectTask?.typeSelect.Task,
      Project?.sprintManagementSelect.Project,
    ],
  );

  const saveTaskAPI = useCallback(
    (objectState, dispatch) => {
      dispatch((saveProjectTask as any)({projectTask: objectState}));
      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="project_task"
      defaultValue={_defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode={true}
      actions={[
        {
          key: 'update-project-task',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            saveTaskAPI(objectState, dispatch);
          },
          hideIf: () => isCreation,
        },
        {
          key: 'create-project-task',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            saveTaskAPI(objectState, dispatch);
          },
          hideIf: () => !isCreation,
        },
      ]}
    />
  );
};

export default TaskFormScreen;
