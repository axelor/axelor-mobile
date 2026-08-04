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
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

export const useTeamHeaders = () => {
  useTeamTaskListActions();
  useTeamTaskDetailsActions();
};

const useTeamTaskListActions = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({modelName: 'com.axelor.team.db.TeamTask'});

  useEffect(() => {
    headerActionsProvider.registerModel('team_teamTask_list', {
      model: 'com.axelor.team.db.TeamTask',
      options: {
        core_modelFilters: {
          name: 'team-task-filters',
          actionViewName: 'team.tasks.all',
        },
      },
      actions: [
        {
          key: 'createTask',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Team_CreateTeamTask'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('TeamTaskDetailsScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useTeamTaskDetailsActions = () => {
  const {teamTask} = useSelector(state => state.team_teamTask);

  useEffect(() => {
    headerActionsProvider.registerModel('team_teamTask_form', {
      model: 'com.axelor.team.db.TeamTask',
      modelId: teamTask?.id,
    });
  }, [teamTask?.id]);
};
