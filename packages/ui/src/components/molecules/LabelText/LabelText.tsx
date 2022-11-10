import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '../../atoms';

interface LabelTextProps {
  title?: string;
  value: string;
  size?: number;
  color?: string;
  style?: any;
  iconStyle?: any;
  textStyle?: any;
  iconName?: string;
  FontAwesome5?: boolean;
}

const LabelText = ({
  title,
  value,
  size = 12,
  color,
  style,
  iconStyle,
  textStyle,
  iconName = null,
  FontAwesome5 = true,
}: LabelTextProps) => {
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <Icon
          name={iconName}
          size={size}
          style={[styles.icon, iconStyle]}
          FontAwesome5={FontAwesome5}
          color={color}
        />
      )}
      <Text style={[styles.title, textStyle]}>{title}</Text>
      <Text style={[styles.txtDetails, textStyle]}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  txtDetails: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
});

export default LabelText;
