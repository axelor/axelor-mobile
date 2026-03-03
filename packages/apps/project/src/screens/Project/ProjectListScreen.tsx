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

import React from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {useSelector} from '@axelor/aos-mobile-core';
import {ProjectListView} from '../../components';
import {searchProject} from '../../features/projectSlice';

const ProjectListScreen = ({}) => {
  const {loading, moreLoading, isListEnd, projectList} = useSelector(
    state => state.project_project,
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <ProjectListView
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        projectList={projectList}
        searchProject={searchProject}
      />
    </Screen>
  );
};

export default ProjectListScreen;
