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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useSelector,
  useDispatch,
  SearchListView,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {ProjectHeader, TaskCardIcon} from '../../molecules';
import {searchProjectTask} from '../../../features/projectTaskSlice';

const TaskView = () => {
  const dispatch = useDispatch();

  const {ProjectTask} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {project} = useSelector((state: any) => state.project_project);
  const {loading, moreLoading, isListEnd, projectTaskList} = useSelector(
    (state: any) => state.project_projectTask,
  );
  const {userId} = useSelector((state: any) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(false);

  const idsProjectTask = useMemo(() => {
    return project.projectTaskList?.map(projectTask => projectTask.id);
  }, [project.projectTaskList]);

  const sliceFunctionData = useMemo(() => {
    return {
      idsProjectTask: idsProjectTask,
      isAssignedToMe: isAssignedToMe,
      selectedStatus: selectedStatus,
      selectedPriority: selectedPriority,
      userId: isAssignedToMe ? userId : null,
    };
  }, [
    idsProjectTask,
    isAssignedToMe,
    selectedPriority,
    selectedStatus,
    userId,
  ]);

  useEffect(() => {
    dispatch((searchProjectTask as any)(sliceFunctionData));
  }, [dispatch, sliceFunctionData]);

  const statusList = useMemo(
    () => getSelectionItems(ProjectTask?.taskStatus, selectedStatus),
    [getSelectionItems, ProjectTask?.taskStatus, selectedStatus],
  );

  const priorityList = useMemo(
    () => getSelectionItems(ProjectTask?.priority, selectedPriority),
    [getSelectionItems, ProjectTask?.priority, selectedPriority],
  );

  return (
    <SearchListView
      headerTopChildren={<ProjectHeader project={project} />}
      headerChildren={
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
      }
      list={projectTaskList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={searchProjectTask}
      sliceFunctionData={sliceFunctionData}
      renderListItem={({item}) => (
        <TaskCardIcon
          name={item?.name}
          assignedTo={item?.assignedTo?.fullName}
          taskDeadline={item?.taskDeadline}
          parentTask={item?.parentTask?.fullName}
          progress={item?.progress}
          priority={item?.priority?.id}
          status={item?.status?.id}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
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

export default TaskView;
