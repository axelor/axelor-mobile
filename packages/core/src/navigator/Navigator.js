import React, {createContext, useCallback, useMemo, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColor, getHeaderStyles} from '@aos-mobile/ui';
import DrawerContent from './drawer/DrawerContent';
import {getDefaultModule, moduleHasMenus} from './module.helper';
import {getMenuTitle} from './menu.helper';
import useTranslator from '../i18n/hooks/use-translator';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const ModuleNavigatorContext = createContext({
  activeModule: null,
  modulesMenus: {},
  modulesScreens: {},
});

const Navigator = ({modules, mainMenu}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);
  const [activeModule, setActiveModule] = useState(
    getDefaultModule(modules, mainMenu),
  );

  const changeActiveModule = useCallback(
    moduleName => {
      setActiveModule(modules.find(_module => _module.name === moduleName));
    },
    [modules],
  );

  const modulesMenus = useMemo(
    () =>
      modules
        .filter(moduleHasMenus)
        .reduce((menus, _module) => ({...menus, ..._module.menus}), {}),
    [modules],
  );

  const modulesScreens = useMemo(
    () =>
      modules.reduce(
        (screens, module) => ({...screens, ...module.screens}),
        {},
      ),
    [modules],
  );

  const ModulesScreensStackNavigator = useCallback(
    ({initialRouteName, ...rest}) => (
      <Stack.Navigator {...rest} initialRouteName={initialRouteName}>
        {Object.entries(modulesScreens).map(
          ([key, {component, title, options = {isListScreen: false}}]) => {
            const screenOptions = {
              headerTintColor: Colors.primaryColor,
              headerStyle: options?.isListScreen
                ? styles.listScreenHeaderStyle
                : styles.headerColor,
              headerTitle: title(I18n.t),
              headerTitleStyle: styles.headerTitle,
            };

            if (initialRouteName === key) {
              screenOptions.headerLeft = props => (
                <DrawerToggleButton
                  {...props}
                  tintColor={Colors.primaryColor}
                />
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

  return (
    <ModuleNavigatorContext.Provider
      value={{activeModule, modulesMenus, modulesScreens}}>
      <Drawer.Navigator
        initialRouteName={mainMenu}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: Colors.backgroundColor,
          },
        }}
        drawerContent={props => (
          <DrawerContent
            {...props}
            modules={modules}
            onModuleClick={changeActiveModule}
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
