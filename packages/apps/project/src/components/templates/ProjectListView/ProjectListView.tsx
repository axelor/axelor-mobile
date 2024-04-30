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

import React, {useMemo} from 'react';
import {
  useSelector,
  useTranslator,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {searchProject} from '../../../features/projectSlice';
import {ProjectCard} from '../../atoms';

interface ProjectListViewListViewProps {
  businessProject?: boolean;
}

const ProjectListView = ({
  businessProject = false,
}: ProjectListViewListViewProps) => {
  const I18n = useTranslator();
  const {loading, moreLoading, isListEnd, projectList} = useSelector(
    (state: any) => state.project_project,
  );

  const sliceFunctionData = useMemo(
    () => ({
      businessProject: businessProject,
    }),
    [businessProject],
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
        />
      )}
    />
  );
};

export default ProjectListView;
