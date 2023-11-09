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

import React, {useEffect} from 'react';
import {headerActionsProvider, useTranslator} from '@axelor/aos-mobile-core';
import {Screen, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimerDeclareButton} from '../../components';

const TimerListScreen = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timers_list', {
      actions: [
        {
          key: 'newTimer',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Hr_NewTimer'),
          iconColor: Colors.primaryColor.background,
          onPress: () => console.log('Header button pressed.'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n]);

  return (
    <Screen fixedItems={<TimerDeclareButton />}>
      <Text>TEST</Text>
    </Screen>
  );
};

export default TimerListScreen;
