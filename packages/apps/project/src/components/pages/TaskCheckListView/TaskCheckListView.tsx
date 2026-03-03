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

import React from 'react';
import {useSelector} from '@axelor/aos-mobile-core';
import {CheckListView} from '../../templates';
import {TaskDetailsHeader} from '../../molecules';

interface TaskCheckListViewProps {}

const TaskCheckListView = ({}: TaskCheckListViewProps) => {
  const {projectTask} = useSelector(state => state.project_projectTask);

  return (
    <CheckListView
      headerTopChildren={<TaskDetailsHeader />}
      parentKey="projectTask"
      parentId={projectTask.id}
    />
  );
};

export default TaskCheckListView;
