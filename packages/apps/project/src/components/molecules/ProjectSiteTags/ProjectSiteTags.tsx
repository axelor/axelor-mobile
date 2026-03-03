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
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {TagList} from '@axelor/aos-mobile-ui';

const ProjectSiteTags = ({}) => {
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);
  const {base: baseConfig} = useSelector(state => state.appConfig);

  const siteSet = useMemo(() => {
    return project.siteSet?.map(site => ({title: site?.fullName}));
  }, [project.siteSet]);

  if (!baseConfig?.enableSiteManagementForProject) {
    return null;
  }

  return <TagList title={I18n.t('Project_Sites')} tags={siteSet} />;
};

export default ProjectSiteTags;
