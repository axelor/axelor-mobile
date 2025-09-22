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

import React, {useEffect, useMemo} from 'react';
import {Screen, BottomBar, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {getImputationMode} from '@axelor/aos-mobile-hr';
import {
  GeneralInformationView,
  ProjectCheckListView,
  ProjectHeader,
  ReportingView,
  SubProjectView,
  TaskView,
  TimeView,
} from '../../components';
import {fetchProjectById} from '../../features/projectSlice';
import {useReportingConfiguration} from '../../hooks/use-reporting-configuration';

export interface ProjectDetailsScreenProps {
  route?: any;
  projectId?: number;
}

const ProjectDetailsScreen = ({
  route,
  projectId,
}: ProjectDetailsScreenProps) => {
  const _projectId = route?.params?.projectId || projectId;

  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
  });

  const {project} = useSelector((state: any) => state.project_project);
  const {user} = useSelector((state: any) => state.user);

  const {noReporting} = useReportingConfiguration(project);

  useEffect(() => {
    dispatch((fetchProjectById as any)({projectId: _projectId}));
  }, [_projectId, dispatch]);

  const bottomBarItems = useMemo(
    () => [
      {
        iconName: 'house',
        viewComponent: <GeneralInformationView />,
        color: Colors.secondaryColor_dark,
        title: I18n.t('Project_DetailsView'),
      },
      {
        iconName: 'card-list',
        color: Colors.plannedColor,
        viewComponent: <TaskView />,
        title: I18n.t('Project_TasksView'),
      },
      {
        iconName: 'check2-square',
        color: Colors.successColor,
        viewComponent: <ProjectCheckListView />,
        title: I18n.t('Project_CheckList'),
      },
      {
        iconName: 'diagram-3-fill',
        color: Colors.infoColor,
        viewComponent: <SubProjectView />,
        hidden:
          !project?.isShowPhasesElements && project?.parentProject == null,
        title: I18n.t('Project_TreeStructureView'),
      },
      {
        iconName: 'activity',
        color: Colors.progressColor,
        viewComponent: <ReportingView />,
        hidden: noReporting,
        title: I18n.t('Project_ReportingView'),
      },
      {
        iconName: 'clock-history',
        color: Colors.cautionColor,
        hidden:
          !canCreate ||
          !project?.manageTimeSpent ||
          user.employee?.timesheetImputationSelect ===
            getImputationMode()?.ManufOrder,
        viewComponent: (
          <TimeView project={project} headerComponent={<ProjectHeader />} />
        ),
        title: I18n.t('Project_TimeLogView'),
      },
    ],
    [
      Colors,
      I18n,
      canCreate,
      noReporting,
      project,
      user.employee?.timesheetImputationSelect,
    ],
  );

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
