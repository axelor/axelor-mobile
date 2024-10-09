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

import React, {useEffect} from 'react';
import {Screen, BottomBar, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  GeneralInformationView,
  ReportingView,
  SubProjectView,
  TaskView,
  TimeView,
} from '../components';
import {fetchProjectById} from '../features/projectSlice';
import {useReportingConfiguration} from '../hooks/use-reporting-configuration';

export interface ProjectDetailsScreenProps {
  route?: any;
  projectId?: number;
}

const ProjectDetailsScreen = ({
  route,
  projectId,
}: ProjectDetailsScreenProps) => {
  const _projectId = route?.params?.projectId || projectId;

  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {project} = useSelector((state: any) => state.project_project);

  const {noReporting} = useReportingConfiguration(project);

  useEffect(() => {
    dispatch((fetchProjectById as any)({projectId: _projectId}));
  }, [_projectId, dispatch]);

  const bottomBarItems = [
    {
      iconName: 'house',
      viewComponent: <GeneralInformationView />,
      color: Colors.secondaryColor_dark,
    },
    {
      iconName: 'card-list',
      color: Colors.plannedColor,
      viewComponent: <TaskView />,
    },
    {
      iconName: 'diagram-3-fill',
      color: Colors.infoColor,
      viewComponent: <SubProjectView />,
      hidden: !project?.isShowPhasesElements && project?.parentProject == null,
    },
    {
      iconName: 'activity',
      color: Colors.progressColor,
      viewComponent: <ReportingView />,
      hidden: noReporting,
    },
    {
      iconName: 'clock-history',
      color: Colors.primaryColor,
      viewComponent: <TimeView />,
    },
  ];

  if (project?.id !== _projectId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

export default ProjectDetailsScreen;
