import React, {useState} from 'react';
import {Input} from '@/components/atoms';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordInput = ({style, value, onChange, readOnly}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        style={style}
        value={value}
        onChange={onChange}
        placeholder="Password"
        secureTextEntry={!visible}
        readOnly={readOnly}
      />
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Icon name={visible ? 'eye-slash' : 'eye'} size={20} />
      </TouchableOpacity>
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
});

export default PasswordInput;
