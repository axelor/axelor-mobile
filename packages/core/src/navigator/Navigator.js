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
  filterAuthorizedModules,
  getDefaultModule,
  manageOverridingMenus,
  manageWebCompatibility,
  moduleHasMenus,
} from './module.helper';
import {
  manageSubMenusOverriding,
  getMenuTitle,
  hasSubMenus,
} from './menu.helper';
import useTranslator from '../i18n/hooks/use-translator';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenuConfig} from '../features/menuConfigSlice';
import {fetchMobileConfig} from '../features/mobileConfigSlice';
import BaseScreen from '../screens';
import Header from './drawer/Header';
import {fetchMetaModules} from '../features/metaModuleSlice';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const ModuleNavigatorContext = createContext({
  activeModule: null,
  modulesMenus: {},
  modulesScreens: {},
});

const Navigator = ({
  modules,
  mainMenu,
  onRefresh,
  version,
  versionCheckConfig,
}) => {
  const {user} = useSelector(state => state.user);
  const {restrictedMenus} = useSelector(state => state.menuConfig);
  const {mobileConfigs} = useSelector(state => state.mobileConfig);
  const {metaModules} = useSelector(state => state.metaModule);

  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const enabledModule = useMemo(
    () =>
      manageWebCompatibility(
        manageOverridingMenus(
          manageSubMenusOverriding(
            filterAuthorizedModules(
              modules,
              mobileConfigs,
              restrictedMenus,
              user,
            ),
          ),
        ),
        metaModules,
      ),
    [metaModules, mobileConfigs, modules, restrictedMenus, user],
  );

  const [activeModule, setActiveModule] = useState(
    getDefaultModule(enabledModule, mainMenu),
  );

  useEffect(() => {
    dispatch(fetchMobileConfig());
    dispatch(fetchMetaModules());
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
      .filter(moduleHasMenus)
      .reduce((menus, _module) => ({...menus, ..._module.menus}), {});
  }, [enabledModule]);

  const modulesScreens = useMemo(
    () =>
      modules.reduce((screens, module) => ({...screens, ...module.screens}), {
        ...BaseScreen,
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
                  unmountOnBlur: true,
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
                        unmountOnBlur: true,
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
