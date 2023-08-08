/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {
  headerActionsProvider,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';

const useExpenseLinesListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expenseLine_list', {
      actions: [
        {
          key: 'newExpenseLines',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Hr_NewExpenseLine'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('ExpenseLineFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

export const useHrHeaders = () => {
  useExpenseLinesListActions();
};
