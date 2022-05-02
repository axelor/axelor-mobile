import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '@/components/atoms';

const UsernameInput = ({style, value, onChange, readOnly}) => {
  return (
    <View style={styles.container}>
      <Input
        style={style}
        value={value}
        onChange={onChange}
        placeholder="Username"
        readOnly={readOnly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#CECECE',
    borderWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 6,
  },
});

export default UsernameInput;
