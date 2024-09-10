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

import React from 'react';
import {BottomBar, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector} from '@axelor/aos-mobile-core';
import {CustomFieldFormView, TaskGeneralInformationView} from '../components';

const TaskDetailsScreen = ({route}) => {
  const projecTaskId = route?.params?.projecTaskId;
  const Colors = useThemeColor();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const bottomBarItems = [
    {
      iconName: 'house',
      viewComponent: <TaskGeneralInformationView projecTaskId={projecTaskId} />,
    },
    {
      iconName: 'layout-text-window-reverse',
      viewComponent: (
        <CustomFieldFormView
          projecTaskId={projecTaskId}
          config={projectTask?.project?.customFieldManagementSelect}
        />
      ),
      color: Colors.plannedColor,
      disabled: projectTask?.project?.customFieldManagementSelect == null,
    },
  ];

  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

export default TaskDetailsScreen;
