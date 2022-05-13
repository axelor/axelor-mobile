import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditableInput = ({style, placeholder, onValidate, defaultValue}) => {
  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(defaultValue);

  handleIcon = input => {
    setEditable(!isEditable);
    if (!isEditable) {
      onValidate(input);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={text => setValue(text)}
        readOnly={isEditable}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleIcon}>
          <Icon name={isEditable ? 'pencil' : 'check'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  input: {
    width: '80%',
    color: 'black',
    fontSize: 14,
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EditableInput;
