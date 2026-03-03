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
import {StyleSheet, View} from 'react-native';
import {useSelector, useTypeHelpers} from '@axelor/aos-mobile-core';
import {
  Badge,
  LabelText,
  ProgressBar,
  Text,
  checkNullString,
} from '@axelor/aos-mobile-ui';

const TaskDetailsHeader = ({}) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {projectTask, projectTaskStatusList, projectPriorityList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text writingType="title">{projectTask?.name}</Text>
          <LabelText
            iconName="pin-angle-fill"
            size={16}
            title={projectTask?.assignedTo?.fullName}
            textStyle={styles.labelText}
          />
          {!checkNullString(projectTask?.parentTask?.fullName) && (
            <LabelText
              iconName="diagram-3-fill"
              size={16}
              title={projectTask?.parentTask?.fullName}
              textStyle={styles.labelText}
            />
          )}
        </View>
        <View style={[styles.columnContainer, styles.alignEnd]}>
          {projectTask?.status != null && (
            <Badge
              title={projectTask?.status?.name}
              color={getItemColorFromIndex(
                projectTaskStatusList,
                projectTask?.status,
              )}
              style={styles.badge}
            />
          )}
          {projectTask?.priority != null && (
            <Badge
              title={projectTask?.priority?.name}
              color={getItemColorFromIndex(
                projectPriorityList,
                projectTask?.priority,
              )}
              style={styles.badge}
            />
          )}
        </View>
      </View>
      <ProgressBar value={projectTask.progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexDirection: 'column',
    marginBottom: 3,
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 16,
    marginBottom: 3,
  },
  badge: {
    marginTop: 3,
  },
});

export default TaskDetailsHeader;
