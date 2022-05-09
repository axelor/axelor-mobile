import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordInput = ({style, value, onChange, readOnly}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, style]}
        value={value}
        onChange={onChange}
        placeholder="Password"
        secureTextEntry={!visible}
        readOnly={readOnly}
      />
      <TouchableOpacity
        style={styles.action}
        onPress={() => setVisible(!visible)}>
        <Icon name={visible ? 'eye-slash' : 'eye'} style={styles.icon} />
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
  input: {
    width: '88%',
  },
  action: {
    width: '12%',
    marginLeft: 12,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.07,
    color: '#606060',
  },
});

export default PasswordInput;
