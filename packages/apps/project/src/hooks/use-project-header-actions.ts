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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchProjectById} from '../features/projectSlice';

export const useProjectHeaders = () => {
  useProjectListScreenActions();
  useProjectDetailsActions();
  useProjectTaskListActions();
  useProjectTaskDetailsActions();
};

const useProjectListScreenActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('project_project_list', {
      model: 'com.axelor.apps.project.db.Project',
      options: {
        core_modelFilters: {name: 'project-project-filters'},
      },
    });
  }, []);
};

const useProjectDetailsActions = () => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);

  useEffect(() => {
    headerActionsProvider.registerModel('project_project_details', {
      model: 'com.axelor.apps.project.db.Project',
      modelId: project?.id,
      headerTitle: project?.code,
      actions: [
        {
          key: 'refreshProject',
          order: 0,
          iconName: 'arrow-repeat',
          title: I18n.t('Project_RefreshProject'),
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(
              (fetchProjectById as any)({
                projectId: project?.id,
              }),
            );
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, dispatch, project?.code, project?.id]);
};

const useProjectTaskListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('project_projectTask_list', {
      model: 'com.axelor.apps.project.db.ProjectTask',
    });
  }, []);
};

const useProjectTaskDetailsActions = () => {
  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  useEffect(() => {
    headerActionsProvider.registerModel('project_projectTask_details', {
      model: 'com.axelor.apps.project.db.ProjectTask',
      modelId: projectTask?.id,
    });
  }, [projectTask?.id]);
};
