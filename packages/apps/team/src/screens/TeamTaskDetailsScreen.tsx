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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FormView,
  useDispatch,
  useNavigation,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchTeamTask, saveTeamTask} from '../features/teamTaskSlice';

const TeamTaskDetailsScreen = ({route}: any) => {
  const {taskId} = route?.params ?? {};
  const navigation = useNavigation();
  const {TeamTask} = useTypes();
  const _dispatch = useDispatch();

  const {teamTask} = useSelector(state => state.team_teamTask);

  const isEdition = useMemo(() => taskId != null, [taskId]);

  useEffect(() => {
    _dispatch(fetchTeamTask({id: taskId}));
  }, [_dispatch, taskId]);

  const defaultValue = useMemo(
    () =>
      isEdition && teamTask?.id === taskId
        ? teamTask
        : {
            priority: TeamTask?.priority.Normal,
            status: TeamTask?.status.New,
            taskDate: new Date().toISOString().split('T')[0],
          },
    [
      TeamTask?.priority.Normal,
      TeamTask?.status.New,
      isEdition,
      taskId,
      teamTask,
    ],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}: any) => {
      dispatch(saveTeamTask(objectState)).then(() => navigation.pop());
    },
    [navigation],
  );

  return (
    <FormView
      formKey="team_teamTask"
      defaultEditMode
      defaultValue={defaultValue}
      actions={[
        {
          key: 'create-task',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => isEdition,
          customAction: handleSaveAPI,
        },
        {
          key: 'update-task',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => !isEdition,
          customAction: handleSaveAPI,
        },
      ]}
    />
  );
};

export default TeamTaskDetailsScreen;
