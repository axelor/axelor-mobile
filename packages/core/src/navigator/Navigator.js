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

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Dimensions, Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import DrawerContent from './drawer/DrawerContent';
import {
  filterAuthorizedModules,
  getDefaultModule,
  manageOverridingMenus,
  moduleHasMenus,
  updateAccessibleMenus,
} from './module.helper';
import {getMenuTitle} from './menu.helper';
import useTranslator from '../i18n/hooks/use-translator';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenuConfig} from '../features/menuConfigSlice';
import {fetchMobileConfig} from '../features/mobileConfigSlice';
import AttachedFilesScreen from '../screens/AttachedFilesScreen';
import MailMessageScreen from '../screens/MailMessageScreen';
import Header from './drawer/Header';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const ModuleNavigatorContext = createContext({
  activeModule: null,
  modulesMenus: {},
  modulesScreens: {},
  version: '',
  minimalRequiredMobileAppVersion: {},
});

const Navigator = ({
  modules,
  mainMenu,
  onRefresh,
  version,
  minimalRequiredMobileAppVersion,
}) => {
  const {user} = useSelector(state => state.user);
  const {restrictedMenus} = useSelector(state => state.menuConfig);
  const {mobileConfigs} = useSelector(state => state.mobileConfig);

  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const enabledModule = useMemo(
    () =>
      manageOverridingMenus(
        filterAuthorizedModules(modules, mobileConfigs, user),
      ),
    [mobileConfigs, modules, user],
  );

  const [activeModule, setActiveModule] = useState(
    getDefaultModule(enabledModule, mainMenu),
  );

  useEffect(() => {
    dispatch(fetchMobileConfig());
    dispatch(fetchMenuConfig());
  }, [dispatch]);

  const changeActiveModule = useCallback(
    moduleName => {
      setActiveModule(
        enabledModule.find(_module => _module.name === moduleName),
      );
    },
    [enabledModule],
  );

  const modulesMenus = useMemo(() => {
    return enabledModule
      .map(_module => updateAccessibleMenus(_module, restrictedMenus, user))
      .filter(moduleHasMenus)
      .reduce((menus, _module) => ({...menus, ..._module.menus}), {});
  }, [enabledModule, restrictedMenus, user]);

  const modulesScreens = useMemo(
    () =>
      modules.reduce((screens, module) => ({...screens, ...module.screens}), {
        AttachedFilesScreen: {
          title: 'Base_AttachedFiles',
          component: AttachedFilesScreen,
          actionID: 'core_attachedFiles_details',
          options: {
            shadedHeader: false,
          },
        },
        MailMessageScreen: {
          title: 'Base_MailMessages',
          component: MailMessageScreen,
          actionID: 'core_mailMessage_details',
          options: {
            shadedHeader: false,
          },
        },
      }),
    [modules],
  );

  const ModulesScreensStackNavigator = useCallback(
    ({initialRouteName, ...rest}) => (
      <Stack.Navigator {...rest} initialRouteName={initialRouteName}>
        {Object.entries(modulesScreens).map(
          ([
            key,
            {component, title, actionID, options = {shadedHeader: true}},
          ]) => {
            return (
              <Stack.Screen
                key={key}
                name={key}
                component={component}
                options={{
                  headerStyle: [
                    {
                      elevation: 0,
                    },
                    Platform.OS === 'ios' && !options?.shadedHeader
                      ? {
                          shadowOpacity: 0,
                        }
                      : null,
                  ],
                  headerLeft: () => null,
                  headerRight: () => null,
                  headerTitleStyle: {width: '100%'},
                  headerTitle: () => (
                    <Header
                      mainScreen={initialRouteName === key}
                      title={title}
                      actionID={actionID}
                      shadedHeader={options?.shadedHeader}
                    />
                  ),
                }}
              />
            );
          },
        )}
      </Stack.Navigator>
    ),
    [modulesScreens],
  );

  const windowWidth = Dimensions.get('window').width;
  const isLargeScreen = windowWidth >= 768;

  return (
    <ModuleNavigatorContext.Provider
      value={{activeModule, modulesMenus, modulesScreens}}>
      <Drawer.Navigator
        initialRouteName={mainMenu}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: Colors.backgroundColor,
            width: isLargeScreen ? windowWidth * 0.5 : windowWidth * 0.8,
          },
        }}
        drawerContent={props => (
          <DrawerContent
            {...props}
            modules={enabledModule}
            onModuleClick={changeActiveModule}
            onRefresh={onRefresh}
            version={version}
            minimalRequiredMobileAppVersion={minimalRequiredMobileAppVersion}
          />
        )}>
        {Object.entries(modulesMenus).map(([key, menu]) => (
          <Drawer.Screen
            key={key}
            name={key}
            options={{
              title: getMenuTitle(menu, {I18n}),
            }}>
            {props => (
              <ModulesScreensStackNavigator
                {...props}
                initialRouteName={menu.screen}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
    </ModuleNavigatorContext.Provider>
  );
};

export default Navigator;
