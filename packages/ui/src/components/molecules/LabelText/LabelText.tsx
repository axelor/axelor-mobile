import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '../../atoms';

interface LabelTextProps {
  style?: any;
  iconStyle?: any;
  textStyle?: any;
  title?: string | number;
  value?: string | number;
  size?: number;
  color?: string;
  iconName?: string;
  FontAwesome5?: boolean;
  onlyOneLine?: boolean;
}

const LabelText = ({
  style,
  iconStyle,
  textStyle,
  title,
  value,
  size = 12,
  color,
  iconName = null,
  FontAwesome5 = true,
  onlyOneLine = false,
}: LabelTextProps) => {
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <Icon
          style={[styles.icon, iconStyle]}
          name={iconName}
          size={size}
          color={color}
          FontAwesome5={FontAwesome5}
        />
      )}
      {title && (
        <Text
          style={textStyle}
          fontSize={14}
          numberOfLines={onlyOneLine ? 1 : null}>
          {title}
        </Text>
      )}
      {value && (
        <Text
          style={[styles.txtDetails, textStyle]}
          fontSize={14}
          numberOfLines={onlyOneLine ? 1 : null}>
          {value}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  txtDetails: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default LabelText;
