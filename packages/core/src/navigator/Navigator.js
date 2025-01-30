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
  checkModulesMenusAccessibility,
  getDefaultModule,
  manageOverridingMenus,
  manageWebCompatibility,
  manageWebConfig,
  moduleHasMenus,
} from './module.helper';
import {
  manageSubMenusOverriding,
  getMenuTitle,
  hasSubMenus,
  formatMenus,
  addMenusToModules,
} from './menu.helper';
import useTranslator from '../i18n/hooks/use-translator';
import {useDispatch, useSelector} from 'react-redux';
import BaseScreen from '../screens';
import Header from './drawer/Header';
import {fetchMetaModules} from '../features/metaModuleSlice';
import {fetchRequiredConfig} from '../features/appConfigSlice';
import {
  createDashboardScreens,
  filterAuthorizedDashboardMenus,
} from '../dashboards/menu.helpers';
import {fetchDashboardConfigs} from '../features/mobileDashboardSlice';
import {fetchWebViewConfigs} from '../features/mobileWebViewSlice';
import {usePermissionsFetcher} from '../permissions';
import {navigationInformations} from './NavigationInformationsProvider';
import {
  createWebViewScreens,
  filterAuthorizedWebViewMenus,
} from '../webViews/menu.helper';
import {registerTypes} from '../selections';
import {useModules} from '../app';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const ModuleNavigatorContext = createContext({
  activeModule: null,
  modulesMenus: {},
  modulesScreens: {},
});

const Navigator = ({mainMenu, onRefresh, versionCheckConfig}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {modules} = useModules();
  const fetchAllPermission = usePermissionsFetcher();

  const storeState = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {dashboardConfigs} = useSelector(state => state.mobileDashboard);
  const {webViewConfigs} = useSelector(state => state.mobileWebView);
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {metaModules} = useSelector(state => state.metaModule);

  const {screens: dashboardScreeens, menus: dashboardMenusConfig} = useMemo(
    () => createDashboardScreens(dashboardConfigs),
    [dashboardConfigs],
  );

  const {screens: webViewScreens, menus: webViewMenusConfig} = useMemo(
    () => createWebViewScreens(webViewConfigs),
    [webViewConfigs],
  );

  const enabledModule = useMemo(
    () =>
      manageWebCompatibility(
        manageWebConfig(
          addMenusToModules(
            manageOverridingMenus(
              manageSubMenusOverriding(
                checkModulesMenusAccessibility(modules, mobileSettings?.apps),
              ),
            ),
            filterAuthorizedWebViewMenus(webViewMenusConfig, user),
            filterAuthorizedDashboardMenus(dashboardMenusConfig, user),
          ),
          storeState,
        ),
        metaModules,
      ),
    [
      dashboardMenusConfig,
      webViewMenusConfig,
      metaModules,
      mobileSettings?.apps,
      modules,
      storeState,
      user,
    ],
  );

  const [activeModule, setActiveModule] = useState(
    getDefaultModule(enabledModule, mainMenu),
  );

  const requiredConfig = useMemo(() => {
    return enabledModule
      .filter(_module => Array.isArray(_module.requiredConfig))
      .flatMap(_module => _module.requiredConfig)
      .filter(
        (_configName, _index, _self) => _self.indexOf(_configName) === _index,
      );
  }, [enabledModule]);

  useEffect(() => {
    dispatch(fetchRequiredConfig(requiredConfig));
    registerTypes();
    // Note: the configs only need to be fetched once at user connection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchMetaModules());
    dispatch(fetchDashboardConfigs());
    dispatch(fetchWebViewConfigs());
    fetchAllPermission();
  }, [dispatch, fetchAllPermission]);

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
      .filter(moduleHasMenus)
      .reduce((menus, _module) => ({...menus, ...formatMenus(_module)}), {});
  }, [enabledModule]);

  useEffect(() => {
    navigationInformations.registerMenus(modulesMenus);
  }, [modulesMenus]);

  const modulesScreens = useMemo(
    () =>
      modules.reduce((screens, module) => ({...screens, ...module.screens}), {
        ...BaseScreen,
        ...dashboardScreeens,
        ...webViewScreens,
      }),
    [dashboardScreeens, webViewScreens, modules],
  );

  useEffect(() => {
    navigationInformations.registerScreens(modulesScreens);
  }, [modulesScreens]);

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
            versionCheckConfig={versionCheckConfig}
          />
        )}>
        {Object.entries(modulesMenus).map(([key, menu], index) => {
          return (
            <React.Fragment key={index}>
              <Drawer.Screen
                key={key}
                name={key}
                options={{
                  title: getMenuTitle(menu, {I18n}),
                }}>
                {props =>
                  menu.screen && (
                    <ModulesScreensStackNavigator
                      {...props}
                      initialRouteName={menu.screen}
                    />
                  )
                }
              </Drawer.Screen>
              {hasSubMenus(menu) &&
                Object.entries(menu.subMenus).map(([subMenukey, subMenu]) => {
                  return (
                    <Drawer.Screen
                      key={subMenukey}
                      name={subMenukey}
                      options={{
                        title: getMenuTitle(subMenu, {I18n}),
                      }}>
                      {props => (
                        <ModulesScreensStackNavigator
                          {...props}
                          initialRouteName={subMenu.screen}
                        />
                      )}
                    </Drawer.Screen>
                  );
                })}
            </React.Fragment>
          );
        })}
      </Drawer.Navigator>
    </ModuleNavigatorContext.Provider>
  );
};

export default Navigator;
