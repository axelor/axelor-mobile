import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, useThemeColor} from '@aos-mobile/ui';

const WIDTH = 54;
const HEIGHT = 54;
const DEFAULT_RADIUS = 8;
const ROUNDED_RADIUS = WIDTH / 2;

const MenuIconButton = ({
  style,
  icon,
  onPress,
  color,
  rounded = false,
  disabled = false,
}) => {
  const Colors = useThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.95}>
      <View
        style={[
          styles.container,
          {borderRadius: rounded ? ROUNDED_RADIUS : DEFAULT_RADIUS},
          {
            backgroundColor: disabled
              ? Colors.secondaryColor.background_light
              : color
              ? color
              : Colors.backgroundColor,
          },
          style,
        ]}>
        <Icon
          size={32}
          name={icon}
          color={
            disabled
              ? Colors.secondaryColor.background
              : Colors.secondaryColor_dark.background
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
  },
});

export default MenuIconButton;
