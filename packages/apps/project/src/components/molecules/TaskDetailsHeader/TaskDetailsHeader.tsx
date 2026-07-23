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
    state => state.project_projectTask,
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text writingType="title">{projectTask?.name}</Text>
          <LabelText
            iconName="pin-angle-fill"
            title={projectTask?.assignedTo?.fullName}
          />
          {!checkNullString(projectTask?.parentTask?.fullName) && (
            <LabelText
              iconName="diagram-3-fill"
              title={projectTask?.parentTask?.fullName}
            />
          )}
        </View>
        <View>
          {projectTask?.status != null && (
            <Badge
              title={projectTask?.status?.name}
              color={getItemColorFromIndex(
                projectTaskStatusList,
                projectTask?.status,
              )}
            />
          )}
          {projectTask?.priority != null && (
            <Badge
              title={projectTask?.priority?.name}
              color={getItemColorFromIndex(
                projectPriorityList,
                projectTask?.priority,
              )}
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
    marginHorizontal: 20,
    flexDirection: 'column',
    gap: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 2,
  },
});

export default TaskDetailsHeader;
