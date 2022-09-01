import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';
import DrawerContent from '@/drawer/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navigator = ({modules}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

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
          <Stack.Screen
            key={key}
            name={key}
            component={component}
            options={
              initialRouteName === key
                ? {
                    headerLeft: props => (
                      <DrawerToggleButton
                        {...props}
                        tintColor={Colors.primaryColor}
                      />
                    ),
                    headerStyle: styles.headerStyle,
                  }
                : {
                    headerTintColor: Colors.primaryColor,
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitle,
                  }
            }
          />
        ))}
      </Stack.Navigator>
    ),
    [Colors, modulesScreens, styles],
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

const getStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
    },
    headerStyle: {
      backgroundColor: Colors.backgroundColor,
    },
  });

export default Navigator;
