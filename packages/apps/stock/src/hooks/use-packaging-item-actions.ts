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

import {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {deletePackaging} from '../features/packagingSlice';

export const usePackagingItemActions = (onRefresh?: () => void) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {canCreate, canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.supplychain.db.Packaging',
  });
  const {canCreate: canCreateLine} = usePermitted({
    modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
  });

  const handleRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  const navigateToForm = useCallback(
    (params: any) => {
      navigation.navigate('PackagingItemFormScreen', params);
    },
    [navigation],
  );

  const getPackagingActions = useCallback(
    (packaging: any) => {
      return [
        {
          iconName: 'plus-lg',
          helper: I18n.t('Stock_AddPackagingItem'),
          onPress: () => navigateToForm({parentPackaging: packaging}),
          hidden: !canCreate && !canCreateLine,
        },
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Stock_EditPackaging'),
          onPress: () => navigateToForm({packaging}),
          hidden: readonly,
        },
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Stock_DeletePackaging'),
          onPress: () => {
            dispatch((deletePackaging as any)({id: packaging.id}));
            handleRefresh?.();
          },
          hidden: !canDelete,
        },
      ];
    },
    [
      Colors.errorColor.background,
      I18n,
      canCreate,
      canCreateLine,
      canDelete,
      dispatch,
      handleRefresh,
      navigateToForm,
      readonly,
    ],
  );

  const actionList = useMemo(() => {
    if (!canCreate && !canCreateLine) return [];

    return [
      {
        iconName: 'plus-lg',
        title: I18n.t('Stock_AddPackagingItem'),
        onPress: () => navigation.navigate('PackagingItemFormScreen'),
      },
    ];
  }, [I18n, canCreate, canCreateLine, navigation]);

  return useMemo(
    () => ({actionList, getPackagingActions}),
    [actionList, getPackagingActions],
  );
};
