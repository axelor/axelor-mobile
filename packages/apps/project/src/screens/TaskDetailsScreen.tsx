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

import React, {useCallback, useEffect, useState} from 'react';
import {BottomBar, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getImputationMode} from '@axelor/aos-mobile-hr';
import {
  TaskCustomFieldsView,
  TaskDetailsHeader,
  TaskGeneralInformationView,
  TaskLinkView,
  TimeView,
} from '../components';
import {fetchProjectTaskById} from '../features/projectTaskSlice';

const TaskDetailsScreen = ({navigation, route}) => {
  const {projecTaskId, isTimeViewActive} = route?.params;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [manageActiveItem, setManageActiveItem] = useState(isTimeViewActive);

  const {projectTask} = useSelector((state: any) => state.project_projectTask);
  const {user} = useSelector((state: any) => state.user);

  const fetchProjectTask = useCallback(() => {
    dispatch((fetchProjectTaskById as any)({projecTaskId}));
  }, [dispatch, projecTaskId]);

  const bottomBarItems = [
    {
      iconName: 'house',
      viewComponent: (
        <TaskGeneralInformationView handleRefresh={fetchProjectTask} />
      ),
      onPress: () => setManageActiveItem(false),
    },
    {
      iconName: 'layout-text-window-reverse',
      viewComponent: <TaskCustomFieldsView />,
      color: Colors.plannedColor,
      disabled: projectTask?.project?.customFieldManagementSelect == null,
      onPress: () => setManageActiveItem(false),
    },
    {
      iconName: 'diagram-3-fill',
      viewComponent: <TaskLinkView />,
      color: Colors.infoColor,
      onPress: () => setManageActiveItem(false),
    },
    {
      iconName: 'pencil-square',
      color: Colors.progressColor,
      onPress: () => navigation.navigate('TaskFormScreen'),
    },
    {
      iconName: 'clock-history',
      color: Colors.primaryColor,
      hidden:
        !projectTask?.project?.manageTimeSpent ||
        user.employee?.timesheetImputationSelect ===
          getImputationMode()?.ManufOrder,
      viewComponent: (
        <TimeView
          project={projectTask?.project}
          projectTask={projectTask}
          headerComponent={<TaskDetailsHeader />}
        />
      ),
      isActive: isTimeViewActive,
    },
  ];

  useEffect(() => {
    fetchProjectTask();
  }, [fetchProjectTask]);

  if (projecTaskId !== projectTask?.id) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} updateActiveItem={manageActiveItem} />
    </Screen>
  );
};

export default TaskDetailsScreen;
