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
import {MultiValuePicker, Screen, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ProjectSearchBar, TaskActionCard} from '../components';
import {
  fetchProjectPriority,
  fetchProjectTaskStatus,
  searchProjectTask,
} from '../features/projectTaskSlice';

const TaskListScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {getCustomSelectionItems} = useTypeHelpers();

  const {
    loading,
    moreLoading,
    isListEnd,
    projectTaskList,
    projectTaskStatusList,
    projectPriorityList,
  } = useSelector((state: any) => state.project_projectTask);
  const {userId} = useSelector((state: any) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(true);
  const [project, setProject] = useState(null);

  const statusToFilter = useMemo(() => {
    if (project?.isShowStatus) {
      return project?.projectTaskStatusSet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowStatus, project?.projectTaskStatusSet]);

  const priorityToFilter = useMemo(() => {
    if (project?.isShowPriority) {
      return project?.projectTaskPrioritySet?.map(status => status.id);
    } else {
      return [];
    }
  }, [project?.isShowPriority, project?.projectTaskPrioritySet]);

  const idsProjectTask = useMemo(() => {
    return project?.projectTaskList?.map(projectTask => projectTask.id);
  }, [project?.projectTaskList]);

  const sliceFunctionData = useMemo(() => {
    return {
      idsProjectTask: idsProjectTask,
      isAssignedToMe: isAssignedToMe,
      selectedStatus: selectedStatus,
      selectedPriority: selectedPriority,
      statusToFilter: statusToFilter,
      priorityToFilter: priorityToFilter,
      userId: isAssignedToMe ? userId : null,
      fetchAllList: true,
    };
  }, [
    idsProjectTask,
    isAssignedToMe,
    selectedPriority,
    selectedStatus,
    userId,
    statusToFilter,
    priorityToFilter,
  ]);

  useEffect(() => {
    dispatch((fetchProjectTaskStatus as any)());
    dispatch((fetchProjectPriority as any)());
  }, [dispatch]);

  const statusList = useMemo(() => {
    const _statusList = getCustomSelectionItems(
      projectTaskStatusList,
      'name',
      selectedStatus,
    );
    return statusToFilter.length === 0
      ? _statusList
      : _statusList.filter(status => statusToFilter.includes(status.value));
  }, [
    getCustomSelectionItems,
    projectTaskStatusList,
    selectedStatus,
    statusToFilter,
  ]);

  const priorityList = useMemo(() => {
    const _priorityList = getCustomSelectionItems(
      projectPriorityList,
      'name',
      selectedPriority,
    );
    return priorityToFilter.length === 0
      ? _priorityList
      : _priorityList.filter(status => priorityToFilter.includes(status.value));
  }, [
    getCustomSelectionItems,
    projectPriorityList,
    selectedPriority,
    priorityToFilter,
  ]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        headerChildren={
          <>
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
              <ProjectSearchBar
                style={styles.searchBar}
                showTitle={false}
                onChange={setProject}
                defaultValue={project}
              />
            </View>
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
          </>
        }
        list={projectTaskList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchProjectTask}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        renderListItem={({item}) => (
          <TaskActionCard
            name={item?.name}
            assignedTo={item?.assignedTo?.fullName}
            taskDeadline={item?.taskDeadline}
            parentTask={
              project == null ? item?.project?.name : item?.parentTask?.fullName
            }
            progress={item?.progress}
            priority={item?.priority}
            status={item?.status}
          />
        )}
      />
    </Screen>
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
  searchBar: {
    width: '85%',
  },
  picker: {
    width: '42%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TaskListScreen;
