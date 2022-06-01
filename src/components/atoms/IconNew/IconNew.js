import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@/types/colors';

const IconNew = ({onNewPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={onNewPress}>
        <Icon name="plus" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  action: {
    margin: 5,
  },
  icon: {
    color: Colors.icon.green,
    fontSize: 24,
  },
});

export default IconNew;
