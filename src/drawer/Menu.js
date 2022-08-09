import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@/components/atoms';

const examplesMenus = [
  {
    icon: 'home',
    title: 'Home',
    isActive: true,
  },
  {
    icon: 'home',
    title: 'Product',
  },
  {
    icon: 'home',
    title: 'Inventories',
  },
  {
    icon: 'home',
    title: 'Realized inventories',
  },
  {
    icon: 'home',
    title: 'Internal moves',
  },
  {
    icon: 'heart',
    title: 'A long long long long menu name',
  },
];

const MenuItem = ({icon, title, isActive}) => {
  return (
    <View style={[styles.menuItemContainer]}>
      {isActive && <View style={styles.menuItemActive} />}
      {icon && <Icon style={styles.menuItemIcon} name={icon} size={24} />}
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
    </View>
  );
};

const Menu = ({title}) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {examplesMenus.map(menu => (
          <MenuItem
            key={menu.title}
            icon={menu.icon}
            title={menu.title}
            isActive={menu.isActive}
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
