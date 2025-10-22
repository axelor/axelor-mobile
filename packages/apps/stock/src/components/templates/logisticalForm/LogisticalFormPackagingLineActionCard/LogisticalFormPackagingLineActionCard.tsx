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

import React, {useMemo} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, ActionCardType, useThemeColor} from '@axelor/aos-mobile-ui';
import {LogisticalFormPackagingLineCard} from '../../logisticalForm';
import {deletePackagingLine} from '../../../../features/packagingLineSlice';

interface LogisticalFormPackagingLineActionCardProps {
  packagingLine: any;
  handleRefresh?: () => void;
}

const LogisticalFormPackagingLineActionCard = ({
  packagingLine,
  handleRefresh,
}: LogisticalFormPackagingLineActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
  });

  const actionList: ActionCardType[] = useMemo(
    () => [
      {
        iconName: 'pencil-fill',
        helper: I18n.t('Stock_EditPackagingLine'),
        onPress: () =>
          navigation.navigate('LogisticalFormPackagingItemFormScreen', {
            packagingLine,
          }),
        hidden: readonly,
      },
      {
        iconName: 'trash3-fill',
        iconColor: Colors.errorColor.background,
        helper: I18n.t('Stock_DeletePackagingLine'),
        onPress: () => {
          dispatch((deletePackagingLine as any)({id: packagingLine.id}));
          handleRefresh?.();
        },
        hidden: !canDelete,
      },
    ],
    [
      Colors,
      I18n,
      canDelete,
      dispatch,
      handleRefresh,
      navigation,
      packagingLine,
      readonly,
    ],
  );

  return (
    <ActionCard actionList={actionList} forceActionsDisplay translator={I18n.t}>
      <LogisticalFormPackagingLineCard {...packagingLine} />
    </ActionCard>
  );
};

export default LogisticalFormPackagingLineActionCard;
