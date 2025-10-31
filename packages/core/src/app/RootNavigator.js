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

import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {default as CoreNavigator} from '../navigator/Navigator';
import {getNetInfo, getTokenInfo} from '../api/net-info-utils';
import {useHeaderRegisters} from '../hooks/use-header-registers';
import LoginScreen from '../screens/LoginScreen';
import SessionManagementScreen from '../screens/SessionManagementScreen';
import {useHeaderBand} from '../header';
import {useTranslator} from '../i18n';
import {showToastMessage} from '../utils';
import {logout} from '../features/authSlice';
import {useSessionExpired} from '../apiProviders/config';
import {useConfigUpdater} from '../hooks/use-storage-config';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = ({
  modules,
  mainMenu,
  onRefresh,
  configuration,
  customLoginPage: CustomLoginPage,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const tokenInterval = useRef(null);
  const connectionInterval = useRef(null);

  const {sessionExpired} = useSessionExpired();
  const {registerHeaderBand} = useHeaderBand();
  const {updateConfigFromStorage} = useConfigUpdater();

  const {logged} = useSelector(state => state.auth);

  const modulesHeaderRegisters = useMemo(() => {
    return modules
      .filter(_module => _module.models?.headerRegisters)
      .map(_module => _module.models.headerRegisters);
  }, [modules]);

  useHeaderRegisters(modulesHeaderRegisters);

  const AppNavigator = useCallback(
    () => (
      <CoreNavigator
        mainMenu={mainMenu}
        onRefresh={onRefresh}
        versionCheckConfig={configuration?.versionCheckConfig}
      />
    ),
    [mainMenu, onRefresh, configuration?.versionCheckConfig],
  );

  const checkInternetConnection = useCallback(async () => {
    const {isConnected} = await getNetInfo();

    registerHeaderBand({
      key: 'noInternetConnection',
      text: I18n.t('Base_NoConnection'),
      color: Colors.secondaryColor,
      order: 15,
      showIf: !isConnected,
    });
  }, [Colors, I18n, registerHeaderBand]);

  useEffect(() => {
    connectionInterval.current = setInterval(checkInternetConnection, 5000);
    return () => clearInterval(connectionInterval.current);
  }, [checkInternetConnection]);

  const handleSessionExpired = useCallback(() => {
    showToastMessage({
      type: 'error',
      text1: I18n.t('Auth_Disconnected'),
      text2: I18n.t('Auth_LooseConnectionWithServer'),
      position: 'bottom',
    });
    dispatch(logout());
  }, [I18n, dispatch]);

  useEffect(() => {
    const checkERPToken = async () => {
      if (logged) {
        const {isTokenValid} = await getTokenInfo();

        if (!isTokenValid) {
          handleSessionExpired();
        }
      }
    };

    tokenInterval.current = setInterval(checkERPToken, 120000);
    return () => clearInterval(tokenInterval.current);
  }, [handleSessionExpired, logged]);

  useEffect(() => {
    if (sessionExpired) {
      handleSessionExpired();
    }
  }, [handleSessionExpired, sessionExpired]);

  useEffect(() => {
    updateConfigFromStorage();
  }, [updateConfigFromStorage]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!logged ? (
        CustomLoginPage ? (
          <Screen
            name="CustomLoginPage"
            component={CustomLoginPage}
            initialParams={{
              testInstanceConfig: configuration?.testInstanceConfig,
              releaseInstanceConfig: configuration?.releaseInstanceConfig,
              logoFile: configuration?.logoFile,
            }}
          />
        ) : configuration?.enableConnectionSessions ? (
          <Screen
            name="SessionManagementScreen"
            component={SessionManagementScreen}
            initialParams={{
              testInstanceConfig: configuration?.testInstanceConfig,
              releaseInstanceConfig: configuration?.releaseInstanceConfig,
              logoFile: configuration?.logoFile,
            }}
          />
        ) : (
          <Screen
            name="LoginScreen"
            component={LoginScreen}
            initialParams={{
              testInstanceConfig: configuration?.testInstanceConfig,
              releaseInstanceConfig: configuration?.releaseInstanceConfig,
              logoFile: configuration?.logoFile,
            }}
          />
        )
      ) : (
        <Screen name="AppNavigator" component={AppNavigator} />
      )}
    </Navigator>
  );
};

export default RootNavigator;
