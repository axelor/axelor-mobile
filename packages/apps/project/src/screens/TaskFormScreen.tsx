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
import {updateProject} from '../features/projectSlice';
import {updateProjectTask} from '../features/projectTaskSlice';

const TaskFormScreen = ({}) => {
  const _dispatch = useDispatch();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  useEffect(() => {
    _dispatch(updateProject(projectTask?.project));
  }, [_dispatch, projectTask?.project]);

  const _defaultValue = useMemo(() => {
    return {
      ...projectTask,
    };
  }, [projectTask]);

  const updateTaskAPI = useCallback((objectState, dispatch) => {
    dispatch((updateProjectTask as any)({project: objectState}));
  }, []);

  return (
    <FormView
      formKey="project_task"
      defaultValue={_defaultValue}
      actions={[
        {
          key: 'update-prospect',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            updateTaskAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default TaskFormScreen;
