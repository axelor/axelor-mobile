import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from '@aos-mobile/ui';

const LabelText = ({
  style,
  title,
  value = null,
  iconName = null,
  FontAwesome5 = true,
}) => {
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
      <Text style={[styles.title, style]}>{title}</Text>
      {value != null && <Text style={styles.txtDetails}>{value}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  textDisplay: {
    flexDirection: 'row',
    width: '100%',
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
