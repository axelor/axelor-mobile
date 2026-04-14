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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useTypeHelpers} from '@axelor/aos-mobile-core';
import {ChipSelect} from '@axelor/aos-mobile-ui';
import {ProjectSearchBar} from '../../templates';

interface ProjectPlanningFiltersProps {
  selectedProject?: any;
  onChangeProject: (value: any) => void;
  selectedStatus: any[];
  onChangeStatus: (value: any[]) => void;
}

const ProjectPlanningFilters = ({
  selectedProject,
  onChangeProject,
  selectedStatus,
  onChangeStatus,
}: ProjectPlanningFiltersProps) => {
  const {getCustomSelectionItems} = useTypeHelpers();

  const {projectTaskStatusList} = useSelector(
    state => state.project_projectTask,
  );

  const statusChipItems = useMemo(
    () =>
      getCustomSelectionItems(projectTaskStatusList, 'name', selectedStatus),
    [getCustomSelectionItems, projectTaskStatusList, selectedStatus],
  );

  return (
    <View style={styles.container}>
      <ProjectSearchBar
        style={styles.searchBar}
        defaultValue={selectedProject}
        onChange={onChangeProject}
        showTitle={false}
      />
      <ChipSelect
        mode="multi"
        chipNumberOfLines={1}
        onChangeValue={onChangeStatus}
        selectionItems={statusChipItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
  },
});

export default ProjectPlanningFilters;
