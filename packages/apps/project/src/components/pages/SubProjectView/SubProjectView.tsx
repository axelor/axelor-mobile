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
  Label,
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
  const {user} = useSelector(state => state.user);

  const sliceFunctionData = useMemo(
    () => ({
      projectId: project.id,
      companyId: user.activeCompany?.id,
    }),
    [project.id, user.activeCompany?.id],
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

  const isParentProjet = useMemo(
    () => project.parentProject != null,
    [project.parentProject],
  );

  const isSubProjects = useMemo(
    () => Array.isArray(subProjectList) && subProjectList.length > 0,
    [subProjectList],
  );

  const noProjects = useMemo(() => {
    return !isParentProjet && !isSubProjects;
  }, [isParentProjet, isSubProjects]);

  return (
    <>
      <HeaderContainer
        fixedItems={<ProjectHeader />}
        expandableFilter={false}
      />
      {noProjects && (
        <Label
          style={styles.label}
          message={I18n.t('Project_NoLinkedProjects')}
          type="info"
        />
      )}
      {isParentProjet && (
        <>
          <Text style={styles.title} writingType="details">
            {I18n.t('Project_ParentProject')}
          </Text>
          <ProjectCard
            onPress={() =>
              clipboardProvider.copyToClipboard(project?.parentProject?.name)
            }
            customer={project?.parentProject?.clientPartner}
            name={project?.parentProject?.name}
            code={project?.parentProject?.code}
            company={project?.parentProject?.company?.name}
            assignedTo={project?.parentProject?.assignedTo?.fullName}
            projectStatus={project?.parentProject?.projectStatus}
            parentProject={project?.parentProject?.parentProject?.fullName}
            isCopyCard={true}
          />
        </>
      )}
      {isSubProjects && (
        <>
          {isParentProjet && <HorizontalRule style={styles.horizontalRule} />}
          <Text style={styles.title} writingType="details">
            {I18n.t('Project_ChildProjects')}
          </Text>
          <ScrollList
            data={subProjectList}
            style={styles.scrollList}
            loadingList={loadingSubProject}
            renderItem={({item}) => (
              <ProjectCard
                onPress={() => clipboardProvider.copyToClipboard(item?.name)}
                name={item?.name}
                code={item?.code}
                customer={item?.clientPartner}
                company={item?.company?.name}
                assignedTo={item?.assignedTo?.fullName}
                projectStatus={item?.projectStatus}
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
    marginVertical: 10,
  },
  scrollList: {
    paddingTop: 0,
  },
  label: {
    width: '90%',
    alignSelf: 'center',
  },
  horizontalRule: {
    alignSelf: 'center',
    width: '70%',
    marginTop: 10,
  },
});

export default SubProjectView;
