import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@/components/atoms';
import useTranslator from '@/hooks/use-translator';
import {ModuleNavigatorContext} from '@/navigators/Navigator';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import MenuItem from './MenuItem';
import {getMenuTitle} from '@/navigators/menu.helper';

const MenuItemList = ({state, navigation}) => {
  const I18n = useTranslator();
  const {activeModule, modulesMenus} = useContext(ModuleNavigatorContext);

  return state.routes.map((route, i) => {
    if (activeModule.menus[route.name] == null) {
      return null;
    }

    const focused =
      i === state.index && Object.keys(activeModule.menus).includes(route.name);
    const menu = modulesMenus[route.name];

    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({name: route.name, merge: true})),
          target: state.key,
        });
      }
    };

    return (
      <MenuItem
        key={route.key}
        title={getMenuTitle(menu, {I18n})}
        icon={menu.icon}
        onPress={onPress}
        isActive={focused}
      />
    );
  });
};

const Menu = ({title, state, navigation}) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <MenuItemList state={state} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 8,
  },
  menuTitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});

export default Menu;
