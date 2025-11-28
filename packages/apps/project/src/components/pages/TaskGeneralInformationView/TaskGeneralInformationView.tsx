/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView} from '@axelor/aos-mobile-ui';
import {ProjectSimpleCard} from '../../atoms';
import {TaskDetailsHeader} from '../../molecules';
import {ProjectTaskDropdownCards, TimeSpentGridView} from '../../organisms';
import {fetchProjectStatus} from '../../../features/projectSlice';

const TaskGeneralInformationView = ({
  handleRefresh = () => {},
}: {
  handleRefresh?: () => void;
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {projectTask, loadingProjectTask} = useSelector(
    (state: any) => state.project_projectTask,
  );

  useEffect(() => {
    dispatch(fetchProjectStatus());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <ScrollView
        refresh={{loading: loadingProjectTask, fetcher: handleRefresh}}>
        <ProjectSimpleCard
          code={projectTask.project?.code}
          name={projectTask.project?.name}
          projectStatus={projectTask.project?.projectStatus}
          onPress={() => {
            navigation.popTo('ProjectDetailsScreen', {
              projectId: projectTask.project?.id,
            });
          }}
        />
        <ProjectTaskDropdownCards />
        <TimeSpentGridView />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskGeneralInformationView;
