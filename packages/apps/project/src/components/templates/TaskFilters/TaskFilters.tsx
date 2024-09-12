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
  useTranslator,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectTaskStatus,
  fetchProjectPriority,
} from '../../../features/projectTaskSlice';
import {ProjectSearchBar} from '../../templates';

const filterAvailableSet = (allowValues, _set) => {
  const _availableSet = allowValues?.map(({id}) => id);
  return _set.filter(({value}) => _availableSet.includes(value));
};

type SetterFunction = (value: any | ((_current: any) => any)) => void;

const TaskFilters = ({
  isAssignedToMe,
  setIsAssignedToMe,
  setSelectedStatus,
  setSelectedPriority,
  project,
  setProject,
  showProjectSearchBar = false,
}: {
  isAssignedToMe: boolean;
  setIsAssignedToMe: SetterFunction;
  setSelectedStatus: SetterFunction;
  setSelectedPriority: SetterFunction;
  project?: any;
  setProject?: SetterFunction;
  showProjectSearchBar?: boolean;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {getCustomSelectionItems} = useTypeHelpers();

  const {projectTaskStatusList, projectPriorityList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const statusList = useMemo(() => {
    const _list = getCustomSelectionItems(projectTaskStatusList, 'name', []);

    if (project == null) {
      return _list;
    } else if (!project.isShowStatus) {
      return [];
    } else {
      return filterAvailableSet(project.projectTaskStatusSet, _list);
    }
  }, [getCustomSelectionItems, projectTaskStatusList, project]);

  const priorityList = useMemo(() => {
    const _list = getCustomSelectionItems(projectPriorityList, 'name', []);

    if (project == null) {
      return _list;
    } else if (!project.isShowPriority) {
      return [];
    } else {
      return filterAvailableSet(project.projectTaskPrioritySet, _list);
    }
  }, [getCustomSelectionItems, projectPriorityList, project]);

  useEffect(() => {
    dispatch((fetchProjectTaskStatus as any)());
    dispatch((fetchProjectPriority as any)());
  }, [dispatch]);

  return (
    <>
      {showProjectSearchBar && (
        <ProjectSearchBar
          showTitle={false}
          onChange={setProject}
          defaultValue={project}
          differentiateBusinessProjects={false}
        />
      )}
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
            placeholder={I18n.t('Project_Status')}
          />
          <MultiValuePicker
            style={styles.picker}
            listItems={priorityList}
            onValueChange={setSelectedPriority}
            placeholder={I18n.t('Project_Priority')}
          />
        </View>
      </View>
    </>
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
