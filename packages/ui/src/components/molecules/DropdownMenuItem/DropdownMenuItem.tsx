import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from '../../atoms';

interface DropdownMenuItemProps {
  icon?: string;
  placeholder: string;
  onPress: (any) => void;
}

const DropdownMenuItem = ({
  icon = 'paperclip',
  placeholder,
  onPress,
}: DropdownMenuItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Icon name={icon} size={15} style={styles.icon} />
      <Text style={styles.text}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
});

export default DropdownMenuItem;
