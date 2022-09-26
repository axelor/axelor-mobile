import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useThemeColor} from '@aos-mobile/ui';

const AutocompleteItem = ({style, content, onPress}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return content == null ? null : (
    <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    item: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: Colors.backgroundColor,
      marginHorizontal: 15,
      paddingLeft: 15,
      paddingVertical: 15,
      borderBottomColor: Colors.primaryColor,
      borderBottomWidth: 1,
      position: 'relative',
      zIndex: 50,
    },
    text: {
      fontSize: 18,
    },
  });

export default AutocompleteItem;
