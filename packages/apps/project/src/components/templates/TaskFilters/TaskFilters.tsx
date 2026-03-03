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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectTaskStatus,
  fetchProjectPriority,
  fetchProjectTaskCategory,
} from '../../../features/projectTaskSlice';
import {ProjectSearchBar} from '../../templates';

const filterAvailableSet = (allowValues, _set) => {
  const _availableSet = allowValues?.map(({id}) => id);
  return _set.filter(({value}) => _availableSet.includes(value));
};

type SetterFunction = (value: any | ((_current: any) => any)) => void;

const TaskFilters = ({
  isAssignedToMe,
  selectedCategories: _selectedCategories,
  setSelectedCategory,
  setIsAssignedToMe,
  setSelectedStatus,
  setSelectedPriority,
  project,
  setProject,
  showProjectSearchBar = false,
}: {
  isAssignedToMe: boolean;
  selectedCategories?: any[];
  setSelectedCategory: SetterFunction;
  setIsAssignedToMe: SetterFunction;
  setSelectedStatus: SetterFunction;
  setSelectedPriority: SetterFunction;
  project?: any;
  setProject?: SetterFunction;
  showProjectSearchBar?: boolean;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Project} = useTypes();
  const {getCustomSelectionItems} = useTypeHelpers();

  const {projectTaskStatusList, projectPriorityList, projectCategoryList} =
    useSelector((state: any) => state.project_projectTask);

  const selectedCategories = useMemo(
    () =>
      _selectedCategories?.map(({key}) =>
        projectCategoryList.find(({id}) => id === key),
      ),
    [_selectedCategories, projectCategoryList],
  );

  const statusList = useMemo(() => {
    const _list = getCustomSelectionItems(projectTaskStatusList, 'name', []);

    if (project == null) {
      return _list;
    } else {
      switch (project?.taskStatusManagementSelect) {
        case Project?.taskStatusManagementSelect.NoStatusManagement:
          return [];
        case Project?.taskStatusManagementSelect.ManageByProject:
          return filterAvailableSet(project.projectTaskStatusSet, _list);
        case Project?.taskStatusManagementSelect.ManageByCategory:
          return selectedCategories
            ? selectedCategories
                .flatMap(_c =>
                  filterAvailableSet(_c?.projectTaskStatusSet, _list),
                )
                .filter(({key}, idx, self) => {
                  return self.findIndex(_i => _i.key === key) === idx;
                })
            : _list;
        default:
          return _list;
      }
    }
  }, [
    getCustomSelectionItems,
    projectTaskStatusList,
    project,
    Project?.taskStatusManagementSelect,
    selectedCategories,
  ]);

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

  const categoryList = useMemo(() => {
    const _list = getCustomSelectionItems(projectCategoryList, 'name', []);

    if (project == null) {
      return _list;
    } else if (!project.isShowTaskCategory) {
      return [];
    } else {
      return filterAvailableSet(project.projectTaskCategorySet, _list);
    }
  }, [getCustomSelectionItems, projectCategoryList, project]);

  useEffect(() => {
    dispatch((fetchProjectTaskStatus as any)());
    dispatch((fetchProjectPriority as any)());
    dispatch((fetchProjectTaskCategory as any)());
  }, [dispatch]);

  return (
    <>
      {showProjectSearchBar && (
        <ProjectSearchBar
          showTitle={false}
          onChange={setProject}
          defaultValue={project}
        />
      )}
      <View style={[styles.headerContainer, styles.zIndex]}>
        <ToggleButton
          isActive={isAssignedToMe}
          onPress={() => setIsAssignedToMe(current => !current)}
          buttonConfig={{
            iconName: 'person-fill',
            width: '10%',
            style: styles.toggleButton,
          }}
        />
        <MultiValuePicker
          listItems={categoryList}
          onValueChange={setSelectedCategory}
          placeholder={I18n.t('Project_Category')}
          style={[styles.flexPicker, styles.pickerSpacingLeft]}
        />
      </View>
      <View style={styles.headerContainer}>
        <MultiValuePicker
          style={styles.flexPicker}
          listItems={statusList}
          onValueChange={setSelectedStatus}
          placeholder={I18n.t('Project_Status')}
        />
        <MultiValuePicker
          style={[styles.flexPicker, styles.pickerSpacingLeft]}
          listItems={priorityList}
          onValueChange={setSelectedPriority}
          placeholder={I18n.t('Project_Priority')}
        />
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
  zIndex: {
    zIndex: 2,
  },
  toggleButton: {
    height: 40,
    marginVertical: 0,
  },
  flexPicker: {
    flex: 1,
  },
  pickerSpacingLeft: {
    marginLeft: 10,
  },
});

export default TaskFilters;
