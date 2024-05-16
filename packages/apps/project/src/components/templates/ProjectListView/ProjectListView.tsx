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

import React, {useMemo, useState} from 'react';
import {
  useSelector,
  useTranslator,
  SearchListView,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {searchProject} from '../../../features/projectSlice';
import {ProjectCard} from '../../atoms';
import {StyleSheet, View} from 'react-native';

interface ProjectListViewListViewProps {
  businessProject?: boolean;
}

const ProjectListView = ({
  businessProject = false,
}: ProjectListViewListViewProps) => {
  const I18n = useTranslator();
  const {Project} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {userId} = useSelector((state: any) => state.auth);
  const {loading, moreLoading, isListEnd, projectList} = useSelector(
    (state: any) => state.project_project,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isAssignedToMe, setIsAssignedToMe] = useState(true);

  const statusList = useMemo(
    () => getSelectionItems(Project?.projectStatus, selectedStatus),
    [Project?.projectStatus, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      businessProject: businessProject,
      statusList: selectedStatus,
      userId: isAssignedToMe ? userId : null,
    }),
    [businessProject, isAssignedToMe, selectedStatus, userId],
  );

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
          />
        </View>
      }
      renderListItem={({item}) => (
        <ProjectCard
          onPress={() => {}}
          customerPicture={item?.clientPartner?.picture}
          name={item?.name}
          code={item?.code}
          customerName={item?.clientPartner?.name}
          company={item?.company?.name}
          assignedTo={item?.assignedTo?.fullName}
          projectStatus={item?.projectStatus?.id}
          parentProject={item?.parentProject?.fullName}
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
