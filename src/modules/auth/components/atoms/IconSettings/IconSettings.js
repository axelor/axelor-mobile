import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from '@/components/atoms';
import {ColorHook} from '@/themeStore';

const IconSettings = ({onPress}) => {
  const Colors = ColorHook();

  return (
    <Icon
      name="cog"
      color={Colors.primaryColor}
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
