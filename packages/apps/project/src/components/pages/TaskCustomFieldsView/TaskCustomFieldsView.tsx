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

import React, {useMemo, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView} from '@axelor/aos-mobile-ui';
import {TaskDetailsHeader} from '../../molecules';
import {CustomSection} from '../../organisms';

const TaskCustomFieldsView = ({}) => {
  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const [refreshKey, setRefreshKey] = useState(0);

  const configArray = useMemo(
    () => projectTask.project?.customFieldManagementSelect.split(','),
    [projectTask.project?.customFieldManagementSelect],
  );

  const onRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <ScrollView refresh={{fetcher: onRefresh, loading: false}}>
        <CustomSection
          titleKey="Project_ProjectAppCustomField"
          fieldType="appJson"
          visible={configArray.includes('app')}
          modelId={projectTask.id}
          refreshKey={refreshKey}
          onRefresh={onRefresh}
        />
        <CustomSection
          titleKey="Project_ProjectCustomField"
          fieldType="projectJson"
          visible={configArray.includes('project')}
          modelId={projectTask.id}
          refreshKey={refreshKey}
          onRefresh={onRefresh}
        />
        <CustomSection
          titleKey="Project_CategoryCustomField"
          fieldType="categoryJson"
          visible={configArray.includes('category')}
          modelId={projectTask.id}
          refreshKey={refreshKey}
          onRefresh={onRefresh}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskCustomFieldsView;
