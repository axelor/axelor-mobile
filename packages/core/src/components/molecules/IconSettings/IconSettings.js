import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';

const IconSettings = ({onPress}) => {
  const Colors = useThemeColor();

  return (
    <Icon
      name="cog"
      color={Colors.primaryColor.background}
      size={24}
      style={styles.action}
      touchable={true}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  action: {
    margin: 15,
  },
});

export default IconSettings;
