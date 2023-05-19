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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {default as CoreNavigator} from '../navigator/Navigator';
import {getNetInfo} from '../api/net-info-utils';
import {useHeaderRegisters} from '../hooks/use-header-registers';
import LoginScreen from '../screens/LoginScreen';
import SessionManagementScreen from '../screens/SessionManagementScreen';
import {onlineSlice, useOnline} from '../features/onlineSlice';
import {useDispatch} from '../redux/hooks';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = ({
  modules,
  mainMenu,
  version,
  onRefresh,
  configuration,
}) => {
  const {logged} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const online = useOnline();

  const modulesHeaderRegisters = useMemo(() => {
    return modules
      .filter(_module => _module.models?.headerRegisters)
      .map(_module => _module.models.headerRegisters);
  }, [modules]);

  useHeaderRegisters(modulesHeaderRegisters);

  const AppNavigator = useCallback(
    () => (
      <CoreNavigator
        modules={modules}
        mainMenu={mainMenu}
        onRefresh={onRefresh}
      />
    ),
    [modules, mainMenu, onRefresh],
  );

  const checkInternetConnection = useCallback(async () => {
    const {isConnected} = await getNetInfo();
    if (!isConnected) {
      if (online.isEnabled) {
        dispatch(onlineSlice.actions.disable());
      }
    } else {
      if (!online.isEnabled) {
        dispatch(onlineSlice.actions.enable());
      }
    }
  }, [dispatch, online.isEnabled]);

  useEffect(() => {
    const interval = setInterval(checkInternetConnection, 2000);
    return () => clearInterval(interval.current);
  }, [checkInternetConnection]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!logged ? (
        configuration?.enableConnectionSessions ? (
          <Screen
            name="SessionManagementScreen"
            component={SessionManagementScreen}
            initialParams={{
              version,
              testInstanceConfig: configuration?.testInstanceConfig,
              releaseInstanceConfig: configuration?.releaseInstanceConfig,
              enableConnectionSessions: configuration?.enableConnectionSessions,
              logoFile: configuration?.logoFile,
            }}
          />
        ) : (
          <Screen
            name="LoginScreen"
            component={LoginScreen}
            initialParams={{
              version,
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
