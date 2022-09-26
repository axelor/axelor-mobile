import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

interface BadgeProps {
  style?: any;
  txtStyle?: any;
  title: string;
  color: string;
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
      <Text style={[styles.badgeTxt, txtStyle]} numberOfLines={numberOfLines}>
        {title}
      </Text>
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      borderRadius: 7,
      margin: '1%',
      width: 87,
      height: 22,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const styles = StyleSheet.create({
  badgeTxt: {
    fontSize: 14,
  },
});

export default Badge;
