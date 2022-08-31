import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import useTranslator from '@/hooks/use-translator';
import {getMenuTitle} from '@/navigators/Navigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions, DrawerActions} from '@react-navigation/native';

const MenuItem = ({icon, title, isActive, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.menuItemContainer]}>
        <View
          style={[
            styles.menuItemActive,
            {backgroundColor: isActive ? '#76DCAE' : '#fff'},
          ]}
        />
        {icon && <Icon style={styles.menuItemIcon} name={icon} size={24} />}
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MenuItemList = ({state, navigation, menus}) => {
  const I18n = useTranslator();

  return state.routes.map((route, i) => {
    const focused = i === state.index;
    const menu = menus[route.name];

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

const Menu = ({title, state, navigation, menus}) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <MenuItemList state={state} navigation={navigation} menus={menus} />
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
  menuItemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  menuItemActive: {
    width: 7,
    height: 32,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemIcon: {
    marginLeft: 12,
    marginRight: 18,
  },
  menuItemTextContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;
