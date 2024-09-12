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
  useTranslator,
  SearchListView,
  useTypeHelpers,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  fetchProjectStatus,
  searchProject,
} from '../../../features/projectSlice';
import {ProjectCard} from '../../atoms';

interface ProjectListViewListViewProps {
  businessProject?: boolean;
}

const ProjectListView = ({
  businessProject = false,
}: ProjectListViewListViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {getCustomSelectionItems} = useTypeHelpers();

  const {userId} = useSelector((state: any) => state.auth);
  const {loading, moreLoading, isListEnd, projectList, projectStatusList} =
    useSelector((state: any) => state.project_project);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(true);

  const statusList = useMemo(
    () => getCustomSelectionItems(projectStatusList, 'name', selectedStatus),
    [projectStatusList, getCustomSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      isBusinessProject: businessProject,
      statusList: selectedStatus,
      userId: isAssignedToMe ? userId : null,
    }),
    [businessProject, isAssignedToMe, selectedStatus, userId],
  );

  useEffect(() => {
    dispatch(fetchProjectStatus());
  }, [dispatch]);

  return (
    <SearchListView
      list={projectList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={searchProject}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
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
          <MultiValuePicker
            style={styles.picker}
            listItems={statusList}
            onValueChange={setSelectedStatus}
            placeholder={I18n.t('Project_Status')}
          />
        </View>
      }
      renderListItem={({item}) => (
        <ProjectCard
          customer={item.clientPartner}
          projectStatus={item.projectStatus}
          onPress={() => {
            navigation.navigate('ProjectDetailsScreen', {
              projectId: item.id,
            });
          }}
          name={item.name}
          code={item.code}
          company={item.company?.name}
          assignedTo={isAssignedToMe ? null : item.assignedTo?.fullName}
          parentProject={item.parentProject?.fullName}
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
    width: '85%',
  },
});

export default ProjectListView;
