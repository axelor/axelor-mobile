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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectTaskStatus,
  fetchProjectPriority,
} from '../../../features/projectTaskSlice';

const TaskFilters = ({
  isAssignedToMe,
  setIsAssignedToMe,
  setSelectedStatus,
  setSelectedPriority,
}) => {
  const dispatch = useDispatch();
  const {getCustomSelectionItems} = useTypeHelpers();

  const {project} = useSelector((state: any) => state.project_project);
  const {projectTaskStatusList, projectPriorityList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const availableStatus = useMemo(() => {
    if (project?.isShowStatus) {
      return project?.projectTaskStatusSet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowStatus, project?.projectTaskStatusSet]);

  const availablePriorities = useMemo(() => {
    if (project?.isShowPriority) {
      return project?.projectTaskPrioritySet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowPriority, project?.projectTaskPrioritySet]);

  const statusList = useMemo(() => {
    const _statusList = getCustomSelectionItems(
      projectTaskStatusList,
      'name',
      [],
    );

    return availableStatus.length === 0
      ? _statusList
      : _statusList.filter(({value}) => availableStatus.includes(value));
  }, [getCustomSelectionItems, projectTaskStatusList, availableStatus]);

  const priorityList = useMemo(() => {
    const _priorityList = getCustomSelectionItems(
      projectPriorityList,
      'name',
      [],
    );

    return availablePriorities.length === 0
      ? _priorityList
      : _priorityList.filter(({value}) => availablePriorities.includes(value));
  }, [getCustomSelectionItems, projectPriorityList, availablePriorities]);

  useEffect(() => {
    dispatch((fetchProjectTaskStatus as any)());
    dispatch((fetchProjectPriority as any)());
  }, [dispatch]);

  return (
    <View style={styles.headerContainer}>
      <ToggleButton
        isActive={isAssignedToMe}
        onPress={() => setIsAssignedToMe(current => !current)}
        buttonConfig={{
          iconName: 'person-fill',
          width: '10%',
          style: styles.toggleButton,
        }}
      />
      <View style={styles.pickerContainer}>
        <MultiValuePicker
          style={styles.picker}
          listItems={statusList}
          onValueChange={setSelectedStatus}
        />
        <MultiValuePicker
          style={styles.picker}
          listItems={priorityList}
          onValueChange={setSelectedPriority}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    height: 40,
  },
  picker: {
    width: '46%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TaskFilters;
