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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../i18n';
import {useDispatch, useSelector} from '../redux/hooks';
import BaseScreen from '../screens';
import {fetchMetaModules, getAllStudioApp} from '../features/metaModuleSlice';
import {fetchAllCurrencies} from '../features/currencySlice';
import {fetchRequiredConfig} from '../features/appConfigSlice';
import {usePermissionsFetcher} from '../permissions';
import {registerTypes} from '../selections';
import {
  Menu,
  MenuWithSubMenus,
  RootMenuWithScreen,
  useModulesInitialisation,
} from '../app';
import {
  activeScreenProvider,
  ModuleNavigatorContext,
  navigationInformations,
} from './providers';
import {DrawerContent, Header} from './components';
import {
  checkModulesMenusAccessibility,
  getDefaultModule,
  manageOverridingMenus,
  manageWebCompatibility,
  manageWebConfig,
  moduleHasMenus,
  manageSubMenusOverriding,
  getMenuTitle,
  hasSubMenus,
  formatMenus,
} from './helpers';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navigator = ({mainMenu, onRefresh, versionCheckConfig}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const fetchAllPermission = usePermissionsFetcher();
  const {modules} = useModulesInitialisation();

  const storeState = useSelector(state => state.appConfig);
  const {loadingConfig, mobileSettings, mobileConfigured, numberConfig} =
    useSelector(state => state.appConfig);
  const {metaModules} = useSelector(state => state.metaModule);

  const enabledModule = useMemo(
    () =>
      manageWebCompatibility(
        manageWebConfig(
          checkModulesMenusAccessibility(
            manageOverridingMenus(manageSubMenusOverriding(modules)),
            mobileSettings?.apps,
          ),
          storeState,
        ),
        metaModules,
      ),
    [metaModules, mobileSettings?.apps, modules, storeState],
  );

  useEffect(() => {
    activeScreenProvider.registerScreenTools(enabledModule);
  }, [enabledModule]);

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
    if (!loadingConfig) {
      if (!mobileConfigured) {
        dispatch((fetchRequiredConfig as any)(['AppMobileSettings']));
      } else if (numberConfig === 1 && requiredConfig.length > 0) {
        dispatch((fetchRequiredConfig as any)(requiredConfig));
        registerTypes();
      }
    }
  }, [dispatch, loadingConfig, mobileConfigured, numberConfig, requiredConfig]);

  useEffect(() => {
    dispatch(fetchMetaModules());
    dispatch(getAllStudioApp());
    dispatch((fetchAllCurrencies as any)());
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
    const menuArray: {
      [key: string]: Menu;
    } = enabledModule
      .filter(moduleHasMenus)
      .reduce((menus, _module) => ({...menus, ...formatMenus(_module)}), {});

    navigationInformations.registerMenus(menuArray);

    return menuArray;
  }, [enabledModule]);

  const modulesScreens = useMemo(() => {
    const screenArray = modules.reduce(
      (screens, module) => ({...screens, ...module.screens}),
      {...BaseScreen},
    );

    navigationInformations.registerScreens(screenArray);

    return screenArray;
  }, [modules]);

  const ModulesScreensStackNavigator = useCallback(
    ({initialRouteName, ...rest}) => (
      <Stack.Navigator
        id={undefined}
        {...rest}
        initialRouteName={initialRouteName}
        screenListeners={{
          state: e => {
            activeScreenProvider.registerActiveScreen(e.data?.state);
          },
        }}>
        {Object.entries(modulesScreens).map(
          ([
            key,
            {component, title, actionID, options = {shadedHeader: true}},
          ]) => {
            const renderTitle = () => (
              <Header
                mainScreen={initialRouteName === key}
                title={title}
                actionID={actionID}
                shadedHeader={options?.shadedHeader}
              />
            );
            return (
              <Stack.Screen
                key={key}
                name={key}
                component={component}
                options={{
                  headerStyle: [
                    {elevation: 0},
                    Platform.OS === 'ios' && !options?.shadedHeader
                      ? {shadowOpacity: 0}
                      : null,
                  ],
                  headerLeft: () => null,
                  headerRight: () => null,
                  headerTitleStyle: {width: '100%'},
                  headerTitle: renderTitle,
                }}
              />
            );
          },
        )}
      </Stack.Navigator>
    ),
    [modulesScreens],
  );

  const renderDrawer = useCallback(
    props => {
      return (
        <DrawerContent
          {...props}
          modules={enabledModule}
          onModuleClick={changeActiveModule}
          onRefresh={onRefresh}
          versionCheckConfig={versionCheckConfig}
        />
      );
    },
    [changeActiveModule, enabledModule, onRefresh, versionCheckConfig],
  );

  const {windowWidth, isLargeScreen} = useMemo(() => {
    const _width = Dimensions.get('window').width;

    return {windowWidth: _width, isLargeScreen: _width >= 768};
  }, []);

  return (
    <ModuleNavigatorContext.Provider value={{activeModule}}>
      <Drawer.Navigator
        id={undefined}
        initialRouteName={mainMenu}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: Colors.backgroundColor,
            width: windowWidth * (isLargeScreen ? 0.5 : 0.8),
          },
        }}
        drawerContent={renderDrawer}>
        {Object.entries(modulesMenus).map(([key, menu], index) => {
          return (
            <React.Fragment key={index}>
              <Drawer.Screen
                key={key}
                name={key}
                options={{
                  title: getMenuTitle(menu, I18n),
                  popToTopOnBlur: true,
                }}>
                {props =>
                  (menu as any).screen && (
                    <ModulesScreensStackNavigator
                      {...props}
                      initialRouteName={(menu as RootMenuWithScreen).screen}
                    />
                  )
                }
              </Drawer.Screen>
              {hasSubMenus(menu) &&
                Object.entries((menu as MenuWithSubMenus).subMenus).map(
                  ([subMenukey, subMenu]) => {
                    return (
                      <Drawer.Screen
                        key={subMenukey}
                        name={subMenukey}
                        options={{
                          title: getMenuTitle(subMenu, I18n),
                          popToTopOnBlur: true,
                        }}>
                        {props => (
                          <ModulesScreensStackNavigator
                            {...props}
                            initialRouteName={subMenu.screen}
                          />
                        )}
                      </Drawer.Screen>
                    );
                  },
                )}
            </React.Fragment>
          );
        })}
      </Drawer.Navigator>
    </ModuleNavigatorContext.Provider>
  );
};

export default Navigator;
