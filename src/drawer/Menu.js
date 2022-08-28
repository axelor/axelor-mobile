import React, {useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import useTranslator from '@/hooks/use-translator';
import {getMenuTitle} from '@/navigators/Navigator';
import {AppDrawerContext} from './DrawerContent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';

const MenuItem = ({name, icon, title, screen}) => {
  const {navigation, activeRoute} = useContext(AppDrawerContext);
  const isActive = activeRoute.name === name;

  const onPress = () => {
    navigation.closeDrawer();
    navigation.replace(screen);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.menuItemContainer]}>
        {isActive && <View style={styles.menuItemActive} />}
        {icon && <Icon style={styles.menuItemIcon} name={icon} size={24} />}
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Menu = ({title}) => {
  const I18n = useTranslator();

  const {
    activeModule: {menus},
  } = useContext(AppDrawerContext);

  const menusItems = useMemo(() => {
    return Object.entries(menus).reduce((menusItems, [key, menu]) => {
      return [
        ...menusItems,
        {
          key,
          name: key,
          icon: menu.icon,
          title: getMenuTitle(menu, {I18n}),
          screen: menu.screen,
        },
      ];
    }, []);
  }, [menus]);

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {menusItems.map(menu => (
          <MenuItem
            key={menu.key}
            name={menu.name}
            icon={menu.icon}
            title={menu.title}
            screen={menu.screen}
          />
        ))}
      </View>
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
  itemsContainer: {},
  menuItemContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 21,
  },
  menuItemActive: {
    position: 'absolute',
    left: 0,
    top: '-25%',
    width: 6,
    height: '150%',
    backgroundColor: '#76DCAE',
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;
