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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useSelector,
  useDispatch,
  useTranslator,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  HorizontalRule,
  ScrollList,
  Text,
} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';
import {ProjectCard} from '../../atoms';
import {searchSubProject} from '../../../features/projectSlice';

const SubProjectView = () => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {
    project,
    loadingSubProject,
    moreLoadingSubProject,
    isListEndSubProject,
    subProjectList,
  } = useSelector((state: any) => state.project_project);

  const sliceFunctionData = useMemo(
    () => ({
      projectId: project.id,
    }),
    [project.id],
  );

  useEffect(() => {
    dispatch((searchSubProject as any)(sliceFunctionData));
  }, [dispatch, sliceFunctionData]);

  const fetchSubProjectAPI = useCallback(
    (page = 0) => {
      dispatch((searchSubProject as any)({...sliceFunctionData, page}));
    },
    [dispatch, sliceFunctionData],
  );

  return (
    <>
      <HeaderContainer
        fixedItems={<ProjectHeader project={project} />}
        expandableFilter={false}
      />
      {project.parentProject != null && (
        <>
          <Text
            style={[styles.title, styles.titleParentProject]}
            writingType="details">
            {I18n.t('Project_ParentProject')}
          </Text>
          <ProjectCard
            onPress={() =>
              clipboardProvider.copyToClipboard(project?.parentProject?.name)
            }
            customerPicture={project?.parentProject?.clientPartner?.picture}
            name={project?.parentProject?.name}
            code={project?.parentProject?.code}
            customerName={project?.parentProject?.clientPartner?.name}
            company={project?.parentProject?.company?.name}
            assignedTo={project?.parentProject?.assignedTo?.fullName}
            projectStatus={project?.parentProject?.projectStatus?.id}
            parentProject={project?.parentProject?.parentProject?.fullName}
            isCopyCard={true}
          />
          <HorizontalRule style={styles.horizontalRule} />
        </>
      )}
      {subProjectList != null && subProjectList?.length > 0 && (
        <>
          <Text style={styles.title} writingType="details">
            {I18n.t('Project_ChildProject')}
          </Text>
          <ScrollList
            data={subProjectList}
            loadingList={loadingSubProject}
            renderItem={({item}) => (
              <ProjectCard
                onPress={() => clipboardProvider.copyToClipboard(item?.name)}
                customerPicture={item?.clientPartner?.picture}
                name={item?.name}
                code={item?.code}
                customerName={item?.clientPartner?.name}
                company={item?.company?.name}
                assignedTo={item?.assignedTo?.fullName}
                projectStatus={item?.projectStatus?.id}
                parentProject={item?.parentProject?.fullName}
                isCopyCard={true}
              />
            )}
            fetchData={fetchSubProjectAPI}
            moreLoading={moreLoadingSubProject}
            isListEnd={isListEndSubProject}
            translator={I18n.t}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 24,
  },
  titleParentProject: {
    marginVertical: 10,
  },
  horizontalRule: {
    alignSelf: 'center',
    width: '70%',
    marginVertical: 10,
  },
});

export default SubProjectView;
