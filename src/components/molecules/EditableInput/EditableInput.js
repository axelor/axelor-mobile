import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Input} from '@/components/atoms';
import {ColorHook} from '@/themeStore';

const EditableInput = ({
  style,
  placeholder,
  onValidate,
  defaultValue,
  multiline = false,
  numberOfLines = 1,
}) => {
  const Colors = ColorHook();
  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(defaultValue);

  const handleIcon = () => {
    setEditable(!isEditable);
    if (!isEditable) {
      onValidate(value == null ? '' : value);
    }
  };

  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[container, style]}>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={text => setValue(text)}
        readOnly={isEditable}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleIcon}>
          <Icon name={isEditable ? 'pencil-alt' : 'check'} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    backgroundColor: Colors.backgroundColor,
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  });

const styles = StyleSheet.create({
  input: {
    width: '80%',
    fontSize: 14,
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default EditableInput;
