import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '../../atoms';

interface LabelTextProps {
  title: string;
  value: string;
  size?: number;
  iconName?: string;
  FontAwesome5?: boolean;
}

const LabelText = ({
  title,
  value,
  size = 12,
  iconName = null,
  FontAwesome5 = true,
}: LabelTextProps) => {
  return (
    <View style={styles.textDisplay}>
      {iconName && (
        <Icon
          name={iconName}
          size={size}
          style={styles.icon}
          FontAwesome5={FontAwesome5}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.txtDetails}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textDisplay: {
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
