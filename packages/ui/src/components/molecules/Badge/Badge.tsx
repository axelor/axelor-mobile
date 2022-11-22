import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../../theme/themes';
import {Text} from '../../atoms';

interface BadgeProps {
  style?: any;
  txtStyle?: any;
  title: string | number;
  color: Color;
  numberOfLines?: number;
}

const Badge = ({
  style,
  txtStyle,
  title,
  color,
  numberOfLines = 1,
}: BadgeProps) => {
  const badgeStyle = useMemo(() => getStyles(color), [color]);

  return (
    <View style={[badgeStyle.container, style]}>
      <Text
        style={txtStyle}
        numberOfLines={numberOfLines}
        textColor={color?.foreground}
        fontSize={14}>
        {title}
      </Text>
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background_light,
      borderColor: color.background,
      borderWidth: 2,
      borderRadius: 7,
      margin: '1%',
      width: 87,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Badge;
