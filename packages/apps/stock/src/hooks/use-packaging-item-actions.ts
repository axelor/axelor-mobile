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
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

interface UsePackagingItemActionsProps {
  logisticalForm: any;
  onRefresh?: () => void;
}

export const usePackagingItemActions = ({
  logisticalForm,
  onRefresh,
}: UsePackagingItemActionsProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const packagingPermissions = usePermitted({
    modelName: 'com.axelor.apps.supplychain.db.Packaging',
  });
  const packagingLinePermissions = usePermitted({
    modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
  });

  const logisticalFormId = useMemo(
    () => logisticalForm?.id,
    [logisticalForm?.id],
  );

  const handleRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  const navigateToForm = useCallback(
    (params: any) => {
      navigation.navigate('LogisticalFormPackagingItemFormScreen', {
        ...params,
        logisticalForm,
      });
    },
    [logisticalForm, navigation],
  );

  const getPackagingActions = useCallback(
    (packaging: any) => {
      if (packaging == null) {
        return [];
      }

      return [
        {
          iconName: 'plus-lg',
          helper: I18n.t('Stock_AddPackagingItem'),
          onPress: () =>
            navigateToForm({
              logisticalFormId,
              parentPackaging: packaging,
              initialType: 'product',
            }),
          hidden: !packagingPermissions?.canCreate,
        },
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Stock_EditPackaging'),
          onPress: () =>
            navigateToForm({
              logisticalFormId,
              packaging,
              initialType: 'packaging',
            }),
          hidden: packagingPermissions?.readonly,
        },
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor?.background,
          helper: I18n.t('Stock_DeletePackaging'),
          onPress: () => {
            console.warn('TODO delete packaging', packaging?.id);
            handleRefresh();
          },
          hidden: !packagingPermissions?.canDelete,
        },
      ];
    },
    [
      Colors,
      I18n,
      handleRefresh,
      logisticalFormId,
      navigateToForm,
      packagingPermissions?.canCreate,
      packagingPermissions?.canDelete,
      packagingPermissions?.readonly,
    ],
  );

  const getPackagingLineActions = useCallback(
    (packagingLine: any) => {
      if (packagingLine == null) {
        return [];
      }

      return [
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Stock_EditPackagingLine'),
          onPress: () =>
            navigateToForm({
              logisticalFormId,
              packagingLine,
              initialType: 'product',
            }),
          hidden: packagingLinePermissions?.readonly,
        },
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor?.background,
          helper: I18n.t('Stock_DeletePackagingLine'),
          onPress: () => {
            console.warn('TODO delete packaging line', packagingLine?.id);
            handleRefresh();
          },
          hidden: !packagingLinePermissions?.canDelete,
        },
      ];
    },
    [
      Colors,
      I18n,
      handleRefresh,
      logisticalFormId,
      navigateToForm,
      packagingLinePermissions?.canDelete,
      packagingLinePermissions?.readonly,
    ],
  );

  const actionList = useMemo(() => {
    if (!packagingPermissions?.canCreate) {
      return [];
    }

    return [
      {
        iconName: 'plus-lg',
        title: I18n.t('Stock_AddPackagingItem'),
        onPress: () =>
          navigateToForm({
            logisticalFormId,
            initialType: 'packaging',
          }),
      },
    ];
  }, [I18n, logisticalFormId, navigateToForm, packagingPermissions?.canCreate]);

  return useMemo(
    () => ({actionList, getPackagingActions, getPackagingLineActions}),
    [actionList, getPackagingActions, getPackagingLineActions],
  );
};
