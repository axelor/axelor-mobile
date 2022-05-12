import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditableInput = ({style, placeholder}) => {
  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(placeholder);
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
        <TouchableOpacity
          style={styles.action}
          onPress={() => setEditable(!isEditable)}>
          <Icon name={isEditable ? 'pencil' : 'check'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f7fc',
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  input: {
    width: '80%',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EditableInput;
