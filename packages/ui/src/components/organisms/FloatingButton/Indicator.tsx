import React from 'react';
import {useMemo} from 'react';
import {Color, useThemeColor} from '../../../theme';
import {StyleSheet, View} from 'react-native';

const Indicator = ({
  style,
  show = false,
  size = 10,
  color,
}: {
  style?: any;
  show: boolean;
  size?: number;
  color?: Color;
}) => {
  const Colors = useThemeColor();

  const indicatorColor = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  if (!show) {
    return null;
  }

  return (
    <View
      style={[
        styles.indicator,
        {
          borderColor: indicatorColor.background,
          backgroundColor: indicatorColor.background_light,
          width: size,
          height: size,
          borderRadius: size,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    position: 'absolute',
    top: 4,
    left: 4,
  },
});

export default Indicator;
