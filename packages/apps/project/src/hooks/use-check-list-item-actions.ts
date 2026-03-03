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

import {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {
  deleteCheckListItem,
  updateCheckListItem,
} from '../features/checkListSlice';
import {CheckListItemType} from '../types';

export const useCheckListItemActions = (handleRefresh?: () => void) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch: any = useDispatch();
  const navigation = useNavigation();
  const {readonly, canCreate, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.project.db.ProjectCheckListItem',
  });

  const getItemActions = useCallback(
    (item: any) => {
      const {completed, parentItem, project, projectTask} = item;

      const creationDisabled = !canCreate || parentItem?.id != null;

      return [
        {
          iconName: 'check-lg',
          iconColor: CheckListItemType.getStatusColor(completed, Colors)
            ?.background,
          helper: I18n.t(
            completed ? 'Project_MarkAsUncompleted' : 'Project_MarkAsCompleted',
          ),
          onPress: () =>
            dispatch((updateCheckListItem as any)(item)).then(() =>
              handleRefresh?.(),
            ),
          hidden: readonly,
          large:
            !creationDisabled || canCreate || (creationDisabled && !canCreate),
        },
        {
          iconName: 'plus-lg',
          helper: I18n.t('Project_CreateItem'),
          onPress: () =>
            navigation.navigate('CheckListItemFormScreen', {
              parentItem: item,
              projectId: project?.id,
              projectTaskId: projectTask?.id,
            }),
          hidden: creationDisabled,
          large: !canDelete,
        },
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor?.background,
          helper: I18n.t('Project_DeleteItem'),
          onPress: () =>
            dispatch((deleteCheckListItem as any)(item)).then(() =>
              handleRefresh?.(),
            ),
          hidden: !canDelete,
          large: readonly && creationDisabled,
        },
      ];
    },
    [
      Colors,
      I18n,
      canCreate,
      canDelete,
      dispatch,
      handleRefresh,
      navigation,
      readonly,
    ],
  );

  return useMemo(() => ({getItemActions}), [getItemActions]);
};
