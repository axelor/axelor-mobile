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
import {Dimensions, StyleSheet} from 'react-native';
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
import DrawerToggleButton from './drawer/DrawerToggleButton';
import BackIcon from './drawer/BackIcon';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenuConfig} from '../features/menuConfigSlice';
import {fetchMobileConfig} from '../features/mobileConfigSlice';
import AttachedFilesScreen from '../screens/AttachedFilesScreen';
import MailMessageScreen from '../screens/MailMessageScreen';

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
  showModulesSubtitle = false,
  onRefresh,
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

  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

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
          options: {
            shadedHeader: false,
          },
        },
        MailMessageScreen: {
          title: 'Base_MailMessages',
          component: MailMessageScreen,
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
          ([key, {component, title, options = {shadedHeader: true}}]) => {
            const screenOptions = {
              headerTintColor: Colors.primaryColor.background,
              headerStyle: options?.shadedHeader
                ? styles.headerColor
                : styles.listScreenHeaderStyle,
              headerTitle: I18n.t(title),
              headerTitleStyle: styles.headerTitle,
            };

            if (initialRouteName === key) {
              screenOptions.headerLeft = () => (
                <DrawerToggleButton
                  tintColor={Colors.primaryColor.background}
                />
              );
            } else {
              screenOptions.headerLeft = () => (
                <BackIcon tintColor={Colors.primaryColor.background} />
              );
            }

            return (
              <Stack.Screen
                key={key}
                name={key}
                component={component}
                options={screenOptions}
              />
            );
          },
        )}
      </Stack.Navigator>
    ),
    [Colors, I18n, modulesScreens, styles],
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
            showModulesSubtitle={showModulesSubtitle}
            onRefresh={onRefresh}
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

const getHeaderStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
      marginLeft: -14,
    },
    headerColor: {
      backgroundColor: Colors.backgroundColor,
      elevation: 3,
    },
    listScreenHeaderStyle: {
      backgroundColor: Colors.backgroundColor,
      elevation: 0,
    },
  });

export default Navigator;
