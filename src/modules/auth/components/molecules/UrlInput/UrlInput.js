import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const UrlInput = ({style, value, onChange, readOnly}) => {
  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, style]}
        value={value}
        onChange={onChange}
        placeholder="URL"
        readOnly={readOnly}
      />
      {true ? null : (
        <TouchableOpacity style={styles.action} onPress={() => {}}>
          <Icon name="qrcode" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#CECECE',
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  input: {
    width: '90%',
  },
  action: {
    width: '10%',
    marginLeft: 12,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.07,
    color: '#606060',
  },
});

export default UrlInput;
