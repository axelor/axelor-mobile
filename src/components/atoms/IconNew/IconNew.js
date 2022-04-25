import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconNew = ({onNewPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={onNewPress}>
        <Icon name="plus" size={24} color={'#3ECF8E'} />
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
});

export default IconNew;
