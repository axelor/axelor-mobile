import React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@axelor/aos-mobile-ui';

const DrawerToggleButton = ({tintColor}) => {
  const navigation = useNavigation();
  return (
    <Icon
      style={styles.icon}
      name="stream"
      size={24}
      color={tintColor}
      touchable={true}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 14,
  },
});

export default DrawerToggleButton;
