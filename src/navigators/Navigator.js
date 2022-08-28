import React, {useCallback, useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';
import DrawerContent from '@/drawer/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navigator = ({modules}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const drawerMenus = useMemo(
    () => modules.reduce((menus, module) => ({...menus, ...module.menus}), {}),
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
        {Object.entries(modulesScreens).map(([key, component]) => (
          <Stack.Screen key={key} name={key} component={component} />
        ))}
      </Stack.Navigator>
    ),
    [modulesScreens],
  );

  const pressModule = () => {};

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.backgroundColor,
        },
      }}
      drawerContent={props => <DrawerContent {...props} modules={modules} />}>
      {Object.entries(drawerMenus).map(([key, menu]) => (
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
  );
};

export function getMenuTitle(menu, {I18n}) {
  if (typeof menu.title === 'function') {
    return menu.title(I18n.t);
  }
  if (menu.title != null) {
    return menu.title;
  }
  return menu.screen;
}

export default Navigator;
