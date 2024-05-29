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

interface TaskActionCardProps {
  style?: any;
  name?: string;
  assignedTo?: string;
  taskDeadline?: string;
  parentTask?: string;
  progress?: number;
  priority?: any;
  status?: any;
}

const TaskActionCard = ({
  style,
  name,
  assignedTo,
  taskDeadline,
  parentTask,
  progress,
  priority,
  status,
}: TaskActionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.cardContainer}>
        <TaskCard
          name={name}
          assignedTo={assignedTo}
          taskDeadline={taskDeadline}
          parentTask={parentTask}
          progress={progress}
          priority={priority}
          status={status}
        />
      </View>
      <View style={styles.iconContainer}>
        <InfoButton
          indication={I18n.t('Project_LogTime')}
          iconName={'clock-history'}
          iconColor={Colors.secondaryColor_dark.background}
          onPress={() => {}}
          style={styles.infoButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    marginVertical: 2,
  },
  cardContainer: {
    flex: 6,
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  infoButton: {
    flex: 1,
  },
});

export default TaskActionCard;
