import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from '@aos-mobile/ui';

const MenuItem = ({icon, title, isActive, onPress}) => {
  const backgroundColor = useMemo(
    () => getBackgroundColor(isActive).container,
    [isActive],
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.menuItemContainer]}>
        <View style={[styles.menuItemActive, backgroundColor]} />
        {icon && <Icon style={styles.menuItemIcon} name={icon} size={24} />}
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getBackgroundColor = isMenuActive => {
  return StyleSheet.create({
    container: {
      backgroundColor: isMenuActive ? '#76DCAE' : '#fff',
    },
  });
};

const styles = StyleSheet.create({
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

export default MenuItem;
