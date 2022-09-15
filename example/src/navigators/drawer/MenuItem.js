import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native';

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
