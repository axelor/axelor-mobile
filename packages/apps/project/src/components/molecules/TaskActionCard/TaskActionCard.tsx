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
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {TaskCard} from '../../atoms';

interface TaskProps {
  id: number;
  name?: string;
  assignedTo?: any;
  taskDeadline?: string;
  parentTask?: any;
  progress?: number;
  priority?: any;
  status?: any;
  project?: any;
}

interface TaskActionCardProps {
  style?: any;
  task?: TaskProps;
  displayParentProjet?: boolean;
  onPress?: () => void;
}

const TaskActionCard = ({
  style,
  task,
  displayParentProjet = false,
  onPress,
}: TaskActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
  });

  return (
    <ActionCard
      style={style}
      actionList={[
        {
          iconName: 'clock-history',
          helper: I18n.t('Project_LogTime'),
          onPress: () =>
            navigation.popTo('TaskDetailsScreen', {
              projecTaskId: task.id,
              isTimeViewActive: true,
            }),
          hidden: !canCreate,
        },
      ]}
      translator={I18n.t}>
      <TaskCard
        onPress={onPress}
        name={task.name}
        assignedTo={task.assignedTo?.fullName}
        taskDeadline={task.taskDeadline}
        parentTask={
          displayParentProjet ? task?.project?.name : task.parentTask?.name
        }
        progress={task.progress}
        priority={task.priority}
        status={task.status}
      />
    </ActionCard>
  );
};

export default TaskActionCard;
