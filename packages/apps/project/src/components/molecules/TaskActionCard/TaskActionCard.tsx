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
import {StyleSheet, View} from 'react-native';
import {InfoButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {TaskCard} from '../../atoms';

interface TaskProps {
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
  displayParenProjet?: boolean;
}

const TaskActionCard = ({
  style,
  task,
  displayParenProjet = false,
}: TaskActionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={[styles.container, style]}>
      <TaskCard
        name={task.name}
        assignedTo={task.assignedTo?.fullName}
        taskDeadline={task.taskDeadline}
        parentTask={
          displayParenProjet ? task?.project?.name : task.parentTask?.name
        }
        progress={task.progress}
        priority={task.priority}
        status={task.status}
        style={styles.cardContainer}
      />
      <InfoButton
        indication={I18n.t('Project_LogTime')}
        iconName={'clock-history'}
        iconColor={Colors.secondaryColor_dark.background}
        onPress={() => {}}
        style={styles.infoButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '96%',
    flexDirection: 'row',
    marginVertical: 2,
  },
  cardContainer: {
    flex: 6,
  },
  infoButton: {
    flex: 1,
  },
});

export default TaskActionCard;
