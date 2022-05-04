import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({style, styleTxt, title, onPress, disabled}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <View style={styles.container}>
        <Text style={styleTxt}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    marginVertical: 6,
    borderRadius: 13,
  },
});

export default Button;
