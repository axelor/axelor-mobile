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
import {Badge, ObjectCard, ProgressBar} from '@axelor/aos-mobile-ui';
import {
  DateDisplay,
  useTypeHelpers,
  useSelector,
} from '@axelor/aos-mobile-core';

interface TaskCardProps {
  style?: any;
  name?: string;
  assignedTo?: string;
  taskDeadline?: string;
  parentTask?: string;
  progress?: number;
  priority?: any;
  status?: any;
  onPress?: () => void;
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
  onPress,
}: TaskCardProps) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {projectTaskStatusList, projectPriorityList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const borderStyle = useMemo(() => {
    return (
      status != null &&
      getStyles(
        getItemColorFromIndex(projectTaskStatusList, status)?.background,
      )?.border
    );
  }, [status, getItemColorFromIndex, projectTaskStatusList]);

  return (
    <View style={style}>
      <ObjectCard
        onPress={onPress}
        style={[borderStyle, styles.card]}
        iconLeftMargin={30}
        leftContainerFlex={2}
        upperTexts={{
          items: [
            {displayText: name, isTitle: true},
            {
              indicatorText: assignedTo,
              hideIfNull: true,
              iconName: 'pin-angle-fill',
            },
            {
              indicatorText: parentTask,
              hideIfNull: true,
              iconName: 'diagram-3-fill',
              numberOfLines: 2,
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: <DateDisplay date={taskDeadline} size={16} />,
            },
            {
              customComponent: (
                <ProgressBar
                  style={styles.progressBar}
                  value={progress}
                  showPercent={false}
                  height={15}
                  styleTxt={styles.textProgressBar}
                />
              ),
            },
            priority != null && {
              customComponent: (
                <Badge
                  title={priority?.name}
                  color={getItemColorFromIndex(projectPriorityList, priority)}
                />
              ),
            },
          ],
        }}
      />
    </View>
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
  card: {
    margin: 0,
    marginVertical: 2,
    padding: 0,
    marginRight: 5,
    paddingRight: 5,
  },
  progressBar: {
    borderRadius: 20,
    marginVertical: 5,
  },
  textProgressBar: {
    display: 'none',
  },
});

export default TaskCard;
