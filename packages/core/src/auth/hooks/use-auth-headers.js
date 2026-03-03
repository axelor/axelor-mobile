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

import {useEffect, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {headerActionsProvider, useHeaderBand} from '../../header';
import {useSelector} from '../../redux/hooks';
import {useTranslator} from '../../i18n';
import {useNavigation} from '../../hooks/use-navigation';
import {useOnline} from '../../features/onlineSlice';
import {formatDateTime} from '../../utils/formatters';
import {useLoaderListener} from '../../loader';
import {useThemesRegister} from '../themes';

export const useAuthHeaders = () => {
  useUserProfileActions();
  useAuthHeaderBands();
  useLoaderHeaderBand();
  useThemesRegister();
};

const useUserProfileActions = () => {
  const navigation = useNavigation();
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);
  const {numberUnreadProcess, processList} = useLoaderListener();

  useEffect(() => {
    headerActionsProvider.registerModel('auth_user_profile', {
      actions: [
        {
          key: 'processes',
          order: 10,
          iconName: 'bookmark-check',
          iconColor: Colors.primaryColor.background,
          indicator: numberUnreadProcess,
          title: I18n.t('Base_Loader_ProcessList'),
          onPress: () => navigation.navigate('ProcessListScreen'),
          showInHeader: true,
          hideIf: processList?.length === 0,
        },
        {
          key: 'settings',
          order: 20,
          iconName: 'gear-fill',
          iconColor: Colors.primaryColor.background,
          title: I18n.t('User_Settings'),
          onPress: () => navigation.navigate('SettingsScreen', {user: user}),
          showInHeader: true,
        },
      ],
    });
  }, [
    Colors,
    I18n,
    navigation,
    numberUnreadProcess,
    processList?.length,
    user,
  ]);
};

const useAuthHeaderBands = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const online = useOnline();

  const {registerHeaderBand} = useHeaderBand();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {applicationMode} = useSelector(state => state.auth);

  const todayDateT = useMemo(
    () => user?.todayDateT || baseConfig?.todayDateT,
    [baseConfig, user],
  );

  useEffect(() => {
    registerHeaderBand({
      key: 'devMode',
      text: `${I18n.t('Auth_Dev_Mode')} ${
        todayDateT
          ? formatDateTime(todayDateT, I18n.t('Base_DateTimeFormat'))
          : ''
      }`,
      color: Colors.importantColor,
      order: 0,
      showIf: applicationMode === 'dev',
    });
  }, [I18n, Colors, applicationMode, registerHeaderBand, todayDateT]);

  useEffect(() => {
    registerHeaderBand({
      key: 'offlineMode',
      text: I18n.t('Base_Offline_Mode'),
      color: Colors.cautionColor,
      order: 10,
      showIf: online.isEnabled === false,
    });
  }, [I18n, Colors, registerHeaderBand, online.isEnabled]);
};

const useLoaderHeaderBand = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {registerHeaderBand} = useHeaderBand();
  const {numberRunningProcesses} = useLoaderListener();

  useEffect(() => {
    registerHeaderBand({
      key: 'loader',
      text: I18n.t('Base_Loader_ProccessesInBackground', {
        numberRunningProcesses,
      }),
      color: Colors.cautionColor,
      order: 15,
      showIf: numberRunningProcesses > 0,
    });
  }, [Colors, I18n, numberRunningProcesses, registerHeaderBand]);
};
