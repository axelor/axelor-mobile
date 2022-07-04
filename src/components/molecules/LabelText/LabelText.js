import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@/components/atoms';

const LabelText = ({title, value, iconName = null, FontAwesome5 = true}) => {
  return (
    <View style={styles.textDisplay}>
      {iconName && (
        <Icon
          name={iconName}
          size={12}
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
    width: '60%',
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
