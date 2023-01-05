import React from 'react';
import {StyleSheet} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@axelor/aos-mobile-ui';

const BackIcon = ({tintColor}) => {
  const navigation = useNavigation();
  return (
    <Icon
      style={styles.icon}
      name="angle-left"
      size={24}
      color={tintColor}
      touchable={true}
      onPress={() => navigation.dispatch(StackActions.pop())}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 14,
  },
});

export default BackIcon;
