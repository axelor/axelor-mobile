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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Badge, ObjectCard, ProgressBar} from '@axelor/aos-mobile-ui';
import {DateDisplay} from '@axelor/aos-mobile-core';

interface TaskCardProps {
  style?: any;
  name?: string;
  assignedTo?: string;
  taskDeadline?: string;
  parentTask?: string;
  progress?: number;
  priority?: number;
  status?: number;
}

const TaskCard = ({
  style,
  name,
  assignedTo,
  taskDeadline,
  parentTask,
  progress,
  priority,
  status,
}: TaskCardProps) => {
  const {ProjectTask} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(getItemColor(ProjectTask?.taskStatus, status)?.background)
      ?.border;
  }, [getItemColor, ProjectTask?.taskStatus, status]);

  return (
    <ObjectCard
      style={[borderStyle, style]}
      leftContainerFlex={2}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {
            displayText: 'code',
            hideIfNull: true,
          },
          {
            indicatorText: assignedTo,
            hideIfNull: true,
            iconName: 'pin-angle-fill',
          },
          {
            indicatorText: parentTask,
            hideIfNull: true,
            iconName: 'diagram-3-fill',
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <View>
                <DateDisplay date={taskDeadline} />
                <ProgressBar
                  style={styles.progressBar}
                  value={progress}
                  showPercent={false}
                  height={15}
                  styleTxt={styles.textProgressBar}
                />
                <Badge
                  title={getItemTitle(ProjectTask?.priority, priority)}
                  color={getItemColor(ProjectTask?.priority, priority)}
                />
              </View>
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  progressBar: {
    borderRadius: 20,
    marginVertical: 5,
  },
  textProgressBar: {
    display: 'none',
  },
});

export default TaskCard;
