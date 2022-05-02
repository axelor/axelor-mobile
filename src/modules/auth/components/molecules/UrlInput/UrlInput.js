import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const UrlInput = ({style, value, onChange, readOnly}) => {
  return (
    <View style={styles.container}>
      <Input
        style={style}
        value={value}
        onChange={onChange}
        placeholder="URL"
        readOnly={readOnly}
      />
      <TouchableOpacity onPress={() => {}}>
        <Icon name="qrcode" size={20} />
      </TouchableOpacity>
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

export default UrlInput;
